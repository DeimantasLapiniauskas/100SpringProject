package SpringProject._Spring.appointmentControllerTest;

import SpringProject._Spring.controller.appointmentController.AppointmentBasicController;
import SpringProject._Spring.dto.appointment.AppointmentRescheduleDTO;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.appointment.Status;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Role;
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

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
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
                .password("password")
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
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void putAppointment_whenInvalidPutClient_thenRespond400and404() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(null);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message").value("You can't call this endpoint and then not give a date OR status!"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());


        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(false);

        appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.now());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$").value("Appointment not found!"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    void putAppointment_whenPutUnauthenticated_thenRespond401() throws Exception {

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
    void putAppointment_whenValidPutVet_thenRespond200() throws Exception {


        Optional<Status> status = Optional.of(Status.Cancelled);
        Optional<LocalDateTime> newDate = Optional.of(LocalDateTime.now());

        Appointment appointment = new Appointment(1, 2, List.of(), LocalDateTime.now(), "notes", Timestamp.valueOf(LocalDateTime.now()));


        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(true);

        when(appointmentService.getAppointmentById(appointmentId))
                .thenReturn(Optional.of(appointment));


        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(null);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("message").value("Appointment updated its status successfully!"));

        Mockito.verify(appointmentService, Mockito.times(1)).saveAppointment(ArgumentMatchers.any());

        appointmentUpdateDTO = new AppointmentRescheduleDTO(newDate.get());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Appointment updated its date successfully!"));

        Mockito.verify(appointmentService, Mockito.times(2)).saveAppointment(ArgumentMatchers.any());

        appointmentUpdateDTO = new AppointmentRescheduleDTO(newDate.get());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Appointment updated its status and date successfully!"));

        Mockito.verify(appointmentService, Mockito.times(3)).saveAppointment(ArgumentMatchers.any());
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void putAppointment_whenAppointmentNotFoundVet_thenRespond404() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.now());

//        Account account = new Account("Email@email.email", "password", List.of(new Role("ROLE_VET")));

        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(false);
//        when(accountService.findByEmail(account.getEmail()))
//                .thenReturn(Optional.of(account));
//        when(appointmentService.getAppointmentById(appointmentId))
//                .thenReturn(Optional.empty());
//
//        UserDetails principal = User.withUsername("admin")
//                .password("password")
//                .roles("VET")
//                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_VET"))
//                .build();
//        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
//                "password", principal.getAuthorities()));
//        SecurityContextHolder.setContext(securityContext);

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
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void putAppointment_whenPutAdmin_thenRespond403() throws Exception {

        AppointmentRescheduleDTO appointmentUpdateDTO = new AppointmentRescheduleDTO(LocalDateTime.now());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("message").value("Access Denied"));

        Mockito.verify(appointmentService, Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

}
