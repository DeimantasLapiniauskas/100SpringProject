package SpringProject._Spring.dto.product;

import SpringProject._Spring.dto.product.category.CategoryDTO;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponseDTO(long id,
                                 String name,
                                 String description,
                                 BigDecimal price,
                                 int stockQuantity,
                                 List<CategoryDTO> categories,
                                 String imageUrl) {
}
