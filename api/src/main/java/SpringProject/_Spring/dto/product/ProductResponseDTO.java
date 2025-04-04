package SpringProject._Spring.dto.product;

import java.math.BigDecimal;

public record ProductResponseDTO(String name,
                                 String description,
                                 BigDecimal price,
                                 int stockQuantity) {
}
