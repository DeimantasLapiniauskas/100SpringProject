package SpringProject._Spring.dto.product;

import java.math.BigDecimal;

public record ProductResponseDTO(long id,
                                 String name,
                                 String description,
                                 BigDecimal price,
                                 int stockQuantity,
                                 String imageUrl) {
}
