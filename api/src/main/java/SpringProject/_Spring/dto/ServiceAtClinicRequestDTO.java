package SpringProject._Spring.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.NotFound;

import java.math.BigDecimal;

public record ServiceAtClinicRequestDTO(
        @NotBlank
        @Size(min = 3, max = 150)
        String name,
        @NotBlank
        @NotNull
        String description,
        @NotNull
        @Min(1)
        BigDecimal price
) {
}
