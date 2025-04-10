package SpringProject._Spring.accountControllerTest;

import SpringProject._Spring.controller.accountController.AccountControllerPost;
import SpringProject._Spring.dto.authentication.client.ClientRequestDTO;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Role;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
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

import java.sql.Timestamp;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AccountControllerPost.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
public class AccountPublicPOSTTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private AccountService accountService;
    @MockitoBean
    private ClientService clientService;
    @MockitoBean
    private VetService vetService;
    @MockitoBean
    private PasswordEncoder passwordEncoder;

    private final ObjectMapper objectMapper = new ObjectMapper();

    //happy path
    @Test
    void addAccount_whenValidRequest_thenReturnAnd201() throws Exception {
        //given
        ClientRequestDTO clientRequestDTO = new ClientRequestDTO("test@example.com", "password123", "firstName", "lastName", "123-456-789");


        Client client = new Client("firstName", "lastName", "123-456-789", new Timestamp(System.currentTimeMillis()));
        client.setAccount(new Account(
                clientRequestDTO.email(),
                clientRequestDTO.password(),
                List.of(new Role("CLIENT", 3))));
        when(accountService.existsAccountByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");
        when(clientService.saveClient(any(), any())).thenReturn(client);

        //when
        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clientRequestDTO)))
                //then
                .andExpect(status().isCreated())
                .andExpect(jsonPath("data.email").value("test@example.com"))
                .andExpect(jsonPath("data.firstName").value("firstName"))
                .andExpect(jsonPath("data.lastName").value("lastName"));

        Mockito.verify(clientService, times(1)).saveClient(ArgumentMatchers.any(Account.class), ArgumentMatchers.any(Client.class));
    }

    //unhappy path
    @Test
    @WithMockUser
    void addAccount_whenAccountAuthenticated_thenReturn403() throws Exception {
        //given
        ClientRequestDTO clientRequestDTO = new ClientRequestDTO("test@example.com", "password123", "firstName", "lastName", "123-456-789");

        //when
        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clientRequestDTO)))
                //then
                .andExpect(status().isForbidden());
    }

    //unhappy path
    @Test
    void addAccount_whenEmailAlreadyExists_thenReturn400() throws Exception {
        //given
        ClientRequestDTO clientRequestDTO = new ClientRequestDTO("test@example.com", "password123", "firstName", "lastName", "123-456-789");

        when(accountService.existsAccountByEmail("test@example.com")).thenReturn(true);

        //when
        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clientRequestDTO)))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message").value("This email is already registered. Please try logging in."));
        Mockito.verify(clientService, times(0))
                .saveClient(ArgumentMatchers.any(Account.class), ArgumentMatchers.any(Client.class));

    }

    //unhappy path
    @Test
    void addAccount_whenInvalidRequest_thenReturn400() throws Exception {
        //given
        ClientRequestDTO invalidRequest = new ClientRequestDTO("", "", "", "", "");

        //when
        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").exists());

        Mockito.verify(clientService, times(0))
                .saveClient(ArgumentMatchers.any(Account.class), ArgumentMatchers.any(Client.class));
    }
}
