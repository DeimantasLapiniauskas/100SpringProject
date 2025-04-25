package SpringProject._Spring.service;

import SpringProject._Spring.dto.review.ReviewRequestDTO;
import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.Review;
import SpringProject._Spring.repository.ReviewRepository;
import SpringProject._Spring.repository.VetClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;


    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;

    }

    public Review addReview(Review review) {
       return reviewRepository.save(review);
    }

    public List<Review> findAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findReviewById(long id) {
        return reviewRepository.findById(id);
    }

    public Review editReview(Review review, ReviewRequestDTO reviewRequestDTO) {
        review.setRating(reviewRequestDTO.rating());
        review.setComment(reviewRequestDTO.comment());

        return reviewRepository.save(review);
    }

    public void deleteReviewById(long id) {
        reviewRepository.deleteById(id);
    }

    public boolean isNotValidSortField(Integer sort) {
        List<Integer> sortFields = List.of(1, 2, 3, 4, 5);

        return !sortFields.contains(sort);
    }

    public Page<Review> findAllReviewsPage(int page, int size, Integer filter) {
        String defaultSort = "createdAt";
        if (filter == null) {
            Pageable pageable = PageRequest.of(page, size, Sort.by(defaultSort).descending());

            return reviewRepository.findAll(pageable);
        }

        int sortByRating = filter;
        Pageable pageable = PageRequest.of(page, size, Sort.by(defaultSort).descending());
        return reviewRepository.findAllByRating(sortByRating, pageable);
    }
}
