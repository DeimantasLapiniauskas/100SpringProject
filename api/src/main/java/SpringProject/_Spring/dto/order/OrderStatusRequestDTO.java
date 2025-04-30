package SpringProject._Spring.dto.order;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record OrderStatusRequestDTO(@NotNull
                                    @Pattern(regexp = "PENDING|CONFIRMED|APPROVED|SHIPPED", message = "Invalid status")
                                    String status) {
}
