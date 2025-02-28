package SpringProject._Spring.controller;

import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.service.ServiceAtClinicService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = ServiceAtClinicController.class)
//@Import(SecurityConfig.class)
public class ServiceAtClinicTest {
    @MockitoBean
    private ServiceAtClinicService service;
    @Autowired
    private MockMvc mockMvc;

    @Test
    //@WithMockUser(authorities = "")
    void saveServiceTest() throws Exception{
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic(1,"some", "good service", new BigDecimal("10.5"));

        BDDMockito.given(service.saveService(ArgumentMatchers.any(ServiceAtClinic.class))).willReturn(serviceAtClinic);

        ObjectMapper objectMapper = new ObjectMapper();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/services")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(serviceAtClinic)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").exists())
                .andExpect(jsonPath("name").value("some"));

        Mockito.verify(service, Mockito.times(1)).saveService(ArgumentMatchers.any(ServiceAtClinic.class));
    }

    @Test
    //@WithMockUser(authorities = "")
    void saveServiceBadTest() throws Exception{
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic(1,"", "good service", new BigDecimal("10.5"));

        BDDMockito.given(service.saveService(ArgumentMatchers.any(ServiceAtClinic.class))).willReturn(serviceAtClinic);

        ObjectMapper objectMapper = new ObjectMapper();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinic)))
                .andExpect(status().isBadRequest());

        Mockito.verify(service, Mockito.times(0)).saveService(ArgumentMatchers.any(ServiceAtClinic.class));
    }


}
