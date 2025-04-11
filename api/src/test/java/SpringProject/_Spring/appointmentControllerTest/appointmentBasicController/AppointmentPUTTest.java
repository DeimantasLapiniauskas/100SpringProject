package SpringProject._Spring.appointmentControllerTest.appointmentBasicController;

import SpringProject._Spring.controller.appointmentController.AppointmentBasicController;
import SpringProject._Spring.dto.appointment.AppointmentRescheduleDTO;
import SpringProject._Spring.model.ServiceAtClinic;
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
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AppointmentBasicController.class)
@Import(SecurityConfig.class)
public class AppointmentPUTTest {

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

    @MockitoBean
    private ClientService clientService;

    private final ObjectMapper objectMapper = new ObjectMapper();
    long appointmentId;

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new Jdk8Module());
        objectMapper.registerModule(new JavaTimeModule());
        appointmentId = 1;
    }
    
    @Test
    void cancelAppointment_whenValidCancelClient_thenRespond200() throws Exception {

        Appointment appointment = new Appointment(1, 2, List.of(), LocalDateTime.now(), "notes", Timestamp.valueOf(LocalDateTime.now()));
        appointment.setId(appointmentId);

        Account account = new Account("Email@email.email", "password", List.of(new Role("ROLE_CLIENT")));
        account.setId(69L);
        Pet pet = new Pet(account.getId(), "petname","petspecies","petbreed", LocalDate.now(), Gender.Male);
        pet.setId(appointment.getPetId());

        UserDetails principal = User.withUsername("CLIENT")
                .password(account.getPassword())
                .roles("CLIENT")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_CLIENT"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                account.getPassword(), principal.getAuthorities()));
        System.out.println(securityContext);
        SecurityContextHolder.setContext(securityContext);

        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(true);
        when(appointmentService.getAppointmentById(appointmentId))
                .thenReturn(Optional.of(appointment));
        when(vetService.findVetByAccountEmail(account.getEmail()))
                .thenReturn(Optional.empty());
        when(clientService.findClientIdByEmail(account.getEmail()))
                .thenReturn(account.getId());
        when(petService.findById(appointment.getPetId()))
                .thenReturn(Optional.of(pet));


        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/cancel/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("data").value("Appointment cancelled successfully!"));

        Mockito.verify(appointmentService, Mockito.times(1)).saveAppointment(ArgumentMatchers.any());

    }

    @Test
    void cancelAppointment_whenValidCancelVet_thenRespond200() throws Exception {

        Appointment appointment = new Appointment(1, 2, List.of(), LocalDateTime.now(), "notes", Timestamp.valueOf(LocalDateTime.now()));

        Account account = new Account("Email@email.email", "password", List.of(new Role("ROLE_CLIENT")));
        account.setId(69L);

        UserDetails principal = User.withUsername("CLIENT")
                .password(account.getPassword())
                .roles("CLIENT")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_CLIENT"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                account.getPassword(), principal.getAuthorities()));
        System.out.println(securityContext);
        SecurityContextHolder.setContext(securityContext);

        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(true);

        when(appointmentService.getAppointmentById(appointmentId))
                .thenReturn(Optional.of(appointment));

        Vet vet = new Vet("vetName", "vetLName", "666-666-666", "vetSpecialty", "vetLicenseNumber", LocalDate.now());
        vet.setAccount(account);
        vet.setId(appointment.getVetId());

        when(vetService.findVetByAccountEmail(account.getEmail()))
                .thenReturn(Optional.of(vet));


        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(null);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/cancel/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("data").value("Appointment cancelled successfully!"));

        Mockito.verify(appointmentService, Mockito.times(1)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void cancelAppointment_whenCancelAdmin_thenRespond403() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/cancel/" + 5)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("message").value("Access Denied"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    void cancelAppointment_whenCancelUnauthenticated_thenRespond403() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/cancel/" + 5)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    void rescheduleAppointment_whenRescheduleClient_thenRespond200() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.of(2222, 11, 11, 11, 11));

        Appointment appointment = new Appointment(
                5,
                6,
                List.of(new ServiceAtClinic(
                                "serviceName", "serviceDescription", BigDecimal.valueOf(10.1)
                        )
                ),
                LocalDateTime.of(2222,10,11,11,11),
                "appointmentNotes",
                Timestamp.valueOf(LocalDateTime.now())
        );
        appointment.setId(appointmentId);

        Account account = new Account("Email@email.email", "password", List.of(new Role("ROLE_CLIENT")));
        account.setId(69L);

        UserDetails principal = User.withUsername("CLIENT")
                .password(account.getPassword())
                .roles("CLIENT")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_CLIENT"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                account.getPassword(), principal.getAuthorities()));
        System.out.println(securityContext);
        SecurityContextHolder.setContext(securityContext);

        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(true);
        when(accountService.findByEmail(account.getEmail()))
                .thenReturn(Optional.of(account));
        when(appointmentService.getAppointmentById(appointmentId))
                .thenReturn(Optional.of(appointment));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("data").value("Appointment updated its date successfully! Now please wait for confirmation."));

        Mockito.verify(appointmentService, Mockito.times(1)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    void rescheduleAppointment_whenRescheduleVet_thenRespond200() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.of(2222, 11, 11, 11, 11));

        Appointment appointment = new Appointment(
                5,
                6,
                List.of(new ServiceAtClinic(
                                "serviceName", "serviceDescription", BigDecimal.valueOf(10.1)
                        )
                ),
                LocalDateTime.of(2222,10,11,11,11),
                "appointmentNotes",
                Timestamp.valueOf(LocalDateTime.now())
        );
        appointment.setId(appointmentId);

        Account account = new Account("Email@email.email", "password", List.of(new Role("ROLE_VET")));
        account.setId(69L);

        UserDetails principal = User.withUsername("VET")
                .password(account.getPassword())
                .roles("VET")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_VET"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                account.getPassword(), principal.getAuthorities()));
        System.out.println(securityContext);
        SecurityContextHolder.setContext(securityContext);

        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(true);
        when(accountService.findByEmail(account.getEmail()))
                .thenReturn(Optional.of(account));
        when(appointmentService.getAppointmentById(appointmentId))
                .thenReturn(Optional.of(appointment));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("data").value("Appointment updated its date successfully! Now please wait for confirmation."));

        Mockito.verify(appointmentService, Mockito.times(1)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void rescheduleAppointment_whenInvalidDateClient_thenRespond400() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.of(2002, 11, 11, 11, 11));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("data.newDate").value("Your rescheduled date has to be in the future!"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void rescheduleAppointment_whenInvalidDateVet_thenRespond400() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.of(2002, 11, 11, 11, 11));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("data.newDate").value("Your rescheduled date has to be in the future!"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void RescheduleAppointment_whenRescheduleAdmin_thenRespond403() throws Exception {
        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.of(2222, 11, 11, 11, 11));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("message").value("Access Denied"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    void RescheduleAppointment_whenRescheduleUnauthenticated_thenRespond401() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.now());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void RescheduleAppointment_whenAppointmentNotFoundVet_thenRespond404() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.of(2222, 11, 11, 11, 11, 11));

        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Appointment not found!"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void RescheduleAppointment_whenAppointmentNotFoundClient_thenRespond404() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.of(2222, 11, 11, 11, 11, 11));

        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Appointment not found!"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }
}
