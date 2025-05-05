package SpringProject._Spring.dto.order;

import SpringProject._Spring.dto.authentication.client.ClientResponseDTO;
import SpringProject._Spring.dto.orderItem.OrderItemResponseDTO;
import SpringProject._Spring.dto.vetClinic.VetClinicResponseDTO;
import SpringProject._Spring.model.order.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponseDTO(long id,
                               ClientResponseDTO clientResponseDTO,
                               VetClinicResponseDTO vetClinicResponseDTO,
                               List<OrderItemResponseDTO> orderItemsListResponseDTO,
                               LocalDateTime orderDate,
                               BigDecimal totalAmount,
                               OrderStatus orderStatus) {
}
