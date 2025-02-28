package SpringProject._Spring.AccountControllerTest;

import SpringProject._Spring.controller.AccountController;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AccountController.class)
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

    @Test
    void addAccount_whenValidRequest_thenReturnAnd201() throws Exception {
        AccountRequestDTO requestDTO = new AccountRequestDTO("test@example.com", "password123", List.of(new RoleDTO(1)));

        Role role = new Role("ROLE_USER");
        role.setId(1L);

        Account account = new Account("test@example.com", "hashedPassword", List.of(role));
        account.setId(1L);

        when(accountService.existsAccountByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");
        when(accountService.saveAccount(any())).thenReturn(account);

        mockMvc.perform(post("/api/account")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("roles").isArray())
                .andExpect(jsonPath("roles", Matchers.hasSize(1)))
                .andExpect(jsonPath("roles[0]").exists())
                .andExpect(jsonPath("roles[0].id").value(1));

        Mockito.verify(accountService, times(1)).saveAccount(ArgumentMatchers.any(Account.class));
    }
}
