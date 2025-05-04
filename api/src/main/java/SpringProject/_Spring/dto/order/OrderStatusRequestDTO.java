package SpringProject._Spring.dto.order;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record OrderStatusRequestDTO(@NotNull
                                    @Pattern(regexp = "Pending|Confirmed|Cancelled|Completed", message = "Invalid status")
                                    String status) {
}
