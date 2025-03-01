package SpringProject._Spring.AccountControllerTest;

import SpringProject._Spring.controller.AccountController;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

@WebMvcTest(controllers = AccountController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
public class AccountJunitPUTTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private AccountService accountService;
    @MockitoBean
    private PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper();

    //happy path
    @Test
    void updatePassword_whenValidRequest_thenReturnAnd200() throws Exception {
        //given
        Account account = new Account("test@example.com", "oldPassword", List.of(new Role("ROLE_CLIENT")));
        account.setId(1L);

        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword");

        when(accountService.findAccountById(1L)).thenReturn(Optional.of(account));
        when(passwordEncoder.encode("newPassword")).thenReturn("hashedNewPassword");

        //context: since this endpoint uses Authentication getPrinciple() it needs authentication to exist to convert
        //it to Account, other ways of doing this test need file structure or code structure changes, so I chose this way - A.T.
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        //when
        mockMvc.perform(put("/api/account/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isOk())
                .andExpect(content().string("You have successfully updated your password!"));

        Mockito.verify(accountService, times(1)).saveAccount(ArgumentMatchers.any(Account.class));
    }
}
