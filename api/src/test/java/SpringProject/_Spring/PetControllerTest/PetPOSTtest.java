package SpringProject._Spring.PetControllerTest;


import SpringProject._Spring.controller.PetController;
import SpringProject._Spring.dto.PetRequestDTO;
import SpringProject._Spring.model.Account;
import SpringProject._Spring.model.Gender;
import SpringProject._Spring.model.Pet;
import com.fasterxml.jackson.databind.ObjectMapper;

import SpringProject._Spring.repository.AccountRepository;
import SpringProject._Spring.repository.PetRepository;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AccountService;
import SpringProject._Spring.service.PetService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;


import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = PetController.class)
@Import(SecurityConfig.class)
public class PetPOSTtest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private PetRepository petRepository;

    @MockitoBean
    private AccountService accountService;

    @MockitoBean
    private AccountRepository accountRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @WithMockUser(roles = "USER")
    void addPet_whenAddPetOwner_thenRespond201() throws Exception{
        long id = 1;
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Date date = dateFormat.parse("2002-11-11");
        PetRequestDTO petRequestDTO = new PetRequestDTO(
                "Maja","Egyptian","cat", LocalDate.now(), Gender.Female
        );

        when(accountService.existsAccountById(id)).thenReturn(true);

        mockMvc.perform(post("/api/pets/"+id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(petRequestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").value(0))
                .andExpect(jsonPath("name").value(petRequestDTO.name()))
                .andExpect(jsonPath("species").value(petRequestDTO.species()))
                .andExpect(jsonPath("breed").value(petRequestDTO.breed()))
                .andExpect(jsonPath("birthdate").value(petRequestDTO.birthdate()))
                .andExpect(jsonPath("gender").value(petRequestDTO.gender()));

        Mockito.verify(petService,times(1)).savePet(ArgumentMatchers.any(Pet.class));

    }
}
