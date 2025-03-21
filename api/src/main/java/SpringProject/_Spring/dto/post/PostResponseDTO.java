package SpringProject._Spring.dto.post;

import SpringProject._Spring.model.post.PostType;
import SpringProject._Spring.model.authentication.Vet;

import java.time.LocalDateTime;

public record PostResponseDTO(long id,
                              String title,
                              String content,
                              PostType postType,
                              Vet vet,
                              LocalDateTime createdAt,
                              String imageUrl) {
}
