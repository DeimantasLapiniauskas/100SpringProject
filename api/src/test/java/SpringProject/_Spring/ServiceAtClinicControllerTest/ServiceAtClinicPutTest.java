package SpringProject._Spring.ServiceAtClinicControllerTest;

import SpringProject._Spring.controller.ServiceAtClinicController;
import SpringProject._Spring.dto.ServiceAtClinicRequestDTO;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ServiceAtClinicService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.core.AnyOf;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = ServiceAtClinicController.class)
@Import(SecurityConfig.class)
public class ServiceAtClinicPutTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    private ServiceAtClinicService serviceAtClinicService;

    //Happy path test
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void updateService_whenVetUpdateServiceSuccess_thenReturnServiceAndOk() throws Exception {
        performServiceUpdate();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateService_whenAdminUpdateServiceSuccess_thenReturnServiceAndOk() throws Exception {
        performServiceUpdate();
    }

    private void performServiceUpdate() throws Exception {
        //given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(100.00));
        serviceAtClinic.setId(1);

        ServiceAtClinicRequestDTO serviceAtClinicRequestDTO = new ServiceAtClinicRequestDTO("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(110.00));

        ServiceAtClinic serviceAtClinicUpdated = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(110.00));
        serviceAtClinicUpdated.setId(1);

        given(serviceAtClinicService.findServiceAtClinicById(1L)).willReturn(Optional.of(serviceAtClinic));
        given(serviceAtClinicService.updateServiceAtClinic(serviceAtClinicRequestDTO, serviceAtClinic)).willReturn(serviceAtClinicUpdated);

        ObjectMapper objectMapper = new ObjectMapper();

        //when
        mockMvc.perform(MockMvcRequestBuilders.put("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinicRequestDTO)))
        //then
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(1))
                .andExpect(jsonPath("name").value("X-Ray"))
                .andExpect(jsonPath("description").value("X-ray imaging to diagnose bone fractures and internal health issues."))
                .andExpect(jsonPath("price").value("110.0"));

        Mockito.verify(serviceAtClinicService, times(1)).findServiceAtClinicById(1);

        Mockito.verify(serviceAtClinicService, times(1)).updateServiceAtClinic(serviceAtClinicRequestDTO, serviceAtClinic);

        Mockito.verify(serviceAtClinicService, times(1)).saveService(serviceAtClinicUpdated);

    }

    //Unhappy path test
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void updateBook_whenVetUpdateBookNotMatchValidSize_thenReturn400() throws Exception {
        updateServiceFailValidSize();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateBook_whenAdminUpdateBookNotMatchValidSize_thenReturn400() throws Exception {
        updateServiceFailValidSize();
    }

    private void updateServiceFailValidSize() throws Exception {
        //given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(100.00));
        serviceAtClinic.setId(1L);

        ServiceAtClinicRequestDTO serviceAtClinicRequestDTO = new ServiceAtClinicRequestDTO(" ", "", BigDecimal.valueOf(-0.01));

        given(serviceAtClinicService.findServiceAtClinicById(1L)).willReturn(Optional.of(serviceAtClinic));

        ObjectMapper objectMapper = new ObjectMapper();

        //when
        mockMvc.perform(MockMvcRequestBuilders.put("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinicRequestDTO)))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("name").value("Name must be between 3 and 150 characters long!"))
                .andExpect(jsonPath("description").value("must not be blank"))
                .andExpect(jsonPath("price").value("must be greater than or equal to 0"));


        Mockito.verify(serviceAtClinicService, times(0)).findServiceAtClinicById(1);

        Mockito.verify(serviceAtClinicService, times(0)).updateServiceAtClinic(serviceAtClinicRequestDTO, serviceAtClinic);

        Mockito.verify(serviceAtClinicService, times(0)).saveService(serviceAtClinic);

    }

    //Unhappy path test
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void updateBook_whenVetUpdateBookNotMatchValidRegex_thenReturn400() throws Exception {
        updateServiceFailValidRegex();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateBook_whenAdminUpdateBookNotMatchValidRegex_thenReturn400() throws Exception {
        updateServiceFailValidRegex();
    }

      private void  updateServiceFailValidRegex() throws Exception {
          //given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(100.00));
        serviceAtClinic.setId(1L);

        ServiceAtClinicRequestDTO serviceAtClinicRequestDTO = new ServiceAtClinicRequestDTO("$$$$", "", BigDecimal.valueOf(-0.01));

        given(serviceAtClinicService.findServiceAtClinicById(1L)).willReturn(Optional.of(serviceAtClinic));

        ObjectMapper objectMapper = new ObjectMapper();

        //when
        mockMvc.perform(MockMvcRequestBuilders.put("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinicRequestDTO)))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("name").value("Name must contain only letters, spaces, numbers and dashes!"))
                .andExpect(jsonPath("description").value("must not be blank"))
                .andExpect(jsonPath("price").value("must be greater than or equal to 0"));


        Mockito.verify(serviceAtClinicService, times(0)).findServiceAtClinicById(1);

        Mockito.verify(serviceAtClinicService, times(0)).updateServiceAtClinic(serviceAtClinicRequestDTO, serviceAtClinic);

        Mockito.verify(serviceAtClinicService, times(0)).saveService(serviceAtClinic);

    }
}
