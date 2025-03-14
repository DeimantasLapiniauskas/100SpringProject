package SpringProject._Spring.AppointmentControllerTest;

import SpringProject._Spring.controller.AppointmentController;
import SpringProject._Spring.model.*;
import SpringProject._Spring.repository.AppointmentRepository;
import SpringProject._Spring.repository.PetRepository;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.assertj.MockMvcTester;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AppointmentController.class)
@Import(SecurityConfig.class)
public class AppointmentGETTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AppointmentService appointmentService;

    @MockitoBean
    private ClientService clientService;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private VetService vetService;

    @MockitoBean
    private AppointmentRepository appointmentRepository;

    @MockitoBean
    private AccountService accountService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void getAppointments_whenClientGetAllOwnAppointments_thenReturnAllAppointmentsAnd200() throws Exception {
        List<Appointment> listOfAppointments = List.of(
                new Appointment(
                        1,
                        1,
                        List.of(new ServiceAtClinic(
                                        "TestService1",
                                        "TestServiceDescription1",
                                        BigDecimal.valueOf(10.1)
                                )
                        ),
                        LocalDateTime.now(),
                        "AppointmentNotes1",
                        Timestamp.valueOf(LocalDateTime.now())
                ),
                new Appointment(
                        2,
                        2,
                        List.of(new ServiceAtClinic(
                                        "TestService2",
                                        "TestServiceDescription2",
                                        BigDecimal.valueOf(10.2)
                                )
                        ),
                        LocalDateTime.now(),
                        "AppointmentNotes2",
                        Timestamp.valueOf(LocalDateTime.now())
                ));
        listOfAppointments.get(0).setId(1);
        listOfAppointments.get(1).setId(2);

        when(appointmentService.getAllAppointmentsByClientId(any()))
                .thenReturn(listOfAppointments);

        when(petService.getPetByid(1))
                .thenReturn(Optional.of(new Pet(
                        1,
                        "petName1",
                        "speciesName1",
                        "breedName1",
                        LocalDate.now(),
                        Gender.Male)));

        when(vetService.getVetById(1))
                .thenReturn(Optional.of(new Vet(
                        "firstName1",
                        "lastName1",
                        "666-666-666",
                        "specialty1",
                        "licenseNumber1",
                        LocalDate.now()
                )));

        when(petService.getPetByid(2))
                .thenReturn(Optional.of(new Pet(
                        2,
                        "petName2",
                        "speciesName2",
                        "breedName2",
                        LocalDate.now(),
                        Gender.Female)));

        when(vetService.getVetById(2))
                .thenReturn(Optional.of(new Vet(
                        "firstName2",
                        "lastName2",
                        "777-777-777",
                        "specialty2",
                        "licenseNumber2",
                        LocalDate.now()
                )));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("[0].id").value(1));
    }
}
