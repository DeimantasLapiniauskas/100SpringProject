package SpringProject._Spring.dto.post;

import SpringProject._Spring.model.Post;
import SpringProject._Spring.model.Vet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDateTime;
import java.util.List;

public class PostMapper {

    public static Post toPost(PostRequestDTO postRequestDTO, Vet vet) {
        return new Post(postRequestDTO.title(), postRequestDTO.text(), postRequestDTO.postType(), vet, LocalDateTime.now(), postRequestDTO.imgUrl());
    }

    public static PostResponseDTO toPostResponseDTO(Post post) {
        return new PostResponseDTO(post.getId(), post.getTitle(), post.getText(), post.getPostType(), post.getVet(),post.getCreatedAt(), post.getImageUrl());
    }

    public static Page<PostResponseDTO> postListResponsePageDTO(Page<Post> postsPage) {
        List<PostResponseDTO> postResponseListDTO = postsPage.getContent().stream()
                .map((post) -> PostMapper.toPostResponseDTO(post))
                .toList();

        return new PageImpl<>(postResponseListDTO, postsPage.getPageable(), postsPage.getTotalElements());
    }
}
