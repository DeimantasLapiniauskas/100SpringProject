package SpringProject._Spring.PostControllerTest;

import SpringProject._Spring.controller.PostController;
import SpringProject._Spring.dto.post.PostRequestDTO;
import SpringProject._Spring.model.*;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.PostService;
import SpringProject._Spring.service.VetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PostController.class)
@Import(SecurityConfig.class)
public class PostUpdateTest {
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

    //Happy - Unhappy path
    @ParameterizedTest
    @CsvSource({
            "SCOPE_ROLE_VET, Sale, 200",
            "SCOPE_ROLE_VET, News, 200",
            "SCOPE_ROLE_VET, Blog, 403",
            "SCOPE_ROLE_ADMIN, Sale, 200",
            "SCOPE_ROLE_ADMIN, News, 200",
            "SCOPE_ROLE_ADMIN, Blog, 403"
    })
    void updatePost_whenVetOrAdminUpdatesPost_thenReturn200Or403(String role, String postType, int expectedStatus) throws Exception {
        //Given:
        Account ownerAccount = new Account("owner@example.com", "securePass", List.of(new Role("VET")));
        Account otherVetAccount = new Account("other@example.com", "securePass", List.of(new Role("VET")));
        Account adminAccount = new Account("admin@example.com", "securePass", List.of(new Role("ADMIN")));

        Vet ownerVet = new Vet("OwnerVet", "Doe", "+123456789", "Surgeon", "98765", LocalDate.now());
        ownerVet.setId(100L);
        ownerVet.setAccount(ownerAccount);

        Vet otherVet = new Vet("OtherVet", "Smith", "+987654321", "Dentist", "12345", LocalDate.now());
        otherVet.setId(200L);
        otherVet.setAccount(otherVetAccount);

        long postId = 1L;
        Post post = new Post("Old Title", "Old content.", PostType.valueOf(postType), ownerVet, "https://example.com/old.jpg");
        post.setId(postId);

        PostRequestDTO updateRequest = new PostRequestDTO("New Title", "Updated content.", PostType.valueOf(postType), "https://example.com/new.jpg");

        Account authenticatedAccount;
        Vet authenticatedVet = null;

        if (role.equals("SCOPE_ROLE_ADMIN")) {
            authenticatedAccount = adminAccount;
        } else {
            authenticatedVet = (expectedStatus == 403) ? otherVet : ownerVet;
            authenticatedAccount = authenticatedVet.getAccount();
        }

        BDDMockito.given(vetService.findVetByAccountEmail(authenticatedAccount.getEmail()))
                .willReturn(role.equals("SCOPE_ROLE_ADMIN") ? Optional.of(new Vet("Admin", "User", "", "", "", LocalDate.now())) : Optional.of(authenticatedVet));

        BDDMockito.given(postService.findPostById(postId)).willReturn(Optional.of(post));

        BDDMockito.given(postService.updatePost(any(Post.class), any(PostRequestDTO.class)))
                .willAnswer(invocation -> {
                    Post existingPost = invocation.getArgument(0);
                    PostRequestDTO dto = invocation.getArgument(1);
                    existingPost.setTitle(dto.title());
                    existingPost.setContent(dto.content());
                    existingPost.setPostType(dto.postType());
                    existingPost.setImageUrl(dto.imgUrl());
                    return existingPost;
                });

        // Run test with specified role
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(authenticatedAccount.getEmail(), "password", List.of(new SimpleGrantedAuthority(role)))
        );

        //When
        mockMvc.perform(MockMvcRequestBuilders.put("/api/posts/{postId}", postId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().is(expectedStatus));


        Mockito.verify(postService, times(expectedStatus == 200 ? 1 : 0)).updatePost(any(Post.class), any(PostRequestDTO.class));
    }

    //Unhappy path
    @Test
    void updatePost_whenUnauthenticated_thenReturn401() throws Exception {
        //Given
        long postId = 1L;
        PostRequestDTO updateRequest = new PostRequestDTO("Title", "Content", PostType.Blog, "https://example.com/image.jpg");

        //When
        mockMvc.perform(MockMvcRequestBuilders.put("/api/posts/{postId}", postId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))

                //Then
                .andExpect(status().isUnauthorized());

        Mockito.verify(postService, times(0)).updatePost(any(Post.class), any(PostRequestDTO.class));
    }

    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void updatePost_whenInvalidRequest_thenReturn400() throws Exception {
        //Given
        long postId = 1L;

        PostRequestDTO invalidUpdate = new PostRequestDTO("", "", null, "");

        //When
        mockMvc.perform(MockMvcRequestBuilders.put("/api/posts/{postId}", postId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidUpdate)))
//                .andDo(MockMvcResultHandlers.print())

                //Then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.data.title").value("Title cannot be empty"))
                .andExpect(jsonPath("$.data.content").value("Content cannot be empty"))
                .andExpect(jsonPath("$.data.postType").value("Post type is required"));

        Mockito.verify(postService, times(0)).updatePost(any(Post.class), any(PostRequestDTO.class));
    }

}
