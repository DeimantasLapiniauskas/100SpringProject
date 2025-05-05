package SpringProject._Spring.dto.order;

import SpringProject._Spring.dto.orderItem.OrderItemRequestDTO;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public record OrderRequestDTO(@NotNull(message = "Cart must have value")
                              @Size(message = "You must add at least one item to place an Order")
                              List<OrderItemRequestDTO> orderItemListRequestDTO,

                              @NotNull(message = "Total amount price must be provided")
                              @Positive(message = "Total amount must be positive")
                              BigDecimal totalAmount) {
}
