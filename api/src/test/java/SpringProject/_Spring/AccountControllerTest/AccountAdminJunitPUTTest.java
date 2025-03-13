package SpringProject._Spring.AccountControllerTest;

import SpringProject._Spring.controller.AccountController.AccountControllerPutPassword;
import SpringProject._Spring.dto.password.PasswordUpdateDTO;
import SpringProject._Spring.model.Account;
import SpringProject._Spring.model.Role;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AccountControllerPutPassword.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
@WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
public class AccountAdminJunitPUTTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private AccountService accountService;
    @MockitoBean
    private PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper();

    //happy path
    @Test
    void updateAccountPasswordAdmin_whenValidRequest_thenReturnAnd200() throws Exception {
        //given
        long accountId = 1L;
        Account account = new Account("test@example.com", "oldPassword1", List.of(new Role("ROLE_CLIENT")));
        account.setId(accountId);

        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword1");

        when(accountService.findAccountById(accountId)).thenReturn(Optional.of(account));
        when(passwordEncoder.encode("newPassword")).thenReturn("hashedNewPassword1");

        //when
        mockMvc.perform(put("/api/account/password/" + accountId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isOk())
                .andExpect(content().string("You have successfully updated password for account " + accountId));

        Mockito.verify(accountService, times(1)).saveAccount(ArgumentMatchers.any(Account.class));
    }

    //unhappy path
    @Test
    @WithAnonymousUser
    void updateAccountPasswordAdmin_whenNotAuthenticated_thenReturnAnd401() throws Exception {
        // given
        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword1");

        // when
        mockMvc.perform(put("/api/account/password/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                // then
                .andExpect(status().isUnauthorized());
    }

    //unhappy path
    @Test
    void updateAccountPasswordAdmin_whenAccountIdNotFound_thenReturnAnd404() throws Exception {
        // given
        long accountId = 100L;
        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword1");

        when(accountService.findAccountById(accountId)).thenReturn(Optional.empty());

        // when
        mockMvc.perform(put("/api/account/password/" + accountId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                // then
                .andExpect(status().isNotFound());
    }

    //unhappy path
    @Test
    void updateAccountPasswordAdmin_whenPasswordIsInvalid_thenReturn400() throws Exception {
        // given
        long accountId = 1L;
        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("a1");

        // when
        mockMvc.perform(put("/api/account/password/" + accountId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                // then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("newPassword").value("Your password is either too short or too long! Min length is 8, max is 50 symbols"));

        passwordUpdateDTO = new PasswordUpdateDTO("aaaaaaaaa");

        mockMvc.perform(put("/api/account/password/" + accountId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                // then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("newPassword").value("Your password must contain at least one number, one letter, and it only accepts those and the regular qwerty keyboard symbols!"));
    }

    //unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void updateAccountPasswordAdmin_whenUserHasNoAdminRights_thenReturn403() throws Exception {
        // given
        long accountId = 1L;
        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword1");
        // when
        mockMvc.perform(put("/api/account/password/" + accountId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                // then
                .andExpect(status().isForbidden());
    }

    //unhappy path
    @Test
    void updateAccountPasswordAdmin_whenPasswordIsNull_thenReturn400() throws Exception {
        // given
        long accountId = 1L;
        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO(null);

        // when
        mockMvc.perform(put("/api/account/password/" + accountId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                // then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.newPassword").value("Password can not be null!"));
    }

}
