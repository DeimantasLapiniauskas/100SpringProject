package SpringProject._Spring.AppointmentControllerTest;

import SpringProject._Spring.controller.AppointmentController;
import SpringProject._Spring.repository.AppointmentRepository;
import SpringProject._Spring.repository.PetRepository;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.AccountService;
import SpringProject._Spring.service.AppointmentService;
import SpringProject._Spring.service.ClientService;
import SpringProject._Spring.service.PetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

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
    private AppointmentRepository appointmentRepository;

    @MockitoBean
    private AccountService accountService;

    private final ObjectMapper objectMapper = new ObjectMapper();

//    @BeforeEach
//    public void init() {
//        objectMapper.registerModule(new JavaTimeModule());
//    }


}
