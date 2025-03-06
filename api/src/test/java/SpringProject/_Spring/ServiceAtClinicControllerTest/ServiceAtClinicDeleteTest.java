package SpringProject._Spring.ServiceAtClinicControllerTest;

import SpringProject._Spring.controller.ServiceAtClinicController;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ServiceAtClinicService;
import org.junit.jupiter.api.Test;

import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ServiceAtClinicController.class)
@Import(SecurityConfig.class)
public class ServiceAtClinicDeleteTest {
    @MockitoBean
    private ServiceAtClinicService service;
    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void deleteServiceWhenVet_204() throws Exception {
        deleteServiceById();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void deleteServiceWhenAdmin_204() throws Exception {
        deleteServiceById();
    }

    private void deleteServiceById() throws Exception {
        long id = 1;
        BDDMockito.given(service.existsServiceById(id)).willReturn(true);
        BDDMockito.willDoNothing().given(service).deleteServiceById(id);
        ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));

        response.andExpect(status().isNoContent())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void deleteServiceTestVet_if404() throws Exception {
        performDeleteWhenNotFound();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void deleteServiceTestAdmin_if404() throws Exception {
        performDeleteWhenNotFound();
    }

    private void performDeleteWhenNotFound() throws Exception{
        long id = 1;
        BDDMockito.given(service.existsServiceById(id)).willReturn(false);
        BDDMockito.willDoNothing().given(service).deleteServiceById(id);
        ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));

        response.andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_USER")
    void deleteServiceTest_if403() throws Exception {
        long id = 1;
        BDDMockito.given(service.existsServiceById(id)).willReturn(false);
        BDDMockito.willDoNothing().given(service).deleteServiceById(id);
        ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));

        response.andExpect(status().isForbidden())
                .andDo(MockMvcResultHandlers.print());
    }
}


