package SpringProject._Spring.postControllerTest;

import SpringProject._Spring.controller.PostController;
import SpringProject._Spring.dto.post.PostMapper;
import SpringProject._Spring.dto.post.PostRequestDTO;
import SpringProject._Spring.model.post.Post;
import SpringProject._Spring.model.post.PostType;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Role;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.PostService;
import SpringProject._Spring.service.authentication.VetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.mock.web.MockMultipartFile;


import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PostController.class)
@Import(SecurityConfig.class)
public class PostPostTest {
    @MockitoBean
    private PostService postService;

    @MockitoBean
    private VetService vetService;

    @Autowired
    private MockMvc mockMvc;

    ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void init() {
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.findAndRegisterModules();
    }

    //Happy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void postPost_whenVetPostPost_thenReturn201() throws Exception {
        //given
        Account account = new Account("vet@gmail.com", "password123", List.of(new Role("Vet", 2)));

        Vet vet = new Vet("Edgaras", "Laptevas", "+841185", "Doctor", "489815", LocalDate.now());
        vet.setAccount(account);

        BDDMockito.given(vetService.findVetByAccountEmail(ArgumentMatchers.anyString()))
                .willReturn(java.util.Optional.of(vet));

        PostRequestDTO postRequestDTO = new PostRequestDTO( "Sample Post", "This is a test post.", PostType.Sale,"https://example.com/image.jpg");

        BDDMockito.given(postService.savePost(ArgumentMatchers.any(Post.class))).willReturn(PostMapper.toPost(postRequestDTO, vet));

        //when
        mockMvc.perform(MockMvcRequestBuilders.post("/api/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(postRequestDTO)))
//                .andDo(MockMvcResultHandlers.print())

                //then
                .andExpect(MockMvcResultMatchers.status().isCreated())

                .andExpect(MockMvcResultMatchers.jsonPath("data.title").value("Sample Post"))
                .andExpect(MockMvcResultMatchers.jsonPath("data.content").value("This is a test post."))
                .andExpect(MockMvcResultMatchers.jsonPath("data.postType").value(PostType.Sale.toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("data.imageUrl").value("https://example.com/image.jpg"))

                .andExpect(MockMvcResultMatchers.jsonPath("$.data.vetResponseDTO.firstName").value(vet.getFirstName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.vetResponseDTO.lastName").value(vet.getLastName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.vetResponseDTO.phoneNumber").value(vet.getPhoneNumber()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.vetResponseDTO.specialty").value(vet.getSpecialty()));



        Mockito.verify(postService, times(1)).savePost(ArgumentMatchers.any(Post.class));
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

        //When
        mockMvc.perform(MockMvcRequestBuilders
                        .multipart("/api/posts/upload")
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(org.hamcrest.Matchers.containsString("test-image.jpg")));
    }


    //Unhappy path
    @Test
    @WithMockUser(authorities = {"SCOPE_ROLE_CLIENT", "SCOPE_ROLE_ADMIN"})
    void postPost_whenUnauthorizedRole_thenRespond403() throws Exception {
        //Given
        PostRequestDTO validPost = new PostRequestDTO("Sample Post", "This is a test post.", PostType.Sale, "https://example.com/image.jpg"
        );

        //When
        mockMvc.perform(post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validPost)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Access Denied"))
                .andExpect(jsonPath("$.data").doesNotExist());

        Mockito.verify(postService, times(0)).savePost(any());
    }

    //Unhappy path
    @Test
    void postPost_whenUnauthenticated_thenRespond401() throws Exception {
        //When
        mockMvc.perform(post("/api/posts"))

                //Then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(postService, times(0)).savePost(any());
    }

    //Unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void postPost_whenInvalidPostRequest_thenReturn400() throws Exception {
        // Given
        PostRequestDTO invalidPost = new PostRequestDTO("    ", "            ", null, "htt?ps:example.com/image.jpg");

        //When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidPost)))
//                .andDo(MockMvcResultHandlers.print())

                // Then
                .andExpect(MockMvcResultMatchers.status().isBadRequest())

                .andExpect(MockMvcResultMatchers.jsonPath("$.data.title").value("Title cannot be empty"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.content").value("Content cannot be empty"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.postType").value("Post type is required"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.imageUrl").value("Image URL must be valid and end with .jpg, .png, .webp or .gif"));

        Mockito.verify(postService, times(0)).savePost(any());
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
                        .multipart("/api/posts/upload")
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
                        .multipart("/api/posts/upload")
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("File too large. Max allowed size is 5MB."));
    }
}

