package SpringProject._Spring.dto.orderItem;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record OrderItemRequestDTO(
                                  @Positive(message = "Product ID must be positive")
                                  long productId,

                                  @Positive(message = "Quantity must be positive")
                                  int quantity,

                                  @NotNull(message = "Item price must be provided")
                                  @Positive(message = "Item price must be positive")
                                  BigDecimal itemPrice) {
}
