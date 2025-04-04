package SpringProject._Spring.dto.product;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ProductRequestDTO(@NotBlank(message = "Name can't be empty!")
                                @Pattern(
                                        regexp = "^[a-zA-Z0-9.,!?@#$%^&*()'\"]+$",
                                        message = "Name can only contain letters, numbers, punctuation, quotes, and symbols (!@#$%^&*())"
                                )
                                String name,
                                @NotBlank(message = "Description can't be empty!")
                                @Pattern(
                                        regexp = "^[a-zA-Z0-9.,!?@#$%^&*()'\"]+$",
                                        message = "Description can only contain letters, numbers, punctuation, quotes, and symbols (!@#$%^&*())"
                                )
                                String description,
                                @NotNull(message = "Price can't be null!")
                                @DecimalMin(
                                        value = "0.00",
                                        message = "Price must be zero or positive!"
                                )
                                @Digits(
                                        integer = 10,
                                        fraction = 2,
                                        message = "Price must have up to 10 integer digits and 2 fractional digits!"
                                )
                                BigDecimal price,
                                @Min(
                                        value = 0,
                                        message = "Stock quantity must be zero or greater!"
                                )
                                int stockQuantity) {
}
