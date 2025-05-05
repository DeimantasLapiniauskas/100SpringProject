package SpringProject._Spring.dto.order;

import SpringProject._Spring.dto.authentication.client.ClientMapping;
import SpringProject._Spring.dto.orderItem.OrderItemMapper;
import SpringProject._Spring.dto.vetClinic.VetClinicMapper;
import SpringProject._Spring.model.order.Order;
import SpringProject._Spring.model.authentication.Client;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static Order toOrder( Client client, OrderRequestDTO orderRequestDTO) {
        return new Order(client, orderRequestDTO.totalAmount());
    }

    public static OrderResponseDTO toOrderResponseDTO(Order order) {
        return new OrderResponseDTO(
                order.getId(),
                ClientMapping.toClientResponseDTO(order.getClient()),
                VetClinicMapper.toVetClinicResponseDTO(order.getVetClinic()),
                OrderItemMapper.toOrderItemListResponseDTO(order.getOrderItems()),
                order.getCreatedAt(),
                order.getTotalAmount(),
                order.getStatus()
        );
    }

    public static OrderPageResponseDTO toOrderPageResponseDTO(Page<Order> ordersPage, String status) {
        List<OrderResponseDTO> orderListResponseDTO = ordersPage.getContent().stream()
                .map(OrderMapper::toOrderResponseDTO)
                .collect(Collectors.toList());

        return new OrderPageResponseDTO(
                orderListResponseDTO,
                ordersPage.getTotalPages(),
                (int) ordersPage.getTotalElements(),
                ordersPage.getNumber(),
                ordersPage.getSize(),
                status
        );
    }

    public static OrderListResponseDTO toOrderResponseListDTO(List<Order> orders) {
      return new OrderListResponseDTO(orders.stream()
                .map(OrderMapper::toOrderResponseDTO)
                .collect(Collectors.toList()));
    }

    public static OrderStatusResponseDTO toOrderStatusResponseDTO(String status) {
        return new OrderStatusResponseDTO(status);
    }
}
