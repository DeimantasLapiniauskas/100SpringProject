package SpringProject._Spring.dto.post;

import SpringProject._Spring.dto.authentication.vet.VetMapping;
import SpringProject._Spring.model.post.Post;
import SpringProject._Spring.model.authentication.Vet;
import org.springframework.data.domain.Page;

import java.util.List;

public class PostMapper {

    public static Post toPost(PostRequestDTO postRequestDTO, Vet vet) {
        return new Post(postRequestDTO.title(), postRequestDTO.content(), postRequestDTO.postType(), vet, postRequestDTO.imageUrl());
    }

    public static PostResponseDTO toPostResponseDTO(Post post) {
        return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getPostType(), VetMapping.toVetResponseDTO(post.getVet()), post.getCreatedAt(), post.getImageUrl());
    }

    public static PostPageResponseDTO toPostPageResponseDTO(Page<Post> postsPage, String sortBy) {
        List<PostResponseDTO> postResponseListDTO = postsPage.getContent()
                .stream()
                .map(PostMapper::toPostResponseDTO)
                .toList();

        return new PostPageResponseDTO(
                postResponseListDTO,
                postsPage.getTotalPages(),
                (int) postsPage.getTotalElements(),
                postsPage.getNumber(),
                postsPage.getSize(),
                sortBy
        );
    }

    public static PostListResponseDTO toPostListResponseDTO(List<Post> posts) {
        return new PostListResponseDTO(posts.stream()
                .map(PostMapper::toPostResponseDTO).toList());

    }
}