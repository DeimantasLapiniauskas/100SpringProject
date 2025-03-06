package SpringProject._Spring.PetControllerTest;

import SpringProject._Spring.controller.PetController;
import SpringProject._Spring.dto.PetMapping;
import SpringProject._Spring.dto.PetRequestDTO;
import SpringProject._Spring.model.Account;
import SpringProject._Spring.model.Gender;
import SpringProject._Spring.model.Pet;
import SpringProject._Spring.model.Role;
import SpringProject._Spring.repository.PetRepository;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AccountService;
import SpringProject._Spring.service.PetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PetController.class)
@Import(SecurityConfig.class)
public class PetPUTTest {
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
    void putPet_whenPutPetOwner_thenRespond200() throws Exception {
        long ownerId = 1;
        Pet originalPet = new Pet(
                ownerId, "Kitty", "Cat", "Bald", LocalDate.now(), Gender.Male
        );

        PetRequestDTO changedPet = new PetRequestDTO(
                "Little Bastard", "Catto", "Yes", LocalDate.MIN, Gender.Female
        );

        when(accountService.existsAccountById(ownerId))
                .thenReturn(true);
        when(petService.existsById(0))
                .thenReturn(true);
        when(petService.getPetByid(0))
                .thenReturn(Optional.of(originalPet));
        Account account = new Account(
                "UserEmail", "SecretPassword", List.of(new Role("CLIENT"))
        );
        account.setId(ownerId);
        UserDetails principal = User.withUsername("admin")
                .password("password")
                .roles("ADMIN")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_ADMIN"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                "password", principal.getAuthorities()));
        SecurityContextHolder.setContext(securityContext);


        when(accountService.findByEmail(any()))
                .thenReturn(Optional.of(account)
                );

        mockMvc.perform(put("/api/pets/" + ownerId + "/" + 0)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(changedPet)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(0))
                .andExpect(jsonPath("name").value("Little Bastard"))
                .andExpect(jsonPath("species").value("Catto"))
                .andExpect(jsonPath("breed").value("Yes"))
                //we don't check LocalDate
                .andExpect(jsonPath("gender").value(Gender.Female.name()));

        Mockito.verify(petService, times(1)).savePet(ArgumentMatchers.any(Pet.class));
    }


    @Test
    void putPet_whenUnauthenticated_thenRespond401() throws Exception {
        long ownerId = 1;
        Pet originalPet = new Pet(
                ownerId, "Kitty", "Cat", "Bald", LocalDate.now(), Gender.Male
        );

        PetRequestDTO changedPet = new PetRequestDTO(
                "Little Bastard", "Catto", "Yes", LocalDate.MIN, Gender.Female
        );
        when(accountService.existsAccountById(ownerId))
                .thenReturn(true);
        when(petService.existsById(0))
                .thenReturn(true);
        when(petService.getPetByid(0))
                .thenReturn(Optional.of(originalPet));


        mockMvc.perform(put("/api/pets/" + ownerId + "/" + 0)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(changedPet)
                        )
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(petService, times(0)).savePet(ArgumentMatchers.any(Pet.class));
    }


    @Test
    void putPet_whenPutAdmin_thenRespond200() throws Exception {
        long ownerId = 1;
        Pet originalPet = new Pet(
                ownerId, "Kitty", "Cat", "Bald", LocalDate.now(), Gender.Male
        );

        PetRequestDTO changedPet = new PetRequestDTO(
                "Little Bastard", "Catto", "Yes", LocalDate.MIN, Gender.Female
        );

        when(accountService.existsAccountById(ownerId))
                .thenReturn(true);

        when(petService.existsById(0))
                .thenReturn(true);

        when(petService.getPetByid(0))
                .thenReturn(Optional.of(originalPet));


        Account account = new Account("UserEmail", "SecretPassword", List.of(new Role("ADMIN")));
        account.setId(5L);


        //essentially faking a better @WithMockUser
        UserDetails principal = User.withUsername("admin")
                .password("password")
                .roles("ADMIN")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_ADMIN"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                "password", principal.getAuthorities()));
        SecurityContextHolder.setContext(securityContext);


        when(accountService.findByEmail(any()))
                .thenReturn(Optional.of(account)
                );

        mockMvc.perform(put("/api/pets/" + ownerId + "/" + 0)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(changedPet)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(0))
                .andExpect(jsonPath("name").value("Little Bastard"))
                .andExpect(jsonPath("species").value("Catto"))
                .andExpect(jsonPath("breed").value("Yes"))
                //we don't check LocalDate
                .andExpect(jsonPath("gender").value(Gender.Female.name()));

        Mockito.verify(petService, times(1)).savePet(ArgumentMatchers.any(Pet.class));
    }


    @Test
    void putPet_whenPutDifferentOwner_thenRespond403() throws Exception {
        long ownerId = 1;
        Pet originalPet = new Pet(
                ownerId, "Kitty", "Cat", "Bald", LocalDate.now(), Gender.Male
        );

        PetRequestDTO changedPet = new PetRequestDTO(
                "Little Bastard", "Catto", "Yes", LocalDate.MIN, Gender.Female
        );

        when(accountService.existsAccountById(ownerId))
                .thenReturn(true);
        when(petService.existsById(0))
                .thenReturn(true);
        when(petService.getPetByid(0))
                .thenReturn(Optional.of(originalPet))
        ;

        when(accountService.findByEmail(any()))
                .thenReturn(Optional.of(
                                new Account(
                                        "UserEmail", "SecretPassword", List.of(new Role("CLIENT"))
                                )
                        )
                );


        Account account = new Account("UserEmail", "SecretPassword", List.of(new Role("CLIENT")));
        account.setId(ownerId + 1);
        UserDetails principal = User.withUsername("admin")
                .password("password")
                .roles("ADMIN")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_ADMIN"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                "password", principal.getAuthorities()));
        SecurityContextHolder.setContext(securityContext);

        mockMvc.perform(put("/api/pets/" + ownerId + "/" + 0)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(changedPet)
                        )
                )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$").value("You can't edit someone else's pet!"));


        Mockito.verify(petService, times(0)).savePet(ArgumentMatchers.any(Pet.class));
    }
}
