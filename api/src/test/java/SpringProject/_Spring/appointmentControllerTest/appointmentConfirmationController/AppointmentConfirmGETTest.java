package SpringProject._Spring.appointmentControllerTest.appointmentConfirmationController;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.appointmentController.AppointmentConfirmationController;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.appointment.Status;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Role;
import SpringProject._Spring.model.pet.Gender;
import SpringProject._Spring.model.pet.Pet;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AppointmentService;
import SpringProject._Spring.service.PetService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AppointmentConfirmationController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
public class AppointmentConfirmGETTest {

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

    private final long petOneId = 1463;
    private final long petTwoId = 345247;
    private final long ownerId = 734;
    private final long vetOneId = 2;
    private final long vetTwoId = 8;

    private final ServiceAtClinic serviceOne = new ServiceAtClinic("ServiceOne", "ServiceOneDesctiption", BigDecimal.valueOf(10.1), "https://example.com/new.jpg");
    private final ServiceAtClinic serviceTwo = new ServiceAtClinic("ServiceTwo", "ServiceTwoDescription", BigDecimal.valueOf(20.2), "https://example.com/new.jpg");
    private final Pet petOne = new Pet(ownerId, "petOneName", "petOneSpecies", "petOneBreed", LocalDate.now(), Gender.Female);
    private final Pet petTwo = new Pet(ownerId, "petTwoName", "petTwoSpecies", "petTwoBreed", LocalDate.now(), Gender.Male);
    private final Appointment appointmentOne = new Appointment(petOneId, vetOneId, List.of(serviceOne, serviceTwo), LocalDateTime.of(2222, 11, 11, 11, 11), "Appointment #1 notes", Timestamp.valueOf(LocalDateTime.now()));
    private final Appointment appointmentTwo = new Appointment(petTwoId, vetTwoId, List.of(serviceOne, serviceTwo), LocalDateTime.of(2222, 12, 12, 12, 12), "Appointment #2 notes", Timestamp.valueOf(LocalDateTime.now()));

    @BeforeEach
    public void init() {
        long appointmentOneId = 3457;
        long appointmentTwoId = 2457;
        long serviceOneId = 12;
        long serviceTwoId = 61;
        petOne.setId(petOneId);
        petOne.setOwnerId(ownerId);
        petTwo.setId(petTwoId);
        petTwo.setOwnerId(ownerId);
        appointmentOne.setId(appointmentOneId);
        appointmentTwo.setId(appointmentTwoId);
        appointmentTwo.setStatus(Status.ScheduledUnconfirmedByClient);
        serviceOne.setId(serviceOneId);
        serviceTwo.setId(serviceTwoId);
    }

    @Test
    @WithMockUser
    void getUnconfirmedAppointments_whenGetClient_thenRespond200() throws Exception {

        Account account = new Account("email","password",List.of(new Role("ROLE_CLIENT")));
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

        when(appointmentService.getAllUnconfirmedByClientAppointmentsByEmail(account.getEmail()))
                .thenReturn(List.of(appointmentTwo));
 // todo: Confirmation controller appointment service gets mad, but actually reaches first line. Find out what's wrong and fix it.
        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/client/confirm")
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("").value(""));
    }
}
