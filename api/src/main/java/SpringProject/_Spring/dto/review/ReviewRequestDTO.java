package SpringProject._Spring.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ReviewRequestDTO(@Max(5)
                               @Positive(message = "Rating must be positive number")
                               Integer rating,

                               @Size(max = 1000, message = "You can not exceed more than 1000 characters")
                               String comment) {
}
