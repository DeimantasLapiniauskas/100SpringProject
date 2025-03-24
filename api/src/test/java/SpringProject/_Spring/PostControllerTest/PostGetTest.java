package SpringProject._Spring.PostControllerTest;

import SpringProject._Spring.controller.PostController;
import SpringProject._Spring.model.*;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.PostService;
import SpringProject._Spring.service.VetService;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PostController.class)
@Import(SecurityConfig.class)
public class PostGetTest {
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
    @WithMockUser
    void getPost_whenAnyUserGetPost_thenReturnAnd200() throws Exception {
        //Given
        long postId = 1L;
        Vet vet = new Vet("Edgaras", "Laptevas", "+841185", "Doctor", "489815", LocalDate.now());
        vet.setAccount(new Account("vet@gmail.com", "password123", List.of(new Role("ROLE_VET", 2))));

        Post mockPost = new Post(
                "Sample Post",
                "This is a test post.",
                PostType.Sale,
                vet,
                "https://example.com/image.jpg"
        );
        mockPost.setId(postId);

        BDDMockito.given(postService.findPostById(postId)).willReturn(Optional.of(mockPost));

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/posts/{postId}", postId)
                        .contentType(MediaType.APPLICATION_JSON))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isOk())

                .andExpect(jsonPath("$.data.title").value("Sample Post"))
                .andExpect(jsonPath("$.data.content").value("This is a test post."))
                .andExpect(jsonPath("$.data.postType").value(PostType.Sale.toString()))
                .andExpect(jsonPath("$.data.imageUrl").value("https://example.com/image.jpg"))

                .andExpect(jsonPath("$.data.vetResponseDTO.firstName").value(vet.getFirstName()))
                .andExpect(jsonPath("$.data.vetResponseDTO.lastName").value(vet.getLastName()))
                .andExpect(jsonPath("$.data.vetResponseDTO.phoneNumber").value(vet.getPhoneNumber()))
                .andExpect(jsonPath("$.data.vetResponseDTO.specialty").value(vet.getSpecialty()));


        Mockito.verify(postService, times(1)).findPostById(postId);
    }

    //Happy path
    @Test
    @WithMockUser
    void getAllPostsPage_whenValidPageRequest_thenReturn200() throws Exception {
        // Given
        Vet vet = new Vet("Edgaras", "Laptevas", "+841185", "Doctor", "489815", LocalDate.now());
        Account account = new Account("vet@gmail.com", "password123", List.of(new Role("Vet", 2)));
        vet.setAccount(account);

        Post post1 = new Post("Title 1", "Content 1", PostType.Sale, vet, "https://image1.jpg");
        Post post2 = new Post("Title 2", "Content 2", PostType.Blog, vet, "https://image2.jpg");

        List<Post> posts = List.of(post1, post2);
        Page<Post> pagedPosts = new PageImpl<>(posts);

        BDDMockito.given(postService.findAllPostsPage(0, 2, null)).willReturn(pagedPosts);

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/posts/pagination")
                        .param("page", "0")
                        .param("size", "2"))
                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))

                .andExpect(jsonPath("$.data.content[0].title").value("Title 1"))
                .andExpect(jsonPath("$.data.content[1].title").value("Title 2"))
                .andExpect(jsonPath("$.data.totalElements").value(2));

        Mockito.verify(postService, times(1)).findAllPostsPage(0, 2, null);
    }

    //Unhappy Path
    @Test
    @WithMockUser
    void getAllPostsPage_whenEmptyPostsList_thenReturnEmptyMessage() throws Exception {
        //Given
        Page<Post> emptyPage = Page.empty();

        BDDMockito.given(postService.findAllPostsPage(0, 10, null)).willReturn(emptyPage);

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/posts/pagination")
                        .param("page", "0")
                        .param("size", "10"))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Posts list is empty"));

        Mockito.verify(postService, times(1)).findAllPostsPage(0, 10, null);
    }

    //unhappy path
    @Test
    @WithMockUser
    void getAllPostsPage_whenNegativePageOrZeroSize_thenReturn400() throws Exception {
        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/posts/pagination")
                        .param("page", "-1")
                        .param("size", "12"))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest());

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/posts/pagination")
                        .param("page", "0")
                        .param("size", "0"))
                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest());

        Mockito.verify(postService, times(0)).findAllPostsPage(anyInt(), anyInt(), any());
    }

    //Unhappy path
    @Test
    @WithMockUser
    void getAllPostsPage_whenInvalidSortField_thenReturn400() throws Exception {
        //Given
        BDDMockito.given(postService.isNotValidSortField("invalidField")).willReturn(true);

        //When
        mockMvc.perform(MockMvcRequestBuilders.get("/api/posts/pagination")
                        .param("page", "0")
                        .param("size", "5")
                        .param("sort", "invalidField"))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest());

        Mockito.verify(postService, times(0)).findAllPostsPage(anyInt(), anyInt(), anyString());
    }

}
