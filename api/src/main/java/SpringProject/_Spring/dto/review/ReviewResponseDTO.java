package SpringProject._Spring.dto.review;

import SpringProject._Spring.dto.authentication.client.ClientResponseDTO;
import SpringProject._Spring.dto.vetClinic.VetClinicResponseDTO;
import SpringProject._Spring.model.VetClinic;
import SpringProject._Spring.model.authentication.Client;

import java.time.LocalDateTime;

public record ReviewResponseDTO(long id,
                                ClientResponseDTO clientResponseDTO,
                                VetClinicResponseDTO vetClinicResponseDTO,
                                int rating,
                                String comment,
                                LocalDateTime createdAt) {
}
