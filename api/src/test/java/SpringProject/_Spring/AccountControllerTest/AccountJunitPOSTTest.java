package SpringProject._Spring.AccountControllerTest;

import SpringProject._Spring.controller.AccountController.AccountControllerPublic;
import SpringProject._Spring.dto.AccountRequestDTO;
import SpringProject._Spring.dto.RoleDTO;
import SpringProject._Spring.model.Account;
import SpringProject._Spring.model.Role;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AccountControllerPublic.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
public class AccountJunitPOSTTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private AccountService accountService;
    @MockitoBean
    private PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper();

    //happy path
    @Test
    void addAccount_whenValidRequest_thenReturnAnd201() throws Exception {
        //given
        AccountRequestDTO accountRequestDTO = new AccountRequestDTO("test@example.com", "password123", List.of(new RoleDTO(1)));

        Role role = new Role("ROLE_CLIENT");
        role.setId(1L);

        Account account = new Account("test@example.com", "hashedPassword", List.of(role));
        account.setId(1L);

        when(accountService.existsAccountByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");
        when(accountService.saveAccount(any())).thenReturn(account);

        //when
        mockMvc.perform(post("/api/account")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountRequestDTO)))
                //then
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").value(1L))
                .andExpect(jsonPath("email").value("test@example.com"))
                .andExpect(jsonPath("roles").isArray())
                .andExpect(jsonPath("roles", Matchers.hasSize(1)))
                .andExpect(jsonPath("roles[0]").exists())
                .andExpect(jsonPath("roles[0].id").value(1));

        Mockito.verify(accountService, times(1)).saveAccount(ArgumentMatchers.any(Account.class));
    }

    //unhappy path
    @Test
    void addAccount_whenAccountAuthenticated_thenReturn403() throws Exception {
        //given
        AccountRequestDTO accountRequestDTO = new AccountRequestDTO("test@example.com", "password123", List.of(new RoleDTO(1)));

        //when
        mockMvc.perform(post("/api/account")
                        .with(user("existingUser").password("password").roles("USER"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountRequestDTO)))
                //then
                .andExpect(status().isForbidden());
    }

    //unhappy path
    @Test
    void addAccount_whenEmailAlreadyExists_thenReturn400() throws Exception {
        //given
        AccountRequestDTO accountRequestDTO = new AccountRequestDTO("test@example.com", "password123", List.of(new RoleDTO(1)));

        when(accountService.existsAccountByEmail("test@example.com")).thenReturn(true);

        //when
        mockMvc.perform(post("/api/account")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountRequestDTO)))
                //then
                .andExpect(status().isBadRequest());
    }

    //unhappy path
    @Test
    void addAccount_whenInvalidRequest_thenReturn400() throws Exception {
        //given
        AccountRequestDTO invalidRequest = new AccountRequestDTO("", "", List.of());

        //when
        mockMvc.perform(post("/api/account")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                //then
                .andExpect(status().isBadRequest());
    }
}
