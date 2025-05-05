package SpringProject._Spring.appointmentControllerTest.appointmentConfirmationController;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.appointmentController.AppointmentConfirmationController;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.appointment.Status;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Role;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.model.pet.Gender;
import SpringProject._Spring.model.pet.Pet;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AppointmentService;
import SpringProject._Spring.service.PetService;
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
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AppointmentConfirmationController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
public class AppointmentConfirmPUTTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AppointmentService appointmentService;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private VetService vetService;

    @MockitoBean
    private ClientService clientService;

    private final long petId = 1463;
    private final long ownerId = 734;
    private final long vetId = 2;

    private final Client client = new Client("clientName", "clientLastName", "666-666-666", Timestamp.valueOf(LocalDateTime.now()));
    private final Vet vet = new Vet("vetName", "vetLastName", "666-666-666", "specialty", "licenseNumber", LocalDate.now());
    private final Account clientAccount = new Account("Email@email.email", "password123", List.of(new Role("CLIENT", 3)));
    private final Account vetAccount = new Account("Email@email.email", "password123", List.of(new Role("VET", 2)));
    private final ServiceAtClinic serviceOne = new ServiceAtClinic("ServiceOne", "ServiceOneDescription", BigDecimal.valueOf(10.1), "https://example.com/new.jpg");
    private final Pet petOne = new Pet(ownerId, "petOneName", "petOneSpecies", "petOneBreed", LocalDate.now(), Gender.Female);
    private final Appointment appointmentOne = new Appointment(petId, vetId, List.of(serviceOne), LocalDateTime.of(2222, 11, 11, 11, 11), "Appointment #1 notes", Timestamp.valueOf(LocalDateTime.now()));

    @BeforeEach
    public void init() {
        long appointmentOneId = 3457;
        long serviceOneId = 12;
        client.setId(ownerId);
        client.setAccount(clientAccount);
        vet.setId(vetId);
        vet.setAccount(vetAccount);
        petOne.setId(petId);
        appointmentOne.setId(appointmentOneId);
        serviceOne.setId(serviceOneId);
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET", username = "Email@email.email")
    public void ConfirmAppointment_whenConfirmAsVet_thenRespond200() throws Exception {
        appointmentOne.setStatus(Status.ScheduledUnconfirmedByVet);

        when(appointmentService.existsAppointmentById(appointmentOne.getId()))
                .thenReturn(true);
        when(appointmentService.getAppointmentById(appointmentOne.getId()))
                .thenReturn(Optional.of(appointmentOne));
        when(vetService.findVetByAccountEmail(vet.getAccount().getEmail()))
                .thenReturn(Optional.of(vet));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/vet/confirm/" + appointmentOne.getId()))
                .andExpect(status().isOk());

        appointmentOne.setStatus(Status.Scheduled);
        Mockito.verify(appointmentService, Mockito.times(1)).saveAppointment(appointmentOne);
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT", username = "Email@email.email")
    public void ConfirmAppointment_whenConfirmAsClient_thenRespond200() throws Exception {
        appointmentOne.setStatus(Status.ScheduledUnconfirmedByClient);

        when(appointmentService.existsAppointmentById(appointmentOne.getId()))
                .thenReturn(true);
        when(appointmentService.getAppointmentById(appointmentOne.getId()))
                .thenReturn(Optional.of(appointmentOne));
        when(petService.findById(petId))
                .thenReturn(Optional.of(petOne));
        when(petService.existsById(appointmentOne.getPetId()))
                .thenReturn(true);
        when(clientService.findClientIdByEmail(client.getAccount().getEmail()))
                .thenReturn(client.getId());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/client/confirm/" + appointmentOne.getId()))
                .andExpect(status().isOk());

        appointmentOne.setStatus(Status.Scheduled);
        Mockito.verify(appointmentService, Mockito.times(1)).saveAppointment(appointmentOne);
    }

    @Test
    public void ConfirmAppointment_whenConfirmVetAsUnauthenticated_thenRespond401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/vet/confirm/" + appointmentOne.getId()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void ConfirmAppointment_whenConfirmClientAsUnauthenticated_thenRespond401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/client/confirm/" + appointmentOne.getId()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT", username = "Email@email.email")
    public void ConfirmAppointment_whenNonexistentPetAsClient_thenRespond404() throws Exception {
        appointmentOne.setStatus(Status.ScheduledUnconfirmedByClient);

        when(appointmentService.existsAppointmentById(appointmentOne.getId()))
                .thenReturn(true);
        when(appointmentService.getAppointmentById(appointmentOne.getId()))
                .thenReturn(Optional.of(appointmentOne));
        when(petService.findById(petId))
                .thenReturn(Optional.of(petOne));
        when(petService.existsById(appointmentOne.getPetId()))
                .thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/client/confirm/" + appointmentOne.getId()))
                .andExpect(status().isNotFound());

        appointmentOne.setStatus(Status.Scheduled);
        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(appointmentOne);
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT", username = "Email@email.email")
    public void ConfirmAppointment_whenNonexistentAppointmentAsClient_thenRespond404() throws Exception {
        appointmentOne.setStatus(Status.ScheduledUnconfirmedByClient);

        when(appointmentService.existsAppointmentById(appointmentOne.getId()))
                .thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/client/confirm/" + appointmentOne.getId()))
                .andExpect(status().isNotFound());

        appointmentOne.setStatus(Status.Scheduled);
        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(appointmentOne);
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT", username = "Email@email.email")
    public void ConfirmAppointment_whenNotWaitingForApprovalAppointmentAsClient_thenRespond403() throws Exception {

        when(appointmentService.existsAppointmentById(appointmentOne.getId()))
                .thenReturn(true);
        when(appointmentService.getAppointmentById(appointmentOne.getId()))
                .thenReturn(Optional.of(appointmentOne));
        when(petService.findById(petId))
                .thenReturn(Optional.of(petOne));
        when(petService.existsById(appointmentOne.getPetId()))
                .thenReturn(true);
        when(clientService.findClientIdByEmail(client.getAccount().getEmail()))
                .thenReturn(client.getId());

        appointmentOne.setStatus(Status.Scheduled);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/client/confirm/" + appointmentOne.getId()))
                .andExpect(status().isForbidden());

        appointmentOne.setStatus(Status.ScheduledUnconfirmedByVet);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/client/confirm/" + appointmentOne.getId()))
                .andExpect(status().isForbidden());

        appointmentOne.setStatus(Status.Cancelled);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/client/confirm/" + appointmentOne.getId()))
                .andExpect(status().isForbidden());

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET", username = "Email@email.email")
    public void ConfirmAppointment_whenNonexistentAppointmentAsVet_thenRespond404() throws Exception {
        appointmentOne.setStatus(Status.ScheduledUnconfirmedByVet);

        when(appointmentService.existsAppointmentById(appointmentOne.getId()))
                .thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/vet/confirm/" + appointmentOne.getId()))
                .andExpect(status().isNotFound());

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET", username = "Email@email.email")
    public void ConfirmAppointment_whenNotWaitingForApprovalAppointmentAsVet_thenRespond403() throws Exception {

        when(appointmentService.existsAppointmentById(appointmentOne.getId()))
                .thenReturn(true);
        when(appointmentService.getAppointmentById(appointmentOne.getId()))
                .thenReturn(Optional.of(appointmentOne));
        when(vetService.findVetByAccountEmail(vet.getAccount().getEmail()))
                .thenReturn(Optional.of(vet));

        appointmentOne.setStatus(Status.ScheduledUnconfirmedByClient);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/vet/confirm/" + appointmentOne.getId()))
                .andExpect(status().isForbidden());

        appointmentOne.setStatus(Status.Scheduled);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/vet/confirm/" + appointmentOne.getId()))
                .andExpect(status().isForbidden());

        appointmentOne.setStatus(Status.Cancelled);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/vet/confirm/" + appointmentOne.getId()))
                .andExpect(status().isForbidden());

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(any());
    }
}
