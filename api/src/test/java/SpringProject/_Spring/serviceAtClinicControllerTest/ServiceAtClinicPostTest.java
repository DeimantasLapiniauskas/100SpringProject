package SpringProject._Spring.serviceAtClinicControllerTest;

import SpringProject._Spring.MailSenderTestConfig;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ServiceAtClinicController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
public class ServiceAtClinicPostTest {
    @MockitoBean
    private ServiceAtClinicService service;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void postService_whenPostVet_thenReturn201() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("some", "good service", new BigDecimal("10.5"), "https://example.com/new.jpg");

        BDDMockito.given(service.saveService(ArgumentMatchers.any(ServiceAtClinic.class))).willReturn(serviceAtClinic);

        ObjectMapper objectMapper = new ObjectMapper();

        //When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinic)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.name").value("some"))
                .andExpect(jsonPath("$.data.description").value("good service"))
                .andExpect(jsonPath("$.data.price").value("10.5"))
                .andExpect(jsonPath("$.data.imageUrl").value("https://example.com/new.jpg"));

        Mockito.verify(service, Mockito.times(1)).saveService(ArgumentMatchers.any(ServiceAtClinic.class));
    }

    //Happy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void uploadImage_whenValidImage_thenReturns200AndUrl() throws Exception {
        // Given
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test-image.jpg",
                "image/jpeg",
                "fake image content".getBytes()
        );

        // When
        mockMvc.perform(MockMvcRequestBuilders
                        .multipart("/api/services/upload")
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
//                .andDo(MockMvcResultHandlers.print())

                // Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(org.hamcrest.Matchers.containsString("test-image.jpg")));
    }


    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void postService_whenClient_thenReturn403() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("named service", "good service", new BigDecimal("10.5"), "https://example.com/new.jpg");

        BDDMockito.given(service.saveService(ArgumentMatchers.any(ServiceAtClinic.class))).willReturn(serviceAtClinic);

        ObjectMapper objectMapper = new ObjectMapper();

        //When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinic)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Access Denied"))
                .andExpect(jsonPath("$.data").doesNotExist());


        Mockito.verify(service, Mockito.times(0)).saveService(ArgumentMatchers.any(ServiceAtClinic.class));
    }

    @Test
    @WithMockUser
    void postService_whenPostShortName_thenReturn400() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("a", "good service", new BigDecimal("10.5"), "https://example.com/new.jpg");

        BDDMockito.given(service.saveService(ArgumentMatchers.any(ServiceAtClinic.class))).willReturn(serviceAtClinic);

        ObjectMapper objectMapper = new ObjectMapper();

        //When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinic)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("data.name").value("Name must be between 3 and 150 characters long!"));

        Mockito.verify(service, Mockito.times(0)).saveService(ArgumentMatchers.any(ServiceAtClinic.class));
    }

    @Test
    @WithMockUser
    void postService_whenPostInvalidName_thenReturn400() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("][98432!@#$%^()_\\", "good service", new BigDecimal("10.5"), "https://example.com/new.jpg");

        BDDMockito.given(service.saveService(ArgumentMatchers.any(ServiceAtClinic.class))).willReturn(serviceAtClinic);

        ObjectMapper objectMapper = new ObjectMapper();

        //When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinic)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("data.name").value("Name must contain only letters, spaces, numbers and dashes!"));

        Mockito.verify(service, Mockito.times(0)).saveService(ArgumentMatchers.any(ServiceAtClinic.class));
    }

    @Test
    @WithMockUser
    void postService_whenPostLongDescription_thenReturn400() throws Exception {
        //Given
        ServiceAtClinic serviceAtClinic = new ServiceAtClinic("validName", """
                According to all known laws of aviation, there is no way a bee should be able to fly.
                Its wings are too small to get its fat little body off the ground.
                The bee, of course, flies anyway because bees don't care what humans think is impossible.
                Yellow, black. Yellow, black. Yellow, black. Yellow, black.
                Ooh, black and yellow!
                Let's shake it up a little.
                Barry! Breakfast is ready!
                Coming!
                Hang on a second.
                Hello?
                Barry?
                Adam?
                Can you believe this is happening?
                I can't.
                I'll pick you up.
                Looking sharp.
                Use the stairs, Your father paid good money for those.
                Sorry. I'm excited.
                Here's the graduate.
                We're very proud of you, son.
                A perfect report card, all B's.
                Very proud.
                Ma! I got a thing going here.
                You got lint on your fuzz.
                Ow! That's me!
                Wave to us! We'll be in row 118,000.
                Bye!
                Barry, I told you, stop flying in the house!
                Hey, Adam.
                Hey, Barry.
                Is that fuzz gel?
                A little. Special day, graduation.
                Never thought I'd make it.
                Three days grade school, three days high school.
                Those were awkward.
                Three days college. I'm glad I took a day and hitchhiked around The Hive.
                You did come back different.
                Hi, Barry. Artie, growing a mustache? Looks good.
                Hear about Frankie?""",
                new BigDecimal("10.5"), "https://example.com/new.jpg");

        BDDMockito.given(service.saveService(ArgumentMatchers.any(ServiceAtClinic.class))).willReturn(serviceAtClinic);

        ObjectMapper objectMapper = new ObjectMapper();

        //When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/services")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(serviceAtClinic)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("data.description").value("Description too long! Please limit it to a max of 255 characters!"));

        Mockito.verify(service, Mockito.times(0)).saveService(ArgumentMatchers.any(ServiceAtClinic.class));
    }

    //Unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void uploadImage_whenNotImage_thenReturns400() throws Exception {
        //Given
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "malicious.txt",
                "text/plain",
                "not an image".getBytes()
        );

        //When
        mockMvc.perform(MockMvcRequestBuilders
                        .multipart("/api/services/upload")
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Only image files are allowed"));
    }

    //unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void uploadImage_whenFileTooLarge_thenReturns400() throws Exception {
        //Given
        byte[] largeContent = new byte[6 * 1024 * 1024]; // 6 MB
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "big-image.jpg",
                "image/jpeg",
                largeContent
        );

        //When
        mockMvc.perform(MockMvcRequestBuilders
                        .multipart("/api/services/upload")
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("File too large. Max allowed size is 5MB."));
    }
}
