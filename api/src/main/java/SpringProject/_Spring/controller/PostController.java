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

    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET') or hasAuthority('SCOPE_ROLE_ADMIN')")
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

        String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(originalFilename);
        Path uploadPath = Paths.get("uploads/images");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        String fileUrl = baseUrl + "/api/images/" + fileName;

        return ok(fileUrl, "Image uploaded successfully");
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
                                                                            @RequestParam(required = false) String sort,
                                                                            @RequestParam(required = false) String search) {

        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        if (sort != null && postService.isNotValidSortField(sort)) {
            throw new IllegalArgumentException("Invalid sort field");
        }

        if (search != null) {
            search = search.trim();
            if (search.length() > 50) {
                throw new IllegalArgumentException("Search query is too long");
            }

            if (search.matches("^[%_]+$")) {
                throw new IllegalArgumentException("Search query cannot contain only % or _");
            }
        }

        Page<Post> pagedPosts = postService.findAllPostsPage(page, size, sort, search);
        String message = pagedPosts.isEmpty() ? "Posts list is empty" : null;
        PostPageResponseDTO postResponseDTO = PostMapper.toPostPageResponseDTO(pagedPosts, sort);

        return ok(postResponseDTO, message);
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
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable long postId) throws IOException {

        Optional<Post> postOpt = postService.findPostById(postId);
        if (postOpt.isEmpty()) {
            return notFound("Post does not exist");
        }

        Post post = postOpt.get();
        String imageUrl = post.getImageUrl();
        if (imageUrl != null && !imageUrl.isBlank()) {
            String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            Path path = Paths.get("uploads/images").resolve(filename);
            if (Files.exists(path)) {
                Files.delete(path);
            }
        }

        postService.deletePostById(postId);
        return ok(null, "Post deleted successfully");

    }
}
