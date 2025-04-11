package SpringProject._Spring.serviceAtClinicControllerTest;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.ServiceAtClinicController;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.model.post.Post;
import SpringProject._Spring.model.post.PostType;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ServiceAtClinicService;
import org.junit.jupiter.api.Test;

import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.math.BigDecimal;
import java.util.Optional;

import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ServiceAtClinicController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
public class ServiceAtClinicDeleteTest {
    
    @MockitoBean
    private ServiceAtClinicService service;
    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void deleteService_whenDeleteVet_ThenRespond204() throws Exception {
        deleteServiceById();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void deleteService_whenDeleteAdmin_ThenRespond204() throws Exception {
        deleteServiceById();
    }

    private void deleteServiceById() throws Exception {
        //Given
        long id = 1;
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("Sample Post", "Test content.", new BigDecimal("20.00"), "/images/fake-image.jpg");
        serviceAtClinic.setId(id);

        BDDMockito.given(service.existsServiceById(id)).willReturn(true);
        BDDMockito.given(service.findServiceAtClinicById(id)).willReturn(Optional.of(serviceAtClinic));
        BDDMockito.willDoNothing().given(service).deleteServiceById(id);

        //When
        ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));
        response.andExpect(status().isNoContent())
                .andDo(MockMvcResultHandlers.print());

        //Then
        Mockito.verify(service, times(1)).deleteServiceById(id);
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void deleteService_whenDeleteVetNotFound_ThenRespond404() throws Exception {
        performDeleteWhenNotFound();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void deleteService_whenDeleteAdminNotFound_ThenRespond404() throws Exception {
        performDeleteWhenNotFound();
    }

    private void performDeleteWhenNotFound() throws Exception {
        //Given
        long id = 1;

        BDDMockito.given(service.existsServiceById(id)).willReturn(false);
        BDDMockito.willDoNothing().given(service).deleteServiceById(id);

        //When
        ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));

        response.andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void deleteService_whenDeleteClient_ThenRespond403() throws Exception {
        long id = 1;
        BDDMockito.given(service.existsServiceById(id)).willReturn(false);
        BDDMockito.willDoNothing().given(service).deleteServiceById(id);
        ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));

        response.andExpect(status().isForbidden())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void deleteService_whenUnauthenticated_thenRespond401() throws Exception {
        long id = 1;
        mockMvc.perform(delete("/api/services/{id}", id))
                .andExpect(status().isUnauthorized());
    }

}


