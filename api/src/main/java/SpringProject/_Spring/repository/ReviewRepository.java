package SpringProject._Spring.repository;

import SpringProject._Spring.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
