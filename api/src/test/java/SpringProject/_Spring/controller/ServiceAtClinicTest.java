package SpringProject._Spring.controller;

import SpringProject._Spring.service.ServiceAtClinicService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
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
  @WithMockUser
  void deleteServiceTest_if204() throws Exception{
    long id = 6;

    given(service.existsServisById(id)).willReturn(true);
    ObjectMapper objectMapper = new ObjectMapper();


    mockMvc.perform(MockMvcRequestBuilders.delete("/services/" + id))
            .andExpect(status().isNoContent())
            .andExpect(jsonPath("$").doesNotExist());

    Mockito.verify(service, times(1)).deleteServisById(id);
  }
  @Test
    @WithMockUser
  void deleteServiceTest_if404() throws Exception{
    long id = 6;

    given(service.existsServisById(id)).willReturn(false);
    ObjectMapper objectMapper = new ObjectMapper();


    mockMvc.perform(MockMvcRequestBuilders.delete("/services/" + id))
            .andExpect(status().isNotFound());

    Mockito.verify(service, times(1)).deleteServisById(id);
  }




}