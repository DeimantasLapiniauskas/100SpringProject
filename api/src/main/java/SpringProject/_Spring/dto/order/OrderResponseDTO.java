package SpringProject._Spring.dto.order;

import SpringProject._Spring.dto.authentication.client.ClientResponseDTO;
import SpringProject._Spring.dto.vetClinic.VetClinicResponseDTO;
import SpringProject._Spring.model.order.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderResponseDTO(long id,
                               ClientResponseDTO clientResponseDTO,
                               VetClinicResponseDTO vetClinicResponseDTO,
                               LocalDateTime orderDate,
                               BigDecimal totalAmount,
                               OrderStatus orderStatus) {
}
