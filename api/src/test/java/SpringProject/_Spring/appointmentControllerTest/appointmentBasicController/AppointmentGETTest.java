package SpringProject._Spring.appointmentControllerTest.appointmentBasicController;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.appointmentController.AppointmentBasicController;
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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AppointmentBasicController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
public class AppointmentGETTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private VetService vetService;

    @MockitoBean
    private AccountService accountService;

    @MockitoBean
    private ServiceAtClinicService serviceService; //throws errors if not here

    @MockitoBean
    private ClientService clientService;

    @MockitoBean
    private AppointmentService appointmentService;

    long petIdOne;
    long petIdTwo;
    long vetIdOne;
    long vetIdTwo;
    long clientId;
    long appointmentOneId;
    long appointmentTwoId;
    String note;
    Pet petOne;
    Pet petTwo;
    Vet vetOne;
    Vet vetTwo;
    ServiceAtClinic serviceAtClinicOne;
    ServiceAtClinic serviceAtClinicTwo;
    ServiceAtClinic serviceAtClinicThree;
    ServiceAtClinic serviceAtClinicFour;
    Appointment appointmentOne;
    Appointment appointmentTwo;


    @BeforeEach
    public void init() {
        clientId = 1;
        petIdOne = 9;
        vetIdOne = 4;
        petIdTwo = 47;
        vetIdTwo = 65138;
        appointmentOneId = 69420;
        appointmentTwoId = 1337666;

        petOne = new Pet(
                clientId,
                "petOneName",
                "petOneSpecies",
                "petOneBreed",
                LocalDate.now(),
                Gender.Female);

        petOne.setId(petIdOne);

        petTwo = new Pet(
                clientId,
                "petTwoName",
                "petTwoSpecies",
                "petTwoBreed",
                LocalDate.now(),
                Gender.Female);

        petTwo.setId(petIdTwo);


        vetOne = new Vet(
                "vetOneName",
                "vetOneLastName",
                "111-111-111",
                "vetOneSpecialty",
                "vetOneLicenseNumber",
                LocalDate.now()
        );

        vetOne.setAccount(new Account("VetEmail", "VetPassword", List.of(new Role("Vet", 2))));
        vetOne.setId(vetIdOne);

        vetTwo = new Vet(
                "vetTwoName",
                "vetTwoLastName",
                "222-222-222",
                "vetTwoSpecialty",
                "vetTwoLicenseNumber",
                LocalDate.now()
        );

        vetTwo.setAccount(new Account("VetEmail", "VetPassword", List.of(new Role("Vet", 2))));
        vetTwo.setId(vetIdTwo);


        serviceAtClinicOne = new ServiceAtClinic(
                "ServiceOneName",
                "ServiceOneDescription",
                BigDecimal.valueOf(111),
                "https://example.com/new.jpg"
        );

        serviceAtClinicTwo = new ServiceAtClinic(
                "ServiceTwoName",
                "ServiceTwoDescription",
                BigDecimal.valueOf(222),
                "https://example.com/new.jpg"
        );

        serviceAtClinicThree = new ServiceAtClinic(
                "ServiceThreeName",
                "ServiceThreeDescription",
                BigDecimal.valueOf(333),
                "https://example.com/new.jpg"
        );

        serviceAtClinicFour = new ServiceAtClinic(
                "ServiceFourName",
                "ServiceFourDescription",
                BigDecimal.valueOf(444),
                "https://example.com/new.jpg"
        );

        appointmentOne = new Appointment(
                petIdOne,
                vetIdOne,
                List.of(serviceAtClinicOne, serviceAtClinicTwo),
                LocalDateTime.now(),
                "notesOne",
                Timestamp.valueOf(LocalDateTime.now()));

        appointmentOne.setId(appointmentOneId);

        appointmentTwo = new Appointment(
                petIdTwo,
                vetIdTwo,
                List.of(serviceAtClinicThree, serviceAtClinicFour),
                LocalDateTime.now(),
                "notesTwo",
                Timestamp.valueOf(LocalDateTime.now()));

        appointmentTwo.setId(appointmentTwoId);
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void getAppointments_whenGetClient_thenRespond200() throws Exception {

        when(clientService.findClientIdByEmail(any()))
                .thenReturn(clientId);
        when(appointmentService.getAllAppointmentsByClientId(clientId))
                .thenReturn(List.of(appointmentOne, appointmentTwo));

        when(petService.getPetById(petIdOne))
                .thenReturn(Optional.of(petOne));
        when(petService.getPetById(petIdTwo))
                .thenReturn(Optional.of(petTwo));

        when(vetService.getVetById(vetIdOne))
                .thenReturn(Optional.of(vetOne));
        when(vetService.getVetById(vetIdTwo))
                .thenReturn(Optional.of(vetTwo));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/client"))
                .andExpect(status().isOk())

                .andExpect(jsonPath("data.[0].id").value(appointmentOneId))
                .andExpect(jsonPath("data.[1].id").value(appointmentTwoId))

                .andExpect(jsonPath("data.[0].petDTO.name").value(petOne.getName()))
                .andExpect(jsonPath("data.[1].petDTO.name").value(petTwo.getName()))
                .andExpect(jsonPath("data.[0].petDTO.species").value(petOne.getSpecies()))
                .andExpect(jsonPath("data.[1].petDTO.species").value(petTwo.getSpecies()))
                .andExpect(jsonPath("data.[0].petDTO.breed").value(petOne.getBreed()))
                .andExpect(jsonPath("data.[1].petDTO.breed").value(petTwo.getBreed()))
                .andExpect(jsonPath("data.[0].petDTO.gender").value(petOne.getGender().name()))
                .andExpect(jsonPath("data.[1].petDTO.gender").value(petTwo.getGender().name()))

                .andExpect(jsonPath("data.[0].vetDTO.email").value(vetOne.getAccount().getEmail()))
                .andExpect(jsonPath("data.[1].vetDTO.email").value(vetTwo.getAccount().getEmail()))
                .andExpect(jsonPath("data.[0].vetDTO.firstName").value(vetOne.getFirstName()))
                .andExpect(jsonPath("data.[1].vetDTO.firstName").value(vetTwo.getFirstName()))
                .andExpect(jsonPath("data.[0].vetDTO.lastName").value(vetOne.getLastName()))
                .andExpect(jsonPath("data.[1].vetDTO.lastName").value(vetTwo.getLastName()))
                .andExpect(jsonPath("data.[0].vetDTO.specialty").value(vetOne.getSpecialty()))
                .andExpect(jsonPath("data.[1].vetDTO.specialty").value(vetTwo.getSpecialty()))

                .andExpect(jsonPath("data.[0].services[0].name").value(serviceAtClinicOne.getName()))
                .andExpect(jsonPath("data.[1].services[0].name").value(serviceAtClinicThree.getName()))
                .andExpect(jsonPath("data.[0].services[0].description").value(serviceAtClinicOne.getDescription()))
                .andExpect(jsonPath("data.[1].services[0].description").value(serviceAtClinicThree.getDescription()))
                .andExpect(jsonPath("data.[0].services[0].price").value(serviceAtClinicOne.getPrice()))
                .andExpect(jsonPath("data.[1].services[0].price").value(serviceAtClinicThree.getPrice()))
                .andExpect(jsonPath("data.[0].services[1].name").value(serviceAtClinicTwo.getName()))
                .andExpect(jsonPath("data.[1].services[1].name").value(serviceAtClinicFour.getName()))
                .andExpect(jsonPath("data.[0].services[1].description").value(serviceAtClinicTwo.getDescription()))
                .andExpect(jsonPath("data.[1].services[1].description").value(serviceAtClinicFour.getDescription()))
                .andExpect(jsonPath("data.[0].services[1].price").value(serviceAtClinicTwo.getPrice()))
                .andExpect(jsonPath("data.[1].services[1].price").value(serviceAtClinicFour.getPrice()))

                .andExpect(jsonPath("data.[0].notes").value(appointmentOne.getNotes()))
                .andExpect(jsonPath("data.[1].notes").value(appointmentTwo.getNotes()))

                .andExpect(jsonPath("data.[0].price").value(appointmentOne.getTotalServicesSum()))
                .andExpect(jsonPath("data.[1].price").value(appointmentTwo.getTotalServicesSum()));

        Mockito.verify(appointmentService, times(1)).getAllAppointmentsByClientId(clientId);
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void getAppointments_whenGetVet_thenRespond200() throws Exception {

        when(vetService.findVetByAccountEmail(any()))
                .thenReturn(Optional.of(vetOne));
        when(appointmentService.getAllAppointmentsByVetId(vetIdOne))
                .thenReturn(List.of(appointmentOne, appointmentTwo));
        when(petService.getPetById(petIdOne))
                .thenReturn(Optional.of(petOne));
        when(petService.getPetById(petIdTwo))
                .thenReturn(Optional.of(petTwo));
        when(vetService.getVetById(vetIdOne))
                .thenReturn(Optional.of(vetOne));
        when(vetService.getVetById(vetIdTwo))
                .thenReturn(Optional.of(vetTwo));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/vet"))
                .andExpect(status().isOk())

                .andExpect(jsonPath("data.[0].id").value(appointmentOneId))
                .andExpect(jsonPath("data.[1].id").value(appointmentTwoId))

                .andExpect(jsonPath("data.[0].petDTO.name").value(petOne.getName()))
                .andExpect(jsonPath("data.[1].petDTO.name").value(petTwo.getName()))
                .andExpect(jsonPath("data.[0].petDTO.species").value(petOne.getSpecies()))
                .andExpect(jsonPath("data.[1].petDTO.species").value(petTwo.getSpecies()))
                .andExpect(jsonPath("data.[0].petDTO.breed").value(petOne.getBreed()))
                .andExpect(jsonPath("data.[1].petDTO.breed").value(petTwo.getBreed()))
                .andExpect(jsonPath("data.[0].petDTO.gender").value(petOne.getGender().name()))
                .andExpect(jsonPath("data.[1].petDTO.gender").value(petTwo.getGender().name()))

                .andExpect(jsonPath("data.[0].vetDTO.email").value(vetOne.getAccount().getEmail()))
                .andExpect(jsonPath("data.[1].vetDTO.email").value(vetTwo.getAccount().getEmail()))
                .andExpect(jsonPath("data.[0].vetDTO.firstName").value(vetOne.getFirstName()))
                .andExpect(jsonPath("data.[1].vetDTO.firstName").value(vetTwo.getFirstName()))
                .andExpect(jsonPath("data.[0].vetDTO.lastName").value(vetOne.getLastName()))
                .andExpect(jsonPath("data.[1].vetDTO.lastName").value(vetTwo.getLastName()))
                .andExpect(jsonPath("data.[0].vetDTO.specialty").value(vetOne.getSpecialty()))
                .andExpect(jsonPath("data.[1].vetDTO.specialty").value(vetTwo.getSpecialty()))

                .andExpect(jsonPath("data.[0].services[0].name").value(serviceAtClinicOne.getName()))
                .andExpect(jsonPath("data.[1].services[0].name").value(serviceAtClinicThree.getName()))
                .andExpect(jsonPath("data.[0].services[0].description").value(serviceAtClinicOne.getDescription()))
                .andExpect(jsonPath("data.[1].services[0].description").value(serviceAtClinicThree.getDescription()))
                .andExpect(jsonPath("data.[0].services[0].price").value(serviceAtClinicOne.getPrice()))
                .andExpect(jsonPath("data.[1].services[0].price").value(serviceAtClinicThree.getPrice()))
                .andExpect(jsonPath("data.[0].services[1].name").value(serviceAtClinicTwo.getName()))
                .andExpect(jsonPath("data.[1].services[1].name").value(serviceAtClinicFour.getName()))
                .andExpect(jsonPath("data.[0].services[1].description").value(serviceAtClinicTwo.getDescription()))
                .andExpect(jsonPath("data.[1].services[1].description").value(serviceAtClinicFour.getDescription()))
                .andExpect(jsonPath("data.[0].services[1].price").value(serviceAtClinicTwo.getPrice()))
                .andExpect(jsonPath("data.[1].services[1].price").value(serviceAtClinicFour.getPrice()))

                .andExpect(jsonPath("data.[0].notes").value(appointmentOne.getNotes()))
                .andExpect(jsonPath("data.[1].notes").value(appointmentTwo.getNotes()))

                .andExpect(jsonPath("data.[0].price").value(appointmentOne.getTotalServicesSum()))
                .andExpect(jsonPath("data.[1].price").value(appointmentTwo.getTotalServicesSum()));

        Mockito.verify(appointmentService, times(1)).getAllAppointmentsByVetId(vetIdOne);
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void getAppointmentsById_whenGetClient_thenRespond200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/" + 69))
                .andExpect(status().isOk());
        Mockito.verify(appointmentService, times(0)).getAllAppointmentsByClientId(anyInt());
    }

    @Test
    void getAppointments_whenGetUnauthenticated_thenRespond401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/client"))
                .andExpect(status().isUnauthorized());
        Mockito.verify(appointmentService, times(0)).getAllAppointmentsByClientId(anyInt());
    }

    @Test
    void getAppointmentsById_whenGetUnauthenticated_thenRespond401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/" + 69))
                .andExpect(status().isUnauthorized());
        Mockito.verify(appointmentService, times(0)).getAllAppointmentsByClientId(anyInt());
    }

}
