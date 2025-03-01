package SpringProject._Spring.AccountControllerTest;

import SpringProject._Spring.controller.AccountController.AccountControllerAdmin;
import SpringProject._Spring.controller.AccountController.AccountControllerAuthenticated;
import SpringProject._Spring.dto.PasswordUpdateDTO;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AccountControllerAdmin.class)
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
        Account account = new Account("test@example.com", "oldPassword", List.of(new Role("ROLE_CLIENT")));
        account.setId(accountId);

        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword");

        when(accountService.findAccountById(accountId)).thenReturn(Optional.of(account));
        when(passwordEncoder.encode("newPassword")).thenReturn("hashedNewPassword");

        //when
        mockMvc.perform(put("/api/account/password/{id}", accountId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isOk())
                .andExpect(content().string("You have successfully updated password for account " + accountId));

        Mockito.verify(accountService, times(1)).saveAccount(ArgumentMatchers.any(Account.class));
    }
}
