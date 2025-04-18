package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.review.ReviewMapper;
import SpringProject._Spring.dto.review.ReviewPageResponseDTO;
import SpringProject._Spring.dto.review.ReviewRequestDTO;
import SpringProject._Spring.dto.review.ReviewResponseDTO;
import SpringProject._Spring.model.Review;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.repository.authentication.ClientRepository;
import SpringProject._Spring.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ReviewController extends  BaseController {

    public final ReviewService reviewService;
    public final ClientRepository clientRepository;

    @Autowired
    public ReviewController(ReviewService reviewService, ClientRepository clientRepository) {
        this.reviewService = reviewService;
        this.clientRepository = clientRepository;
    }

    @PostMapping("/reviews")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<ReviewResponseDTO>> leaveReview(@Valid @RequestBody ReviewRequestDTO reviewRequestDTO, Authentication authentication) {

        Optional<Client> clientOpt = clientRepository.findByAccount_Email(authentication.getName());
    if(clientOpt.isEmpty()) {
    return forbidden("You are not allowed to leave a review");
}

    Review savedReview = reviewService.addReview(ReviewMapper.toReview(reviewRequestDTO, clientOpt.get()));
    ReviewResponseDTO reviewResponseDTO = ReviewMapper.toReviewResponseDTO(savedReview);

    return ok(reviewResponseDTO, "Review submitted");
    }

    @GetMapping("/reviews/pagination")
    public ResponseEntity<ApiResponse<ReviewPageResponseDTO>> getAllReviews (@RequestParam int page,
                                                                             @RequestParam int size,
                                                                             @RequestParam(required = false) Integer sort) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        if (sort != null && reviewService.isNotValidSortField(sort)) {
            throw new IllegalArgumentException("invalid sort field");
        }

        Page<Review> pagedReview = reviewService.findAllReviewsPage(page, size, sort);
        ReviewPageResponseDTO reviewPageResponseDTO = ReviewMapper.toReviewPageResponseDTO(pagedReview);

        return ok(reviewPageResponseDTO, pagedReview.isEmpty() ? "Review list is empty" : null);
    }

    @PutMapping("/reviews/{reviewId}")
    @PreAuthorize("hasAuthority('ROLE_SCOPE_CLIENT')")
    public ResponseEntity<ApiResponse<ReviewResponseDTO>> editReview(@PathVariable long reviewId, @Valid @RequestBody ReviewRequestDTO reviewRequestDTO) {

        Optional<Review> reviewOpt = reviewService.findReviewById(reviewId);
        if (reviewOpt.isEmpty()) {
            return notFound("Review not found");
        }

        Review review = reviewOpt.get();
        Review updatedReview = reviewService.editReview(review, reviewRequestDTO);
        ReviewResponseDTO reviewResponseDTO = ReviewMapper.toReviewResponseDTO(updatedReview);

        return ok(reviewResponseDTO, "Review updated successfully");
    }

    @DeleteMapping("/reviews/{reviewId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<String>> deleteReview(@PathVariable long reviewId) {
        Optional<Review> reviewOpt = reviewService.findReviewById(reviewId);
        if (reviewOpt.isEmpty()) {
            return notFound("Review not found");
        }
        reviewService.deleteReviewById(reviewId);

//        return noContent("Review deleted successfully");
        return noContent();
    }
}
