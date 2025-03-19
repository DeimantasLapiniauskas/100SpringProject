package SpringProject._Spring.controller;

import SpringProject._Spring.dto.post.PostMapper;
import SpringProject._Spring.dto.post.PostRequestDTO;
import SpringProject._Spring.model.Post;
import SpringProject._Spring.model.PostType;
import SpringProject._Spring.model.Vet;
import SpringProject._Spring.service.PostService;
import SpringProject._Spring.service.VetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PostController {

    public final VetService vetService;
    public final PostService postService;

    @Autowired
    public PostController(VetService vetService, PostService postService) {
        this.vetService = vetService;
        this.postService = postService;
    }

    @PostMapping("/posts")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<?> postPost(@Valid @RequestBody PostRequestDTO postRequestDTO, Authentication authentication) {

        Optional<Vet> vet = vetService.findVetByAccountEmail(authentication.getName());

        if (vet.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to post here");
        }

        Vet foundVet = vet.get();

        Post post = PostMapper.toPost(postRequestDTO, foundVet);
        Post savedPost = postService.savePost(post);

        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedPost.getId())
                .toUri())
                .body(PostMapper.toPostResponseDTO(savedPost));
    }

    @GetMapping("/posts/pagination")
    public ResponseEntity<?> getAllPostsPage(@RequestParam int page,
                                                 @RequestParam int size,
                                                 @RequestParam(required = false) String sort) {

        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        if (sort != null && postService.isNotValidSortField(sort)) {
            throw new IllegalArgumentException("Invalid sort field");
        }

        Page<Post> pagedPosts = postService.findAllPostsPage(page, size, sort);

        if (pagedPosts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body("Posts list is empty");
        }

        return ResponseEntity.ok(PostMapper.postListResponsePageDTO(pagedPosts));
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<?> getPost(@PathVariable long postId) {

        Optional<Post> post = postService.findPostById(postId);

        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post does not exist");
        }

        Post foundPost = post.get();

        return ResponseEntity.ok(PostMapper.toPostResponseDTO(foundPost));
    }

    @PutMapping("posts/{postId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updatePost(@Valid @RequestBody PostRequestDTO postRequestDTO,
                                           @PathVariable long postId, Authentication authentication) {

        Optional<Post> post = postService.findPostById(postId);

        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post does not exist");
        }

        Post foundPost = post.get();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch((auth) -> auth.getAuthority().equals("SCOPE_ROLE_ADMIN"));

        Optional<Vet> vet = vetService.findVetByAccountEmail(authentication.getName());

        if (vet.isEmpty() && !isAdmin) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You are not authenticated");
        }

        if (foundPost.getPostType().equals(PostType.Blog)) {
            if (!isAdmin) { // Normal vet restrictions
                Vet currentVet = vet.get();
                if (foundPost.getVet().getId() != currentVet.getId()) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You cannot edit someone else's Blog");
                }
            } else { // Admin restriction
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Admins cannot edit Blogs");
            }
        }

        Post updatedPost = postService.updatePost(foundPost, postRequestDTO);

        return ResponseEntity.ok(PostMapper.toPostResponseDTO(updatedPost));
    }

    @DeleteMapping("posts/{postId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> deletePost(@PathVariable long postId) {

        Optional<Post> post = postService.findPostById(postId);

        if (post.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post does not exist");
        }

        postService.deletePostById(postId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Post deleted successfully");
    }
}
