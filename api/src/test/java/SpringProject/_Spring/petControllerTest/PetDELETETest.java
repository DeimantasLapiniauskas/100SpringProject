package SpringProject._Spring.petControllerTest;

import SpringProject._Spring.controller.PetController;
import SpringProject._Spring.model.pet.Gender;
import SpringProject._Spring.model.pet.Pet;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Role;
import SpringProject._Spring.repository.PetRepository;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.PetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PetController.class)
@Import(SecurityConfig.class)
public class PetDELETETest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private PetRepository petRepository;

    @MockitoBean
    private AccountService accountService;
    @MockitoBean
    private ClientService clientService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void deletePet_whenDeletePetOwner_thenRespond204() throws Exception {
        long ownerId = 1L;
        long petId = 0;

        when(petService.existsById(petId))
                .thenReturn(true);

        Account account = new Account(
                "UserEmail", "SecretPassword", List.of(new Role("CLIENT"))
        );
        account.setId(ownerId);
        when(accountService.findByEmail(any()))
                .thenReturn(Optional.of(account)
                );

        Client client = new Client("firstName", "lastName", "123-456-789", new Timestamp(System.currentTimeMillis()));
        client.setAccount(account);
        when(clientService.findClientIdByEmail(any()))
                .thenReturn(client.getId());

        Pet pet = new Pet(ownerId, "TestName", "TestBreed", "TestSpecies", LocalDate.now(), Gender.Male);
        pet.setOwnerId(client.getId());

        when(petService.getPetById(petId))
                .thenReturn(Optional.of(pet));

        mockMvc.perform(delete("/api/pets/" + petId))
                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(petService, times(1)).deletePetById(petId);
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void deletePet_whenDifferentPetOwner_thenRespond403() throws Exception {
        long userId = 1;
        long petId = 0;

        when(petService.existsById(petId))
                .thenReturn(true);

        Account account = new Account("UserEmail", "SecretPassword", List.of(new Role("CLIENT")));
        account.setId(userId);
        when(accountService.findByEmail(any()))
                .thenReturn(Optional.of(account));

        Client client = new Client("firstName", "lastName", "123-456-789", new Timestamp(System.currentTimeMillis()));
        client.setAccount(account);
        when(clientService.findClientByAccountId(account.getId())).thenReturn(client);

        Pet pet = new Pet(userId + 1, "TestName", "TestBreed", "TestSpecies", LocalDate.now(), Gender.Male);
        when(petService.getPetById(pet.getId()))
                .thenReturn(Optional.of(pet));

        mockMvc.perform(delete("/api/pets/" + petId))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$").value("You can't delete someone else's pet!"));

        Mockito.verify(petService, times(0)).deletePetById(petId);
    }


    @Test
    void deletePet_whenUnauthorized_thenRespond401() throws Exception {

        long petId = 0;

        mockMvc.perform(delete("/api/pets/" + petId))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(petService, times(0)).deletePetById(petId);
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void deletePet_whenVet_thenRespond403() throws Exception {
        long petId = 0;

        mockMvc.perform(delete("/api/pets/" + petId))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(petService, times(0)).deletePetById(petId);
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void deletePet_whenAdmin_thenRespond204() throws Exception {
        long ownerId = 1L;
        long petId = 0;

        when(petService.existsById(petId))
                .thenReturn(true);

        Account account = new Account("UserEmail", "SecretPassword", List.of(new Role("ADMIN")));
        account.setId(ownerId + 1);

        when(accountService.findByEmail(any()))
                .thenReturn(Optional.of(account)
                );
        Client client = new Client("firstName", "lastName", "123-456-789", new Timestamp(System.currentTimeMillis()));
        client.setAccount(new Account("email", "password", List.of(new Role("ADMIN", 1))));
        when(clientService.findClientByAccountId(account.getId())).thenReturn(client);

        when(petService.getPetById(petId))
                .thenReturn(Optional.of(new Pet(ownerId + 1, "TestName", "TestBreed", "TestSpecies", LocalDate.now(), Gender.Male)));

        mockMvc.perform(delete("/api/pets/" + petId))
                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$").doesNotExist());
    }
}
