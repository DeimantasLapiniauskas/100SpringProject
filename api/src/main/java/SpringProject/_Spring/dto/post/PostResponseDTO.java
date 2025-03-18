package SpringProject._Spring.dto.post;

import SpringProject._Spring.model.PostType;
import SpringProject._Spring.model.Vet;

import java.security.Timestamp;
import java.time.LocalDateTime;

public record PostResponseDTO(long id,
                              String title,
                              String text,
                              PostType postType,
                              Vet vet,
                              LocalDateTime createdAt,
                              String imageUrl) {
}
