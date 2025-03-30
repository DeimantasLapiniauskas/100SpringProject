package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.post.PostPageResponseDTO;
import SpringProject._Spring.dto.post.PostMapper;
import SpringProject._Spring.dto.post.PostRequestDTO;
import SpringProject._Spring.dto.post.PostResponseDTO;
import SpringProject._Spring.model.post.Post;
import SpringProject._Spring.model.post.PostType;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.service.PostService;
import SpringProject._Spring.service.authentication.VetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
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

    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET')")
    @PostMapping("/posts/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            return badRequest(null, "File must have a valid name");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return badRequest(null, "Only image files are allowed");
        }

        long maxFileSize = 5 * 1024 * 1024;
        if (file.getSize() > maxFileSize) {
            return badRequest(null, "File too large. Max allowed size is 5MB.");
        }

        String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(originalFilename); // Unikalus vardas
        Path uploadPath = Paths.get("uploads/images");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = "/images/" + fileName;

        return ok(fileUrl);
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

        return created(responseDTO, "Post created successfully");
    }

    @GetMapping("/posts/pagination")
    public ResponseEntity<ApiResponse<PostPageResponseDTO>> getAllPostsPage(@RequestParam int page,
                                                                            @RequestParam int size,
                                                                            @RequestParam(required = false) String sort) {

        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        if (sort != null && postService.isNotValidSortField(sort)) {
            throw new IllegalArgumentException("Invalid sort field");
        }

        Page<Post> pagedPosts = postService.findAllPostsPage(page, size, sort);
        String message = pagedPosts.isEmpty() ? "Posts list is empty" : null;
        PostPageResponseDTO responseDTO = PostMapper.toPostPageResponseDTO(pagedPosts, sort);

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
        return noContent("Post deleted successfully");
    }
}
