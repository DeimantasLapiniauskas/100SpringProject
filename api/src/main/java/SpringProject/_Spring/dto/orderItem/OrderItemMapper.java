package SpringProject._Spring.dto.orderItem;

import SpringProject._Spring.dto.order.OrderMapper;
import SpringProject._Spring.dto.product.ProductMapping;
import SpringProject._Spring.model.OrderItem;
import SpringProject._Spring.model.order.Order;
import SpringProject._Spring.model.product.Product;
import java.util.List;

public class OrderItemMapper {

    public static OrderItem toOrderItem(Order order, Product product, OrderItemRequestDTO orderItemRequestDTO) {
        return new OrderItem(order, product, orderItemRequestDTO.quantity(), orderItemRequestDTO.itemPrice());
    }

    public static OrderItemResponseDTO toOrderItemResponseDTO(OrderItem orderItem) {
        return new OrderItemResponseDTO(orderItem.getId(), OrderMapper.toOrderResponseDTO(orderItem.getOrder()),
                ProductMapping.toProductResponseDTO(orderItem.getProduct()),
                orderItem.getQuantity(), orderItem.getItemPrice());
    }


    public static OrderItemListResponseDTO toOrderItemListResponseDTO(List<OrderItem> orderItems) {
        return new OrderItemListResponseDTO(orderItems.stream()
                .map(OrderItemMapper::toOrderItemResponseDTO)
                .toList());
    }
}
