package SpringProject._Spring.ServiceAtCliniccontroller;

import SpringProject._Spring.controller.ServiceAtClinicController;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ServiceAtClinicService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ServiceAtClinicController.class)
@Import(SecurityConfig.class)
public class ServiceAtClinicTest {
  @MockitoBean
  private ServiceAtClinicService service;
  @Autowired
  private MockMvc mockMvc;

  @Test
  @WithMockUser
  void saveServiceTest() throws Exception{
    ServiceAtClinic serviceAtClinic = new ServiceAtClinic("some", "good service", new BigDecimal("10.5"));

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
  @WithMockUser
  void saveServiceBadTest() throws Exception{
    ServiceAtClinic serviceAtClinic = new ServiceAtClinic("", "good service", new BigDecimal("10.5"));

    BDDMockito.given(service.saveService(ArgumentMatchers.any(ServiceAtClinic.class))).willReturn(serviceAtClinic);

    ObjectMapper objectMapper = new ObjectMapper();

    mockMvc.perform(MockMvcRequestBuilders.post("/api/services")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(serviceAtClinic)))
            .andExpect(status().isBadRequest());

    Mockito.verify(service, Mockito.times(0)).saveService(ArgumentMatchers.any(ServiceAtClinic.class));
  }

  @Test
  @WithMockUser(roles = {"ADMIN", "VET"})
  void deleteServiceById() throws Exception{

    long id = 1;
    BDDMockito.given(service.existsServiceById(id)).willReturn(true);
    BDDMockito.willDoNothing().given(service).deleteServiceById(id);
    ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));

    response.andExpect(status().isNoContent())
            .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser(roles = {"ADMIN", "VET"})
  void deleteServiceTest_if404() throws Exception{
    long id = 1;
    BDDMockito.given(service.existsServiceById(id)).willReturn(false);
    BDDMockito.willDoNothing().given(service).deleteServiceById(id);
    ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));

    response.andExpect(status().isNotFound())
            .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser(roles = {"USER"})
  void deleteServiceTest_if403() throws Exception{
    long id = 1;
    BDDMockito.given(service.existsServiceById(id)).willReturn(false);
    BDDMockito.willDoNothing().given(service).deleteServiceById(id);
    ResultActions response = mockMvc.perform(delete("/api/services/{id}", id));

    response.andExpect(status().isForbidden())
            .andDo(MockMvcResultHandlers.print());
  }
}


