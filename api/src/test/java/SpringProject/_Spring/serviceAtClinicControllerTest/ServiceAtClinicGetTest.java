package SpringProject._Spring.serviceAtClinicControllerTest;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.ServiceAtClinicController;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ServiceAtClinicService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ServiceAtClinicController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
public class ServiceAtClinicGetTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    private ServiceAtClinicService serviceAtClinicService;

    ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.findAndRegisterModules();
    }

    //Happy path test
    @Test
    void getService_whenAnyUserGetService_thenReturnServiceAnd200() throws Exception {
        //given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("Blood Test", "Laboratory blood tests to assess your pet's internal health.", BigDecimal.valueOf(60.00), "https://example.com/new.jpg");
        serviceAtClinic.setId(1);

        BDDMockito.given(serviceAtClinicService.findServiceAtClinicById(1)).willReturn(Optional.of(serviceAtClinic));

        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services/1")
                        .contentType(MediaType.APPLICATION_JSON))

                //then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value("1"))
                .andExpect(jsonPath("$.data.name").value("Blood Test"))
                .andExpect(jsonPath("$.data.description").value("Laboratory blood tests to assess your pet's internal health."))
                .andExpect(jsonPath("$.data.price").value("60.0"))
                .andExpect(jsonPath("$.data.imageUrl").value("https://example.com/new.jpg"));

        Mockito.verify(serviceAtClinicService, times(1)).findServiceAtClinicById(1);
    }

    //Happy path
    @Test
    void getAllServicesPage_whenValidPageRequest_thenReturn200() throws Exception {
        //Given
        ServiceAtClinic s1 = new ServiceAtClinic("Consultation", "Vet consultation.", BigDecimal.valueOf(30.00), "https://example.com/new.jpg");
        s1.setId(1);

        ServiceAtClinic s2 = new ServiceAtClinic("Vaccination", "Pet vaccination.", BigDecimal.valueOf(45.00), "https://example.com/new.jpg");
        s2.setId(2);

        List<ServiceAtClinic> services = List.of(s1, s2);
        Page<ServiceAtClinic> pagedServices = new PageImpl<>(services);

        BDDMockito.given(serviceAtClinicService.findAllServiceAtClinicPages(0, 2, null, null)).willReturn(pagedServices);

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services/pagination")
                        .param("page", "0")
                        .param("size", "2"))

                //Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content[0].name").value("Consultation"))
                .andExpect(jsonPath("$.data.content[1].name").value("Vaccination"))
                .andExpect(jsonPath("$.data.totalElements").value(2));

        Mockito.verify(serviceAtClinicService, times(1)).findAllServiceAtClinicPages(0, 2, null, null);
    }

    //Unhappy path
    @Test
    void getAllServicesPage_whenEmptyList_thenReturnEmptyMessage() throws Exception {
        //Given
        Page<ServiceAtClinic> emptyPage = Page.empty();

        BDDMockito.given(serviceAtClinicService.findAllServiceAtClinicPages(0, 10, null, null)).willReturn(emptyPage);

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services/pagination")
                        .param("page", "0")
                        .param("size", "10"))

                //Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Service list is empty"));

        Mockito.verify(serviceAtClinicService, times(1)).findAllServiceAtClinicPages(0, 10, null, null);
    }

    //Unhappy path
    @Test
    void getAllServicesPage_whenInvalidParams_thenReturn400() throws Exception {
        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services/pagination")
                        .param("page", "-1")
                        .param("size", "10"))

                //Then
                .andExpect(status().isBadRequest());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/services/pagination")
                        .param("page", "0")
                        .param("size", "0"))

                //Then
                .andExpect(status().isBadRequest());

        Mockito.verify(serviceAtClinicService, times(0)).findAllServiceAtClinicPages(anyInt(), anyInt(), any(), any());
    }

    //Unhappy path
    @Test
    void getAllServicesPage_whenInvalidSort_thenReturn400() throws Exception {
        //Given
        BDDMockito.given(serviceAtClinicService.isNotValidSortField("invalidSort")).willReturn(true);

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services/pagination")
                        .param("page", "0")
                        .param("size", "5")
                        .param("sort", "invalidSort"))

                //Then
                .andExpect(status().isBadRequest());

        Mockito.verify(serviceAtClinicService, times(0)).findAllServiceAtClinicPages(anyInt(), anyInt(), any(), any());
    }

    //Unhappy path
    @Test
    void getService_whenServiceDoesNotExist_thenReturn404() throws Exception {
        //Given
        BDDMockito.given(serviceAtClinicService.findServiceAtClinicById(anyInt())).willReturn(Optional.empty());

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/services/999")
                        .contentType(MediaType.APPLICATION_JSON))

                //Then
                .andExpect(status().isNotFound());

        Mockito.verify(serviceAtClinicService, times(1)).findServiceAtClinicById(999);
    }

}
