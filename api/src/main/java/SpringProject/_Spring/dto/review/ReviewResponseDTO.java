package SpringProject._Spring.dto.review;

import SpringProject._Spring.model.VetClinic;
import SpringProject._Spring.model.authentication.Client;

import java.time.LocalDateTime;

public record ReviewResponseDTO(long id,
                                Client client,
                                VetClinic vetClinic,
                                int rating,
                                String comment,
                                LocalDateTime createdAt) {
}
