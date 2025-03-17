//package SpringProject._Spring.PetControllerTest;
//
//import SpringProject._Spring.controller.PetController;
//import SpringProject._Spring.model.Account;
//import SpringProject._Spring.model.Gender;
//import SpringProject._Spring.model.Pet;
//import SpringProject._Spring.model.Role;
//import SpringProject._Spring.repository.PetRepository;
//import SpringProject._Spring.security.SecurityConfig;
//import SpringProject._Spring.service.AccountService;
//import SpringProject._Spring.service.ClientService;
//import SpringProject._Spring.service.PetService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.context.annotation.Import;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.context.bean.override.mockito.MockitoBean;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.time.LocalDate;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//
//@WebMvcTest(controllers = PetController.class)
//@Import(SecurityConfig.class)
//public class PetGETTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockitoBean
//    private PetService petService;
//
//    @MockitoBean
//    private ClientService clientService;
//
//    @MockitoBean
//    private PetRepository petRepository;
//
//    @MockitoBean
//    private AccountService accountService;
//
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    @BeforeEach
//    public void init() {
//        objectMapper.registerModule(new JavaTimeModule());
//    }
//
//    @Test
//    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
//    void getPets_whenGetClient_thenRespond200() throws Exception {
//        Account account = new Account("email", "password", List.of(new Role("CLIENT")));
//        long ownerId = 1;
//        account.setId(ownerId);
//
//        Pet petOne = new Pet(
//                ownerId, "Kitty", "Cat", "Bald", LocalDate.now(), Gender.Male
//        );
//
//        Pet petTwo = new Pet(
//                ownerId, "Doggo", "Dog", "HeckinFloofer", LocalDate.now(), Gender.Female
//        );
//
//        when(petService.getAllPetsByOwnerId(ownerId))
//                .thenReturn(List.of(petOne, petTwo));
//
//        mockMvc.perform(get("/api/pets"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("[0].id").value(0))
//                .andExpect(jsonPath("[0].name").value("Kitty"))
//                .andExpect(jsonPath("[0].species").value("Cat"))
//                .andExpect(jsonPath("[0].breed").value("Bald"))
//                //Can't check birthdate
//                .andExpect(jsonPath("[0].gender").value(Gender.Male.name()))
//
//                .andExpect(jsonPath("[1].id").value(0))
//                .andExpect(jsonPath("[1].name").value("Doggo"))
//                .andExpect(jsonPath("[1].species").value("Dog"))
//                .andExpect(jsonPath("[1].breed").value("HeckinFloofer"))
//                .andExpect(jsonPath("[1].gender").value(Gender.Female.name()));//.name is necessary, otherwise it'll assume the identical value is, for some reason, different.
//
//        Mockito.verify(petService, times(1)).getAllPetsByOwnerId(1);
//    }
//
//    @Test
//    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
//    void getPets_whenGetADMIN_thenRespond200() throws Exception {
//        Account account = new Account("email", "password", List.of(new Role("ADMIN")));
//        long ownerId = 1;
//        account.setId(ownerId + 5);
//        System.out.println(account.getAuthorities());
//
//        Pet petOne = new Pet(
//                ownerId, "Kitty", "Cat", "Bald", LocalDate.now(), Gender.Male
//        );
//
//        Pet petTwo = new Pet(
//                ownerId, "Doggo", "Dog", "HeckinFloofer", LocalDate.now(), Gender.Female
//        );
//
//        when(accountService.existsAccountById(ownerId))
//                .thenReturn(true);
//        when(accountService.findIdByEmail(any()))
//                .thenReturn(ownerId);
//        when(petService.getAllPetsByOwnerId(ownerId))
//                .thenReturn(List.of(petOne, petTwo));
//
//        mockMvc.perform(get("/api/pets/" + ownerId))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("[0].id").value(0))
//                .andExpect(jsonPath("[0].name").value("Kitty"))
//                .andExpect(jsonPath("[0].species").value("Cat"))
//                .andExpect(jsonPath("[0].breed").value("Bald"))
//                //Can't check birthdate
//                .andExpect(jsonPath("[0].gender").value(Gender.Male.name()))
//
//                .andExpect(jsonPath("[1].id").value(0))
//                .andExpect(jsonPath("[1].name").value("Doggo"))
//                .andExpect(jsonPath("[1].species").value("Dog"))
//                .andExpect(jsonPath("[1].breed").value("HeckinFloofer"))
//                .andExpect(jsonPath("[1].gender").value(Gender.Female.name()));//.name is necessary, otherwise it'll assume the identical value is, for some reason, different.
//
//        Mockito.verify(petService, times(1)).getAllPetsByOwnerId(1);
//    }
//
//    private void getPets(Account account) throws Exception {
//        long ownerId = 1;
//        account.setId(ownerId);
//
//        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
//        SecurityContextHolder.getContext().setAuthentication(auth);
//
//        Pet petOne = new Pet(
//                ownerId, "Kitty", "Cat", "Bald", LocalDate.now(), Gender.Male
//        );
//
//        Pet petTwo = new Pet(
//                ownerId, "Doggo", "Dog", "HeckinFloofer", LocalDate.now(), Gender.Female
//        );
//
//        when(accountService.existsAccountById(ownerId))
//                .thenReturn(true);
//        when(accountService.findIdByEmail(any()))
//                .thenReturn(ownerId);
//        when(petService.getAllPetsByOwnerId(ownerId))
//                .thenReturn(List.of(petOne, petTwo));
//
//        mockMvc.perform(get("/api/pets/" + ownerId))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("[0].id").value(0))
//                .andExpect(jsonPath("[0].name").value("Kitty"))
//                .andExpect(jsonPath("[0].species").value("Cat"))
//                .andExpect(jsonPath("[0].breed").value("Bald"))
//                //Can't check birthdate
//                .andExpect(jsonPath("[0].gender").value(Gender.Male.name()))
//
//                .andExpect(jsonPath("[1].id").value(0))
//                .andExpect(jsonPath("[1].name").value("Doggo"))
//                .andExpect(jsonPath("[1].species").value("Dog"))
//                .andExpect(jsonPath("[1].breed").value("HeckinFloofer"))
//                .andExpect(jsonPath("[1].gender").value(Gender.Female.name()));//.name is necessary, otherwise it'll assume the identical value is, for some reason, different.
//
//        Mockito.verify(petService, times(1)).getAllPetsByOwnerId(1);
//    }
//
//
//    @Test
//    void getPets_whenUnauthorized_thenRespond401() throws Exception {
//        long ownerId = 1;
//        mockMvc.perform(get("/api/pets"))
//                .andExpect(status().isUnauthorized())
//                .andExpect(jsonPath("$").doesNotExist());
//
//        Mockito.verify(petService, times(0)).getAllPetsByOwnerId(ownerId);
//    }
//
//
//    @Test
//    @WithMockUser(authorities = "SCOPE_ROLE_VET")
//    void getPets_whenGetVet_thenRespond403() throws Exception {
//
//        mockMvc.perform(get("/api/pets"))
//                .andExpect(status().isForbidden())
//                .andExpect(jsonPath("$").doesNotExist());
//
//    }
//
//
//}
