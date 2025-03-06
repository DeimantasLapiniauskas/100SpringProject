package SpringProject._Spring.ServiceAtClinicControllerTest;

import SpringProject._Spring.controller.ServiceAtClinicController;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ServiceAtClinicService;
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
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ServiceAtClinicController.class)
@Import(SecurityConfig.class)
public class ServiceAtClinicGetTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    private ServiceAtClinicService serviceAtClinicService;

    //Happy path test
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void getServices_whenClientGetAllServices_thenReturnAllServicesAnd200() throws Exception {

        //given
        ServiceAtClinic serviceAtClinic1 = new ServiceAtClinic("Blood Test", "Laboratory blood tests to assess your pet's internal health.", BigDecimal.valueOf(60.00));

        ServiceAtClinic serviceAtClinic2 = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(100.00));

        List<ServiceAtClinic> serviceAtClinicList = List.of(serviceAtClinic1, serviceAtClinic2);

        given(serviceAtClinicService.findAllServiceAtClinic()).willReturn(serviceAtClinicList);

        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services"))

                //then
                .andExpect(status().isOk())
                .andExpect(jsonPath("length()").value(2))
                .andExpect(jsonPath("[0].id").exists())
                .andExpect(jsonPath("[0].name").value("Blood Test"))
                .andExpect(jsonPath("[0].description").value("Laboratory blood tests to assess your pet's internal health."))
                .andExpect(jsonPath("[0].price").value("60.0"))

                .andExpect(jsonPath("[1].id").exists())
                .andExpect(jsonPath("[1].name").value("X-Ray"))
                .andExpect(jsonPath("[1].description").value("X-ray imaging to diagnose bone fractures and internal health issues."))
                .andExpect(jsonPath("[1].price").value("100.0"));

        Mockito.verify(serviceAtClinicService, times(1)).findAllServiceAtClinic();

    }

    //Happy path test
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void getService_whenClientGetService_thenReturnServiceAnd200() throws Exception {

        //given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("Blood Test", "Laboratory blood tests to assess your pet's internal health.", BigDecimal.valueOf(60.00));
        serviceAtClinic.setId(1);

        given(serviceAtClinicService.findServiceAtClinicById(1)).willReturn(Optional.of(serviceAtClinic));

        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services/1"))

                //then
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value("1"))
                .andExpect(jsonPath("name").value("Blood Test"))
                .andExpect(jsonPath("description").value("Laboratory blood tests to assess your pet's internal health."))
                .andExpect(jsonPath("price").value("60.0"));

        Mockito.verify(serviceAtClinicService, times(1)).findServiceAtClinicById(1);

    }

    //Unhappy path test
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void getServices_whenClientGetServices_thenReturnEmptyListAnd204() throws Exception {

        //given
        List<ServiceAtClinic> serviceAtClinicList = List.of();

        given(serviceAtClinicService.findAllServiceAtClinic()).willReturn(serviceAtClinicList);

        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services"))
                //then
                .andExpect(status().isNoContent())
                .andExpect(content().string("Service list is empty"));

        Mockito.verify(serviceAtClinicService, times(1)).findAllServiceAtClinic();
    }
}

