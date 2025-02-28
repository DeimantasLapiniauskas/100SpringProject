package SpringProject._Spring.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ServisDTO(
        @NotNull
        long id,
        @Size(min = 1, max = 150, message = "minimal is 1, maximal is 150")
        String name,

        String description,

        BigDecimal price) {
}
