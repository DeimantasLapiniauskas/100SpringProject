package SpringProject._Spring.postControllerTest;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.PostController;
import SpringProject._Spring.model.post.Post;
import SpringProject._Spring.model.post.PostType;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.PostService;
import SpringProject._Spring.service.authentication.VetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PostController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
public class PostDeleteTest {
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
    @ParameterizedTest
    @ValueSource(strings = {"SCOPE_ROLE_VET", "SCOPE_ROLE_ADMIN"})
    @WithMockUser
    void deletePost_whenAuthorizedUserDeletesPost_thenReturn204(String role) throws Exception {
        //Given
        long postId = 1L;
        Post post = new Post("Sample Post", "Test content.", PostType.Sale, new Vet(), "https://example.com/image.jpg");
        post.setId(postId);


        BDDMockito.given(postService.findPostById(postId)).willReturn(Optional.of(post));
        Mockito.doNothing().when(postService).deletePostById(postId);

        // Run test with specified role
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("testUser", "password", List.of(new SimpleGrantedAuthority(role)))
        );

        //When
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/posts/{postId}", postId))

                //Then
                .andExpect(status().isNoContent());

        Mockito.verify(postService, times(1)).deletePostById(postId);
    }

    //Unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_VET")
    void deletePost_whenPostDoesNotExist_thenReturn404() throws Exception {
        //Given
        long postId = 999L;

        BDDMockito.given(postService.findPostById(postId)).willReturn(Optional.empty());

        //When
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/posts/{postId}", postId))

                //Then
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Post does not exist"));

        Mockito.verify(postService, times(0)).deletePostById(postId);
    }

    //Unhappy Path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void deletePost_whenUnauthorizedRoleClient_thenReturn403() throws Exception {
        //Given
        long postId = 1L;
        Post post = new Post("Sample Post", "Test content.", PostType.Sale, new Vet(), "https://example.com/image.jpg");
        post.setId(postId);

        BDDMockito.given(postService.findPostById(postId)).willReturn(Optional.of(post));

        //When
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/posts/{postId}", postId))

                //Then
                .andExpect(status().isForbidden());

        Mockito.verify(postService, times(0)).deletePostById(postId);
    }

    //Unhappy Path
    @Test
    void deletePost_whenUnauthenticated_thenReturn401() throws Exception {
        //Given
        long postId = 1L;

        //When
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/posts/{postId}", postId))

                //Then
                .andExpect(status().isUnauthorized());

        Mockito.verify(postService, times(0)).deletePostById(postId);
    }

}
