package SpringProject._Spring.AccountControllerTest;

import SpringProject._Spring.controller.AccountController.AccountControllerPut;
import SpringProject._Spring.dto.vet.VetUpdateDTO;
import SpringProject._Spring.model.Role;
import SpringProject._Spring.model.Vet;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AccountService;
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

import java.time.LocalDate;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AccountControllerPut.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
public class AccountControllerJunitUpdateVetTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private AccountService accountService;
    @MockitoBean
    private VetService vetService;
    @MockitoBean
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ObjectMapper objectMapper;

    //happy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateVet_whenValid_thenReturnAnd200() throws Exception {
        //given
        VetUpdateDTO vetUpdateDTO = new VetUpdateDTO("UpdatedName", "UpdatedLastName", "123456", "Professional", "123456");

        Vet existingVet = new Vet("FirstName", "LastName", "12345", "NotProfessional", "12345", LocalDate.of(2024, 4, 10));
        existingVet.setId(1L);

        when(vetService.getVetById(1L)).thenReturn(Optional.of(existingVet));
        when(vetService.updateVet(any(Vet.class))).thenReturn(existingVet);

        //when
        mockMvc.perform(put("/api/vet/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vetUpdateDTO)))
                //then
                .andExpect(status().isOk())
                .andExpectAll((jsonPath("firstName").value("UpdatedName")),
                        (jsonPath("lastName").value("UpdatedLastName")),
                        (jsonPath("phoneNumber").value("123456")),
                        (jsonPath("specialty").value("Professional")),
                        (jsonPath("licenseNumber").value("123456")));

        Mockito.verify(vetService, times(1)).updateVet(existingVet);
    }

    //unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateVet_whenVetDoesntExist_thenReturnAnd404() throws Exception {
        //given
        VetUpdateDTO vetUpdateDTO = new VetUpdateDTO("UpdatedName", "UpdatedLastName", "123456", "Professional", "123456");

        given(vetService.getVetById(1L)).willReturn(Optional.empty());

        //when
        mockMvc.perform(put("/api/vet/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vetUpdateDTO)))
                //then
                .andExpect(status().isNotFound())
                .andExpect(status().reason("Vet account not found!"));

        Mockito.verify(vetService, times(0)).updateVet(any());
    }

    //unhappy path
    @Test
    void updateVet_whenUnauthenticated_thenReturnAnd401() throws Exception {
        //given
        VetUpdateDTO vetUpdateDTO = new VetUpdateDTO("UpdatedName", "UpdatedLastName", "123456", "Professional", "123456");

        //when
        mockMvc.perform(put("/api/vet/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vetUpdateDTO)))
                //then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());
    }
}
