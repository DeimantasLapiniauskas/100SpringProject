package SpringProject._Spring.dto.order;

import SpringProject._Spring.model.order.OrderStatus;

import java.util.List;

public record OrderPageResponseDTO(
        List<OrderResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize,
       String orderStatus
) {
}
