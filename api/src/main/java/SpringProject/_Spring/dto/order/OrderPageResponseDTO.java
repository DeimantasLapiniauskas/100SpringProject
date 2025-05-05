package SpringProject._Spring.dto.order;

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
