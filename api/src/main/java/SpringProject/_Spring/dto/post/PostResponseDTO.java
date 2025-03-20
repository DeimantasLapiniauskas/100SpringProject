package SpringProject._Spring.dto.post;

import SpringProject._Spring.dto.vet.VetResponseDTO;
import SpringProject._Spring.model.PostType;
import java.time.LocalDateTime;

public record PostResponseDTO(long id,
                              String title,
                              String content,
                              PostType postType,
                              VetResponseDTO vetResponseDTO,
                              LocalDateTime createdAt,
                              String imageUrl) {
}
