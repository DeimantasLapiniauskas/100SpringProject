package SpringProject._Spring.dto.post;

import SpringProject._Spring.dto.vet.VetMapping;
import SpringProject._Spring.model.Post;
import SpringProject._Spring.model.Vet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import java.util.List;

public class PostMapper {

    public static Post toPost(PostRequestDTO postRequestDTO, Vet vet) {
        return new Post(postRequestDTO.title(), postRequestDTO.content(), postRequestDTO.postType(), vet, postRequestDTO.imgUrl());
    }

    public static PostResponseDTO toPostResponseDTO(Post post) {
        return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getPostType(), VetMapping.toVetResponseDTO(post.getVet()) ,post.getCreatedAt(), post.getImageUrl());
    }

    public static Page<PostResponseDTO> postListResponsePageDTO(Page<Post> postsPage) {
        List<PostResponseDTO> postResponseListDTO = postsPage.getContent().stream()
                .map(PostMapper::toPostResponseDTO)
                .toList();

        return new PageImpl<>(postResponseListDTO, postsPage.getPageable(), postsPage.getTotalElements());
    }
}
