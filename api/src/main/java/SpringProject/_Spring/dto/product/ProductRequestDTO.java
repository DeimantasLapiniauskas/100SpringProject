package SpringProject._Spring.dto.product;

import java.math.BigDecimal;

public record ProductRequestDTO(String name,
                                String description,
                                BigDecimal price,
                                int stockQuantity) {
}
