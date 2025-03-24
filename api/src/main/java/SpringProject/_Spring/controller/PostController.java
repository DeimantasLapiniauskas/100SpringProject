package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.post.PostListPageResponseDTO;
import SpringProject._Spring.dto.post.PostMapper;
import SpringProject._Spring.dto.post.PostRequestDTO;
import SpringProject._Spring.dto.post.PostResponseDTO;
import SpringProject._Spring.model.Post;
import SpringProject._Spring.model.PostType;
import SpringProject._Spring.model.Vet;
import SpringProject._Spring.service.PostService;
import SpringProject._Spring.service.VetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PostController extends BaseController{

    public final VetService vetService;
    public final PostService postService;

    @Autowired
    public PostController(VetService vetService, PostService postService) {
        this.vetService = vetService;
        this.postService = postService;
    }

    @PostMapping("/posts")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<PostResponseDTO>> postPost(@Valid @RequestBody PostRequestDTO postRequestDTO, Authentication authentication) {

        Optional<Vet> vet = vetService.findVetByAccountEmail(authentication.getName());

        if (vet.isEmpty()) {
            return forbidden("You are not allowed to post here");
        }

        Vet foundVet = vet.get();

        Post post = PostMapper.toPost(postRequestDTO, foundVet);
        Post savedPost = postService.savePost(post);

        PostResponseDTO responseDTO = PostMapper.toPostResponseDTO(savedPost);

        return ResponseEntity
                .created(ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(savedPost.getId())
                        .toUri())
                .body(new ApiResponse<>(responseDTO, "Post created successfully", true));
    }

    @GetMapping("/posts/pagination")
    public ResponseEntity<ApiResponse<PostListPageResponseDTO>> getAllPostsPage(@RequestParam int page,
                                                                                @RequestParam int size,
                                                                                @RequestParam(required = false) String sort) {

        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        if (sort != null && postService.isNotValidSortField(sort)) {
            throw new IllegalArgumentException("Invalid sort field");
        }

        Page<Post> pagedPosts = postService.findAllPostsPage(page, size, sort);
        PostListPageResponseDTO responseDTO = PostMapper.postListResponsePageDTO(pagedPosts, sort);

        String message = pagedPosts.isEmpty() ? "Posts list is empty" : null;
        return ok(responseDTO, message);
    }
    @GetMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse<PostResponseDTO>> getPost(@PathVariable long postId) {

        Optional<Post> post = postService.findPostById(postId);

        if (post.isEmpty()) {
            return notFound("Post does not exist");
        }

        return ok(PostMapper.toPostResponseDTO(post.get()), null);
    }


    @PutMapping("/posts/{postId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PostResponseDTO>> updatePost(@Valid @RequestBody PostRequestDTO postRequestDTO,
                                                                   @PathVariable long postId,
                                                                   Authentication authentication) {

        Optional<Post> post = postService.findPostById(postId);
        if (post.isEmpty()) {
            return notFound("Post does not exist");
        }

        Post foundPost = post.get();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("SCOPE_ROLE_ADMIN"));

        Optional<Vet> vet = vetService.findVetByAccountEmail(authentication.getName());

        if (foundPost.getPostType().equals(PostType.Blog)) {
            if (!isAdmin) {
                Vet currentVet = vet.get();
                if (foundPost.getVet().getId() != currentVet.getId()) {
                    return forbidden( "You cannot edit someone else's Blog");
                }
            } else {
                return forbidden("Admins cannot edit Blogs");
            }
        }

        Post updatedPost = postService.updatePost(foundPost, postRequestDTO);
        return ok(PostMapper.toPostResponseDTO(updatedPost), "Post updated successfully");
    }

    @DeleteMapping("/posts/{postId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable long postId) {

        Optional<Post> post = postService.findPostById(postId);
        if (post.isEmpty()) {
            return notFound("Post does not exist");
        }

        postService.deletePostById(postId);
        return noContent(null, "Post deleted successfully");
    }
}
