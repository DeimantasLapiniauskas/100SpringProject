package SpringProject._Spring.dto.orderItem;

import SpringProject._Spring.dto.product.ProductResponseDTO;
import java.math.BigDecimal;

public record OrderItemResponseDTO(long id,
                                   ProductResponseDTO productResponseDTO,
                                   int quantity,
                                   BigDecimal itemPrice) {
}
