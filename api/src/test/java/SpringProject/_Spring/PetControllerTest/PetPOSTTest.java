package SpringProject._Spring.PetControllerTest;


import SpringProject._Spring.controller.PetController;
import SpringProject._Spring.dto.PetMapping;
import SpringProject._Spring.dto.PetRequestDTO;
import SpringProject._Spring.model.Gender;
import SpringProject._Spring.model.Pet;
import com.fasterxml.jackson.databind.ObjectMapper;

import SpringProject._Spring.repository.PetRepository;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AccountService;
import SpringProject._Spring.service.PetService;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;


import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = PetController.class)
@Import(SecurityConfig.class)
public class PetPOSTTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private PetRepository petRepository;

    @MockitoBean
    private AccountService accountService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void addPet_whenAddPetOwner_thenRespond201() throws Exception {
        long id = 1;
        Gender gender = Gender.Female;
        PetRequestDTO petRequestDTO = new PetRequestDTO(
                "Maja", "Egyptian", "cat", LocalDate.now(), gender
        );

        when(accountService.existsAccountById(id))
                .thenReturn(true);
        when(accountService.findIdByEmail(any())).thenReturn(id);
        when(petService.savePet(any(Pet.class)))
                .thenReturn(PetMapping.toPet(petRequestDTO, id));


        mockMvc.perform(post("/api/pets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(
                                        PetMapping.toPetResponseDTO(
                                                PetMapping.toPet(
                                                        petRequestDTO, id)
                                        )
                                )
                        )
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").value(0))
                .andExpect(jsonPath("name").value("Maja"))
                .andExpect(jsonPath("species").value("Egyptian"))
                .andExpect(jsonPath("breed").value("cat"))
                //can't check birthdate because DateTime is bullshit
                .andExpect(jsonPath("gender").value(gender.name())); //.name is necessary, otherwise it'll assume the identical value is, for some reason, different.

        Mockito.verify(petService, times(1)).savePet(ArgumentMatchers.any(Pet.class));
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void addPet_whenVet_thenRespond403() throws Exception {
        long id = 1;

        Gender gender = Gender.Female;
        PetRequestDTO petRequestDTO = new PetRequestDTO(
                "Maja", "Egyptian", "cat", LocalDate.now(), gender
        );
        mockMvc.perform(post("/api/pets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(
                                        PetMapping.toPetResponseDTO(
                                                PetMapping.toPet(
                                                        petRequestDTO, id)
                                        )
                                )
                        )
                )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$").doesNotExist());
        Mockito.verify(petService, times(0)).savePet(any());
    }

    @Test
    void addPet_whenUnauthenticated_thenRespond401() throws Exception {
        long id = 1;
        mockMvc.perform(post("/api/pets"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());
        Mockito.verify(petService, times(0)).savePet(any());
    }


}
