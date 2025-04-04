package SpringProject._Spring.appointmentControllerTest;

import SpringProject._Spring.controller.appointmentController.AppointmentBasicController;
import SpringProject._Spring.dto.appointment.AppointmentUpdateDTO;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.appointment.Status;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Timestamp;
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
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void putAppointment_whenValidPutClient_thenRespond200() throws Exception {


        Optional<Status> status = Optional.of(Status.Cancelled);
        Optional<LocalDateTime> newDate = Optional.of(LocalDateTime.now());

        Appointment appointment = new Appointment(1,2,List.of(),LocalDateTime.now(),"notes", Timestamp.valueOf(LocalDateTime.now()));


        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(true);

        when(appointmentService.getAppointmentById(appointmentId))
                .thenReturn(Optional.of(appointment));


        AppointmentUpdateDTO appointmentUpdateDTO = new AppointmentUpdateDTO(status,null);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                )
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Appointment updated its status successfully!"));

        Mockito.verify(appointmentService,Mockito.times(1)).saveAppointment(ArgumentMatchers.any());

        appointmentUpdateDTO = new AppointmentUpdateDTO(null,newDate);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Appointment updated its date successfully!"));

        Mockito.verify(appointmentService,Mockito.times(2)).saveAppointment(ArgumentMatchers.any());

        appointmentUpdateDTO = new AppointmentUpdateDTO(status,newDate);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Appointment updated its status and date successfully!"));

        Mockito.verify(appointmentService,Mockito.times(3)).saveAppointment(ArgumentMatchers.any());
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void putAppointment_whenInvalidPutClient_thenRespond400and404() throws Exception {

        AppointmentUpdateDTO appointmentUpdateDTO = new AppointmentUpdateDTO(null,null);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("You can't call this endpoint and then not give a date OR status!"));

        Mockito.verify(appointmentService,Mockito.times(0)).saveAppointment(ArgumentMatchers.any());


        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(false);

        appointmentUpdateDTO = new AppointmentUpdateDTO(null,Optional.of(LocalDateTime.now()));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$").value("Appointment not found!"));

        Mockito.verify(appointmentService,Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    void putAppointment_whenPutUnauthenticated_thenRespond401() throws Exception {

        AppointmentUpdateDTO appointmentUpdateDTO = new AppointmentUpdateDTO(null,Optional.of(LocalDateTime.now()));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(appointmentService,Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void putAppointment_whenValidPutVet_thenRespond200() throws Exception {


        Optional<Status> status = Optional.of(Status.Cancelled);
        Optional<LocalDateTime> newDate = Optional.of(LocalDateTime.now());

        Appointment appointment = new Appointment(1,2,List.of(),LocalDateTime.now(),"notes", Timestamp.valueOf(LocalDateTime.now()));


        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(true);

        when(appointmentService.getAppointmentById(appointmentId))
                .thenReturn(Optional.of(appointment));


        AppointmentUpdateDTO appointmentUpdateDTO = new AppointmentUpdateDTO(status,null);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Appointment updated its status successfully!"));

        Mockito.verify(appointmentService,Mockito.times(1)).saveAppointment(ArgumentMatchers.any());

        appointmentUpdateDTO = new AppointmentUpdateDTO(null,newDate);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Appointment updated its date successfully!"));

        Mockito.verify(appointmentService,Mockito.times(2)).saveAppointment(ArgumentMatchers.any());

        appointmentUpdateDTO = new AppointmentUpdateDTO(status,newDate);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Appointment updated its status and date successfully!"));

        Mockito.verify(appointmentService,Mockito.times(3)).saveAppointment(ArgumentMatchers.any());
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void putAppointment_whenInvalidPutVet_thenRespond400and404() throws Exception {

        AppointmentUpdateDTO appointmentUpdateDTO = new AppointmentUpdateDTO(null,null);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("You can't call this endpoint and then not give a date OR status!"));

        Mockito.verify(appointmentService,Mockito.times(0)).saveAppointment(ArgumentMatchers.any());


        when(appointmentService.existsAppointmentById(appointmentId))
                .thenReturn(false);

        appointmentUpdateDTO = new AppointmentUpdateDTO(null,Optional.of(LocalDateTime.now()));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$").value("Appointment not found!"));

        Mockito.verify(appointmentService,Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void putAppointment_whenPutAdmin_thenRespond403() throws Exception {

        AppointmentUpdateDTO appointmentUpdateDTO = new AppointmentUpdateDTO(null,Optional.of(LocalDateTime.now()));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/appointments/" + appointmentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(appointmentUpdateDTO)
                        )
                )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("message").value("Access Denied"));

        Mockito.verify(appointmentService,Mockito.times(0)).saveAppointment(ArgumentMatchers.any());
    }

}
