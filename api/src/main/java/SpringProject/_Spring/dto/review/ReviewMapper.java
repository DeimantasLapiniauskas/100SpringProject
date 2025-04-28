package SpringProject._Spring.dto.review;
import SpringProject._Spring.dto.authentication.client.ClientMapping;
import SpringProject._Spring.dto.vetClinic.VetClinicMapper;
import SpringProject._Spring.model.Review;
import SpringProject._Spring.model.authentication.Client;
import org.springframework.data.domain.Page;
import java.util.List;

public class ReviewMapper {

    public static Review toReview(ReviewRequestDTO reviewRequestDTO, Client client) {
        return new Review(client, reviewRequestDTO.rating(), reviewRequestDTO.comment());
    }

    public static ReviewResponseDTO toReviewResponseDTO(Review review) {
        return new ReviewResponseDTO(review.getId(), ClientMapping.toClientResponseDTO(review.getClient()),
                VetClinicMapper.toVetClinicResponseDTO(review.getVetClinic()), review.getRating(), review.getComment(), review.getCreatedAt());
    }

    public static ReviewPageResponseDTO toReviewPageResponseDTO(Page<Review> reviewsPage) {
List<ReviewResponseDTO> reviewResponseListDTO = reviewsPage.getContent().stream()
        .map(ReviewMapper::toReviewResponseDTO).toList();

return new ReviewPageResponseDTO(
       reviewResponseListDTO,
        reviewsPage.getTotalPages(),
        (int)reviewsPage.getTotalElements(),
        reviewsPage.getNumber(),
        reviewsPage.getSize());
    }

    public static ReviewResponseListDTO toReviewResponseListDTO(List<Review> reviews) {
        return new ReviewResponseListDTO(reviews.stream()
                .map(ReviewMapper::toReviewResponseDTO)
                .toList());
    }
}


