package SpringProject._Spring.AppointmentControllerTest;

import SpringProject._Spring.controller.AppointmentController;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = AppointmentController.class)
@Import(SecurityConfig.class)
public class AppointmentPUTTest {

    //TODO: THIS!

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

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void putAppointment_whenPutClient_thenRespond200() throws Exception{

    }
}
