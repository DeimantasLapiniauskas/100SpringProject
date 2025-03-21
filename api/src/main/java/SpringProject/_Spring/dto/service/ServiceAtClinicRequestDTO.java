package SpringProject._Spring.dto.service;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ServiceAtClinicRequestDTO(
        //@NotBlank is not needed when we've got a minimum size already.
        @Size(min = 3, max = 150, message = "Name must be between 3 and 150 characters long!")
        @Pattern(regexp = "^[A-Za-z0-9\\s-]+$", message = "Name must contain only letters, spaces, numbers and dashes!")
        String name,

        @NotBlank
        @NotNull
        @Size(max = 255, message = "Description too long! Please limit it to a max of 255 characters!")
        @Pattern(regexp = "^[A-Za-z0-9\\s-]+$", message = "Description must contain only letters, spaces, numbers and dashes!")
        String description,

        @NotNull
        @Min(0)
        BigDecimal price
) {
}
