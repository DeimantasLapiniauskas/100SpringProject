package SpringProject._Spring.PostControllerTest;

import SpringProject._Spring.controller.PostController;
import SpringProject._Spring.dto.post.PostMapper;
import SpringProject._Spring.dto.post.PostRequestDTO;
import SpringProject._Spring.model.*;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.PostService;
import SpringProject._Spring.service.VetService;
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
                .andDo(MockMvcResultHandlers.print())

                //then
                .andExpect(MockMvcResultMatchers.status().isCreated())

                .andExpect(MockMvcResultMatchers.jsonPath("title").value("Sample Post"))
                .andExpect(MockMvcResultMatchers.jsonPath("content").value("This is a test post."))
                .andExpect(MockMvcResultMatchers.jsonPath("postType").value(PostType.Sale.toString()))

                // Change JSON path assertion to match the actual response structure
                .andExpect(MockMvcResultMatchers.jsonPath("$.vetResponseDTO.firstName").value(vet.getFirstName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.vetResponseDTO.lastName").value(vet.getLastName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.vetResponseDTO.phoneNumber").value(vet.getPhoneNumber()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.vetResponseDTO.specialty").value(vet.getSpecialty()));



        Mockito.verify(postService, times(1)).savePost(ArgumentMatchers.any(Post.class));
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
                //Then
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(postService, times(0)).savePost(any());
    }

    //Unhappy path
    @Test
    void postPost_whenUnauthenticated_thenRespond401() throws Exception {
        //when
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
        PostRequestDTO invalidPost = new PostRequestDTO("", "", null, "htt?ps:example.com/image.jpg");

        //When
        mockMvc.perform(MockMvcRequestBuilders.post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidPost)))
                .andDo(MockMvcResultHandlers.print()) // Debugging output

                // Then
                .andExpect(MockMvcResultMatchers.status().isBadRequest())

                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Title cannot be empty"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").value("Content cannot be empty"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.postType").value("Post type is required"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.imgUrl").value("Invalid URL format"));

        Mockito.verify(postService, times(0)).savePost(any());
    }

}

