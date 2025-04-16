package SpringProject._Spring.petControllerTest;


import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.PetController;
import SpringProject._Spring.dto.pet.PetMapping;
import SpringProject._Spring.dto.pet.PetRequestDTO;
import SpringProject._Spring.model.pet.Gender;
import SpringProject._Spring.model.pet.Pet;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Role;
import SpringProject._Spring.service.authentication.ClientService;
import com.fasterxml.jackson.databind.ObjectMapper;

import SpringProject._Spring.repository.PetRepository;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.authentication.AccountService;
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


import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = PetController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
public class PetPOSTTest {

//    @Autowired
//    private DefaultEmailService emailService;
//
//    @Autowired
//    private JavaMailSender javaMailSender;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private PetRepository petRepository;

    @MockitoBean
    private ClientService clientService;

    @MockitoBean
    private AccountService accountService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.findAndRegisterModules();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void addPet_whenAddPetOwner_thenRespond201() throws Exception {
        long id = 1;
        Gender gender = Gender.Female;
        PetRequestDTO petRequestDTO = new PetRequestDTO(
                "Maja", "Egyptian", "cat", LocalDate.now(), gender
        );

        when(petService.savePet(any(Pet.class)))
                .thenReturn(PetMapping.toPet(petRequestDTO, id));

        Account account = new Account("UserEmail", "SecretPassword", List.of(new Role("ADMIN")));
        account.setId(id);
        Client client = new Client("firstName", "lastName", "123-456-789", new Timestamp(System.currentTimeMillis()));
        client.setAccount(account);

        when(clientService.findClientIdByEmail(any()))
                .thenReturn(id);
        when(clientService.existsClientById(id))
                .thenReturn(true);

        mockMvc.perform(post("/api/pets/add")
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
                .andExpect(jsonPath("data.name").value("Maja"))
                .andExpect(jsonPath("data.species").value("Egyptian"))
                .andExpect(jsonPath("data.breed").value("cat"))
                //can't check birthdate because DateTime is bullshit
                .andExpect(jsonPath("data.gender").value(gender.name())); //.name is necessary, otherwise it'll assume the identical value is, for some reason, different.

        Mockito.verify(petService, times(1)).savePet(ArgumentMatchers.any(Pet.class));
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void addPet_whenVet_thenRespond403() throws Exception {

        PetRequestDTO petRequestDTO = new PetRequestDTO(
                "Maja", "Egyptian", "cat", LocalDate.now(), Gender.Female
        );

        mockMvc.perform(post("/api/pets/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(
                                        PetMapping.toPetResponseDTO(
                                                PetMapping.toPet(
                                                        petRequestDTO, 1)
                                        )
                                )
                        )
                )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("message").value("Access Denied"));

        Mockito.verify(petService, times(0)).savePet(any());
    }

    @Test
    void addPet_whenUnauthenticated_thenRespond401() throws Exception {
        mockMvc.perform(post("/api/pets/add"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());
        Mockito.verify(petService, times(0)).savePet(any());
    }


}
