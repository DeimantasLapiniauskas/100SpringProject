package SpringProject._Spring.service;

import SpringProject._Spring.dto.order.OrderMapper;
import SpringProject._Spring.dto.order.OrderRequestDTO;
import SpringProject._Spring.dto.orderItem.OrderItemMapper;
import SpringProject._Spring.dto.orderItem.OrderItemRequestDTO;
import SpringProject._Spring.model.OrderItem;
import SpringProject._Spring.model.Review;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.order.Order;
import SpringProject._Spring.model.order.OrderStatus;
import SpringProject._Spring.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductService productService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Optional<Order> findOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public Order modifyOrder(Order order, List<OrderItem> orderItems, OrderRequestDTO orderRequestDTO) {
        order.setTotalAmount(orderRequestDTO.totalAmount());
        order.setOrderItems(orderItems);

        return orderRepository.save(order);
    }

    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    public boolean isNotValidSortField(String sort) {
        List<String> sortFields = List.of("All products", "Pending", "Confirmed", "Completed", "Cancelled");

        return !sortFields.contains(sort);
    }

    public Page<Order> findAllOrdersPage(int page, int size, String filter) {
        String defaultSort = "createdAt";
        if ( filter == null || filter.equalsIgnoreCase("All products")) {
            Pageable pageable = PageRequest.of(page, size, Sort.by(defaultSort).descending());

            return orderRepository.findAll(pageable);
        }

        OrderStatus orderStatus = OrderStatus.valueOf(filter);
        Pageable pageable = PageRequest.of(page, size, Sort.by(defaultSort).descending());

        return orderRepository.findByStatus(orderStatus, pageable);
    }

    public List<OrderItem> getOrderItems(Order order, List<OrderItemRequestDTO> orderItemListRequestDTO){
        return orderItemListRequestDTO.stream().map((orderItemRequestDTO) ->
                OrderItemMapper.toOrderItem(order, productService.findProductById(orderItemRequestDTO.productId()), orderItemRequestDTO))
                .toList();
    }
}
