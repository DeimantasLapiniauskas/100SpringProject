package SpringProject._Spring.AppointmentControllerTest;


import SpringProject._Spring.controller.AppointmentController;
import SpringProject._Spring.dto.appointment.AppointmentRequestDTO;
import SpringProject._Spring.model.*;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Role;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.model.pet.Gender;
import SpringProject._Spring.model.pet.Pet;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.*;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private ClientService clientService;

    @MockitoBean
    private AppointmentService appointmentService;

    private final ObjectMapper objectMapper = new ObjectMapper();
    long petId;
    long ownerId;
    long vetId;
    long serviceIdOne;
    long serviceIdTwo;
    String note;
    Pet pet;
    Vet vet;
    ServiceAtClinic serviceOne;
    ServiceAtClinic serviceTwo;

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());

        petId = 1;
        ownerId = 3;
        vetId = 13;
        serviceIdOne = 5;
        serviceIdTwo = 8;
        note = "Notes";

        pet = new Pet(
                ownerId,
                "Maya",
                "Cat",
                "Bald",
                LocalDate.of(11, 11, 11),
                Gender.Female);

        vet = new Vet(
                "vetName",
                "vetLastName",
                "666-666-666",
                "Specialty",
                "LicenseNumber",
                LocalDate.of(11, 11, 11));
        vet.setAccount(new Account("VetEmail", "VetPassword", List.of(new Role("Vet", 2))));

        serviceOne = new ServiceAtClinic(
                "Service one",
                "Service Description One",
                BigDecimal.valueOf(10.1)
        );
        serviceOne.setId(serviceIdOne);

        serviceTwo = new ServiceAtClinic(
                "Service two",
                "Service Description Two",
                BigDecimal.valueOf(20.2)
        );
        serviceTwo.setId(serviceIdTwo);
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void addAppointment_whenAddClient_thenRespond201() throws Exception {


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
                                LocalDateTime.of(3000, 11, 11, 11, 11, 11),
                                note,
                                Timestamp.valueOf(LocalDateTime.of(3000, 11, 11, 11, 11, 11)
                                )
                        )
                );

        when(petService.getPetById(petId))
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
                                                LocalDateTime.of(3000, 11, 11, 11, 11, 11),
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

        Mockito.verify(appointmentService, times(1)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    void addAppointment_whenAddUnauthenticated_thenRespond401() throws Exception {

        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                        new AppointmentRequestDTO(
                                                petId,
                                                vetId,
                                                List.of(serviceIdOne, serviceIdTwo),
                                                LocalDateTime.of(3000, 11, 11, 11, 11, 11),
                                                note)
                                )
                        )
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(appointmentService, times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void addAppointment_whenBadRequest_thenRespond400() throws Exception {

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

        when(petService.getPetById(petId))
                .thenReturn(Optional.of(pet));

        when(vetService.getVetById(vetId))
                .thenReturn(Optional.of(vet));

        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                        new AppointmentRequestDTO(
                                                null,
                                                vetId,
                                                List.of(serviceIdOne, serviceIdTwo),
                                                LocalDateTime.now(),
                                                note)
                                )
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("petId").value("You have to actually register a pet!"));


        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                        new AppointmentRequestDTO(
                                                petId,
                                                null,
                                                List.of(serviceIdOne, serviceIdTwo),
                                                LocalDateTime.now(),
                                                note)
                                )
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("vetId").value("You have to actually register to a vet!"));


        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                        new AppointmentRequestDTO(
                                                petId,
                                                vetId,
                                                null,
                                                LocalDateTime.now(),
                                                note)
                                )
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("serviceIds").value("You have to actually register to a service!"));


        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                        new AppointmentRequestDTO(
                                                petId,
                                                vetId,
                                                List.of(serviceIdOne, serviceIdTwo),
                                                null,
                                                note)
                                )
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("appointmentDate").value("You have to actually register at a predetermined time!"));


        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                        new AppointmentRequestDTO(
                                                petId,
                                                vetId,
                                                List.of(serviceIdOne, serviceIdTwo),
                                                LocalDateTime.of(2000, 11, 11, 11, 11),
                                                note)
                                )
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("appointmentDate").value("You can't make an appointment in the past!"));


        mockMvc.perform(post("/api/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                        new AppointmentRequestDTO(
                                                petId,
                                                vetId,
                                                List.of(serviceIdOne, serviceIdTwo),
                                                LocalDateTime.now(),
                                                "Did you ever hear the tragedy of Darth Plagueis the wise? No. I thought not, It's No story the jedi would tell you. It's a sith legend. Darth Plagueis was a Dark Lord of the sith. He was so powerful, Yet so wise. He could use the force to influence the medi chlorians to create, Life. He had such a knowledge of the Dark side, He could even keep the ones he cared about, From dying. He could actually, Save the ones he cared about from death? The dark side of the force is a pathway to many abilities some consider to be unnatural. Well what happened to him? Darth Plagueis became so powerful that the only thing he feared was losing his power, Which eventually of course he did. Unfortunately, He taught his apprentice everything he knew. Then his apprentice killed him in his sleep. Ironic, He could save others from death, But not himself. Is it possible to learn this power? Not from a jedi.")
                                )
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("notes").value("Your note is too long! Please keep it to 255 or less characters."));

        Mockito.verify(appointmentService, times(0)).saveAppointment(ArgumentMatchers.any());
    }
}
