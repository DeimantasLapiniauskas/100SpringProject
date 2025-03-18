package SpringProject._Spring.AppointmentControllerTest;


import SpringProject._Spring.controller.AppointmentController;
import SpringProject._Spring.dto.appointment.AppointmentRequestDTO;
import SpringProject._Spring.model.*;
import SpringProject._Spring.repository.AppointmentRepository;
import SpringProject._Spring.repository.PetRepository;
import SpringProject._Spring.repository.VetRepository;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AppointmentController.class)
@Import(SecurityConfig.class)
public class AppointmentPOSTTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private VetService vetService;

    @MockitoBean
    private ServiceAtClinicService serviceService; //throws errors if not here

    @MockitoBean
    private AccountService accountService; //throws errors if not here

    @MockitoBean
    private AppointmentService appointmentService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void addAppointment_whenAddClient_thenRespond201() throws Exception {

        long petId = 1;
        long ownerId = 3;
        long vetId = 13;
        long serviceIdOne = 5;
        long serviceIdTwo = 8;
        String note = "Notes";


        Pet pet = new Pet(
                ownerId,
                "Maya",
                "Cat",
                "Bald",
                LocalDate.now(),
                Gender.Female);

        Vet vet = new Vet(
                "vetName",
                "vetLastName",
                "666-666-666",
                "Specialty",
                "LicenseNumber",
                LocalDate.now()
        );

        vet.setAccount(new Account("VetEmail", "VetPassword", List.of(new Role("Vet", 2))));

        ServiceAtClinic serviceOne = new ServiceAtClinic(
                "Service one",
                "Service Description One",
                BigDecimal.valueOf(10.1)
        );
        serviceOne.setId(serviceIdOne);

        ServiceAtClinic serviceTwo = new ServiceAtClinic(
                "Service two",
                "Service Description Two",
                BigDecimal.valueOf(20.2)
        );
        serviceTwo.setId(serviceIdTwo);

        when(appointmentService.existsByPetIdAndServiceId(petId, serviceIdOne))
                .thenReturn(false);

        when(serviceService.findServiceAtClinicById(serviceIdOne))
                .thenReturn(Optional.of(serviceOne));

        when(serviceService.findServiceAtClinicById(serviceIdTwo))
                .thenReturn(Optional.of(serviceTwo));

        when(appointmentService.existsByPetIdAndServiceId(petId, serviceIdTwo))
                .thenReturn(false);

        when(appointmentService.saveAppointment(any()))
                .thenReturn(
                        new Appointment(
                                petId,
                                vetId,
                                List.of(serviceOne, serviceTwo),
                                LocalDateTime.now(),
                                note,
                                Timestamp.valueOf(LocalDateTime.now())
                        )
                );

        when(petService.getPetByid(petId))
                .thenReturn(Optional.of(pet));

        when(vetService.getVetById(vetId))
                .thenReturn(Optional.of(vet));


        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                        new AppointmentRequestDTO(
                                                petId,
                                                vetId,
                                                List.of(serviceIdOne, serviceIdTwo),
                                                LocalDateTime.now(),
                                                note)
                                )
                        )
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").value("0"))
                .andExpect(jsonPath("petDTO.name").value(pet.getName()))
                .andExpect(jsonPath("petDTO.species").value(pet.getSpecies()))
                .andExpect(jsonPath("petDTO.breed").value(pet.getBreed()))
                .andExpect(jsonPath("petDTO.gender").value(pet.getGender().name()))
                .andExpect(jsonPath("petDTO.name").value(pet.getName()))
                .andExpect(jsonPath("vetDTO.email").value(vet.getAccount().getEmail()))
                .andExpect(jsonPath("vetDTO.firstName").value(vet.getFirstName()))
                .andExpect(jsonPath("vetDTO.lastName").value(vet.getLastName()))
                .andExpect(jsonPath("vetDTO.specialty").value(vet.getSpecialty()))
                .andExpect(jsonPath("services[0].name").value(serviceOne.getName()))
                .andExpect(jsonPath("services[0].description").value(serviceOne.getDescription()))
                .andExpect(jsonPath("services[0].price").value(serviceOne.getPrice()))
                .andExpect(jsonPath("services[1].name").value(serviceTwo.getName()))
                .andExpect(jsonPath("services[1].description").value(serviceTwo.getDescription()))
                .andExpect(jsonPath("services[1].price").value(serviceTwo.getPrice()))
                .andExpect(jsonPath("notes").value(note))
                .andExpect(jsonPath("price").value(serviceOne.getPrice().add(serviceTwo.getPrice())));

Mockito.verify(appointmentService,times(1)).saveAppointment(ArgumentMatchers.any());


    }
}
