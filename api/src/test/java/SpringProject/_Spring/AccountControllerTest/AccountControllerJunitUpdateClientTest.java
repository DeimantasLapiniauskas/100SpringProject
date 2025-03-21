package SpringProject._Spring.AccountControllerTest;

import SpringProject._Spring.controller.AccountController.AccountControllerPut;
import SpringProject._Spring.dto.client.ClientUpdateDTO;
import SpringProject._Spring.model.Client;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AccountService;
import SpringProject._Spring.service.ClientService;
import SpringProject._Spring.service.VetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
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
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AccountControllerPut.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
public class AccountControllerJunitUpdateClientTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private AccountService accountService;
    @MockitoBean
    private VetService vetService;
    @MockitoBean
    private ClientService clientService;
    @MockitoBean
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ObjectMapper objectMapper;

    //happy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateClient_whenValid_thenReturnAnd200() throws Exception {
        //given
        ClientUpdateDTO clientUpdateDTO = new ClientUpdateDTO("UpdatedName", "UpdatedLastName", "123456");

        Client existingClient = new Client("OldName", "OldLastName", "12345", new Timestamp(1742600400000L));
        existingClient.setId(1L);

        when(clientService.findClientById(1L)).thenReturn(Optional.of(existingClient));
        when(clientService.updateClient(any(Client.class))).thenReturn(existingClient);

        //when
        mockMvc.perform(put("/api/client/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clientUpdateDTO)))
                //then
                .andExpect(status().isOk())
                .andExpectAll((jsonPath("firstName").value("UpdatedName")),
                        (jsonPath("lastName").value("UpdatedLastName")),
                        (jsonPath("phoneNumber").value("123456")));

        Mockito.verify(clientService, times(1)).updateClient(existingClient);
    }

    //unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateClient_whenClientDoesntExist_thenReturnAnd404() throws Exception {
        //given
        ClientUpdateDTO clientUpdateDTO = new ClientUpdateDTO("UpdatedName", "UpdatedLastName", "123456");

        given(clientService.findClientById(1L)).willReturn(Optional.empty());

        //when
        mockMvc.perform(put("/api/client/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clientUpdateDTO)))
                //then
                .andExpect(status().isNotFound())
                .andExpect(status().reason("Client account not found!"));

        Mockito.verify(clientService, times(0)).updateClient(any());
    }

    //unhappy path
    @Test
    void updateClient_whenUnauthenticated_thenReturnAnd401() throws Exception {
        //given
        ClientUpdateDTO clientUpdateDTO = new ClientUpdateDTO("UpdatedName", "UpdatedLastName", "123456");

        //when
        mockMvc.perform(put("/api/client/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clientUpdateDTO)))
                //then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());
    }

    //unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateClient_whenNotValidRequest_thenReturnAnd400() throws Exception {
        //given
        ClientUpdateDTO clientUpdateDTO = new ClientUpdateDTO("3", "12", "1");

        //when
        mockMvc.perform(put("/api/client/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(clientUpdateDTO)))
                //then
                .andExpect(status().isBadRequest());
    }
}
