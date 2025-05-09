package SpringProject._Spring.accountControllerTest;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.accountController.AccountControllerPut;
import SpringProject._Spring.dto.authentication.vet.VetUpdateRequestDTO;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
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

import java.time.LocalDate;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AccountControllerPut.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
@AutoConfigureMockMvc
public class AccountUpdateVetTest {

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
    void updateVet_whenValid_thenReturnAnd200() throws Exception {
        //given
        VetUpdateRequestDTO vetUpdateRequestDTO = new VetUpdateRequestDTO("UpdatedName", "UpdatedLastName", "123456", "Professional", "123456");

        Vet existingVet = new Vet("FirstName", "LastName", "12345", "NotProfessional", "12345", LocalDate.of(2024, 4, 10));
        existingVet.setId(1L);

        when(vetService.existsVetById(1L)).thenReturn(true);
        when(vetService.getVetById(1L)).thenReturn(Optional.of(existingVet));
        when(vetService.updateVet(any(Vet.class))).thenReturn(existingVet);

        //when
        mockMvc.perform(put("/api/vet/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vetUpdateRequestDTO)))
                //then
                .andExpect(status().isOk())
                .andExpectAll((jsonPath("data.firstName").value("UpdatedName")),
                        (jsonPath("data.lastName").value("UpdatedLastName")),
                        (jsonPath("data.phoneNumber").value("123456")),
                        (jsonPath("data.specialty").value("Professional")),
                        (jsonPath("data.licenseNumber").value("123456")));

        Mockito.verify(vetService, times(1)).updateVet(existingVet);
    }

    //unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateVet_whenVetDoesntExist_thenReturnAnd404() throws Exception {
        //given
        VetUpdateRequestDTO vetUpdateRequestDTO = new VetUpdateRequestDTO("UpdatedName", "UpdatedLastName", "123456", "Professional", "123456");

        given(vetService.existsVetById(1L)).willReturn(false);

        //when
        mockMvc.perform(put("/api/vet/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vetUpdateRequestDTO)))
                //then
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Vet account not found!"));

        Mockito.verify(vetService, times(0)).updateVet(any());
    }

    //unhappy path
    @Test
    void updateVet_whenUnauthenticated_thenReturnAnd401() throws Exception {
        //given
        VetUpdateRequestDTO vetUpdateRequestDTO = new VetUpdateRequestDTO("UpdatedName", "UpdatedLastName", "123456", "Professional", "123456");

        //when
        mockMvc.perform(put("/api/vet/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vetUpdateRequestDTO)))
                //then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());
    }

    //unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateVet_whenNotValidRequest_thenReturnAnd400() throws Exception {
        //given
        VetUpdateRequestDTO vetUpdateRequestDTO = new VetUpdateRequestDTO("12", "UpdatedLastName", "12345-acgg6", "Professional", "123456");

        //when
        mockMvc.perform(put("/api/vet/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vetUpdateRequestDTO)))
                //then
                .andExpect(status().isBadRequest());
    }
}
