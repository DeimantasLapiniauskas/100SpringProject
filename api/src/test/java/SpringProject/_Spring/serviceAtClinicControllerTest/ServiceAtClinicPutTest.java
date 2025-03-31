package SpringProject._Spring.serviceAtClinicControllerTest;

import SpringProject._Spring.controller.ServiceAtClinicController;
import SpringProject._Spring.dto.service.ServiceAtClinicRequestDTO;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ServiceAtClinicService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.math.BigDecimal;
import java.util.Optional;

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

    private final ObjectMapper objectMapper = new ObjectMapper();


    //Happy path tests
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void updateService_whenVetUpdateServiceSuccess_thenReturnServiceAndOk() throws Exception {
        performGoodServiceUpdate();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateService_whenAdminUpdateServiceSuccess_thenReturnServiceAndOk() throws Exception {
        performGoodServiceUpdate();
    }

    private void performGoodServiceUpdate() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(100.00), "https://example.com/new.jpg");
        serviceAtClinic.setId(1);

        ServiceAtClinicRequestDTO serviceAtClinicRequestDTO = new ServiceAtClinicRequestDTO("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(110.00), "https://example.com/new.jpg");


        given(serviceAtClinicService.findServiceAtClinicById(1L)).willReturn(Optional.of(serviceAtClinic));


        //When
        mockMvc.perform(MockMvcRequestBuilders.put("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinicRequestDTO)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.name").value("X-Ray"))
                .andExpect(jsonPath("$.data.description").value("X-ray imaging to diagnose bone fractures and internal health issues."))
                .andExpect(jsonPath("$.data.price").value("110.0"))
                .andExpect(jsonPath("$.data.imageUrl").value("https://example.com/new.jpg"));

        Mockito.verify(serviceAtClinicService, times(1)).findServiceAtClinicById(1);
        Mockito.verify(serviceAtClinicService, times(1)).saveService(Mockito.any());
    }

    //Unhappy path tests
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void updateService_whenVetUpdateServiceNotMatchValidSize_thenReturn400() throws Exception {
        updateServiceFailValidSize();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateService_whenAdminUpdateServiceNotMatchValidSize_thenReturn400() throws Exception {
        updateServiceFailValidSize();
    }

    private void updateServiceFailValidSize() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(100.00), "https://example.com/new.jpg");
        serviceAtClinic.setId(1L);

        ServiceAtClinicRequestDTO serviceAtClinicRequestDTO = new ServiceAtClinicRequestDTO(" ", "", BigDecimal.valueOf(-0.01), "/images/testing.map");

        given(serviceAtClinicService.findServiceAtClinicById(1L)).willReturn(Optional.of(serviceAtClinic));


        //When
        mockMvc.perform(MockMvcRequestBuilders.put("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinicRequestDTO)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.data.name").value("Name must be between 3 and 150 characters long!"))
                .andExpect(jsonPath("$.data.description").value("must not be blank"))
                .andExpect(jsonPath("$.data.price").value("must be greater than or equal to 0"))
                .andExpect(jsonPath("$.data.imageUrl").value("Image URL must end with .jpg, .png, .webp or .gif"));

        Mockito.verify(serviceAtClinicService, times(0)).findServiceAtClinicById(1);
        Mockito.verify(serviceAtClinicService, times(0)).saveService(Mockito.any());
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void updateService_whenVetUpdateServiceNotMatchValidRegex_thenReturn400() throws Exception {
        updateServiceFailValidRegex();
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
    void updateService_whenAdminUpdateServiceNotMatchValidRegex_thenReturn400() throws Exception {
        updateServiceFailValidRegex();
    }

    private void updateServiceFailValidRegex() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(100.00), "https://example.com/new.jpg");
        serviceAtClinic.setId(1L);

        ServiceAtClinicRequestDTO serviceAtClinicRequestDTO = new ServiceAtClinicRequestDTO("$$$$", "", BigDecimal.valueOf(-0.01), "https://example.com/new.map");

        given(serviceAtClinicService.findServiceAtClinicById(1L)).willReturn(Optional.of(serviceAtClinic));


        //When
        mockMvc.perform(MockMvcRequestBuilders.put("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinicRequestDTO)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.data.name").value("Name must contain only letters, spaces, numbers and dashes!"))
                .andExpect(jsonPath("$.data.description").value("must not be blank"))
                .andExpect(jsonPath("$.data.price").value("must be greater than or equal to 0"))
                .andExpect(jsonPath("$.data.imageUrl").value("Image URL must end with .jpg, .png, .webp or .gif"));

        Mockito.verify(serviceAtClinicService, times(0)).findServiceAtClinicById(1);
        Mockito.verify(serviceAtClinicService, times(0)).saveService(Mockito.any());
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void updateService_whenUpdateClient_thenReturn403() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("X-Ray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(100.00), "https://example.com/new.jpg");
        serviceAtClinic.setId(1L);

        ServiceAtClinicRequestDTO serviceAtClinicRequestDTO = new ServiceAtClinicRequestDTO("xdray", "X-ray imaging to diagnose bone fractures and internal health issues.", BigDecimal.valueOf(110.00), "https://example.com/new.jpg");

        given(serviceAtClinicService.findServiceAtClinicById(1L)).willReturn(Optional.of(serviceAtClinic));

        //When
        mockMvc.perform(MockMvcRequestBuilders.put("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinicRequestDTO)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Access Denied"))
                .andExpect(jsonPath("$.data").doesNotExist());

        Mockito.verify(serviceAtClinicService, times(0)).findServiceAtClinicById(1);
        Mockito.verify(serviceAtClinicService, times(0)).saveService(Mockito.any());

    }
}
