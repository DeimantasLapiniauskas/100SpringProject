package SpringProject._Spring.dto.product;

import SpringProject._Spring.dto.product.category.CategoryDTO;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public record ProductRequestDTO(
        @NotBlank(message = "Name can't be empty!")
        @Pattern(
                regexp = "^[a-zA-Z0-9.,!?@#$%^&*()'\"\\s]+$",
                message = "Name can only contain letters, numbers, punctuation, quotes, and symbols (!@#$%^&*())"
        )
        String name,
        @NotBlank(message = "Description can't be empty!")
        @Pattern(
                regexp = "^[a-zA-Z0-9.,!?@#$%^&*()'\"\\- \n]+$",
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
        int stockQuantity,
        @NotEmpty(message = "Product should have at least 1 category!")
        List<CategoryDTO> categories,
        //@NotBlank(message = "Image URL cannot be empty!")
        String imageUrl) {
}
