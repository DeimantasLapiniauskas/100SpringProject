package SpringProject._Spring.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ServiceAtClinicRequestDTO(
        @NotBlank
        @Size(min = 3, max = 150)
        String name,
        @NotBlank
        String description,
        @Min(0)
        BigDecimal price
) {
}
