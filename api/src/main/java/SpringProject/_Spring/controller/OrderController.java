package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.order.*;
import SpringProject._Spring.dto.order.OrderMapper;
import SpringProject._Spring.model.OrderItem;
import SpringProject._Spring.model.order.Order;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.order.OrderStatus;
import SpringProject._Spring.repository.authentication.ClientRepository;
import SpringProject._Spring.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class OrderController extends BaseController {

    private final OrderService orderService;
    private final ClientRepository clientRepository;

    @Autowired
    public OrderController(OrderService orderService, ClientRepository clientRepository) {
        this.orderService = orderService;
        this.clientRepository = clientRepository;
    }

    @PostMapping("/orders")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<OrderResponseDTO>> createOrder(@Valid @RequestBody OrderRequestDTO orderRequestDTO, Authentication authentication) {
        Optional<Client> clientOpt = clientRepository.findByAccount_Email(authentication.getName());
        if (clientOpt.isEmpty()) {
            return forbidden("You are not allowed to create an order");
        }

        Order order = OrderMapper.toOrder(clientOpt.get(), orderRequestDTO);
        List<OrderItem> orderItems = orderService.getOrderItems(order, orderRequestDTO.orderItemListRequestDTO());
        order.setOrderItems(orderItems);

        Order savedOrder = orderService.createOrder(order);
        OrderResponseDTO orderResponseDTO = OrderMapper.toOrderResponseDTO(savedOrder);

        return ok(orderResponseDTO, "Order created successfully");
    }

    @GetMapping("/orders/pagination")
    public ResponseEntity<ApiResponse<OrderPageResponseDTO>> getAllOrdersPage(@RequestParam int page,
                                                                              @RequestParam int size,
                                                                              @RequestParam(required = false) String sort) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        if (sort != null && orderService.isNotValidSortField(sort)) {
            throw new IllegalArgumentException("invalid sort field");
        }

        Page<Order> pagedOrders = orderService.findAllOrdersPage(page, size, sort);
        OrderPageResponseDTO orderPageResponseDTO = OrderMapper.toOrderPageResponseDTO(pagedOrders, sort);

        return ok(orderPageResponseDTO, pagedOrders.isEmpty() ? "Order list is empty" : null);
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<OrderListResponseDTO>> getAllOrders() {
        List<Order> orders = orderService.findAllOrders();
        OrderListResponseDTO orderListResponseDTO = OrderMapper.toOrderResponseListDTO(orders);

        return ok(orderListResponseDTO, orders.isEmpty() ? "Order list is empty" : null);
    }

    @GetMapping("/orders/{orderId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<OrderResponseDTO>> getOrder(@PathVariable long orderId) {
        Optional<Order> orderOpt = orderService.findOrderById(orderId);
        if (orderOpt.isEmpty()) {
            return notFound("Order not found");
        }
        return ok(OrderMapper.toOrderResponseDTO(orderOpt.get()));
    }

    @PutMapping("/orders/{orderId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<OrderResponseDTO>> modifyOrder(@PathVariable long orderId, @Valid @RequestBody OrderRequestDTO orderRequestDTO) {
        Optional<Order> orderOpt = orderService.findOrderById(orderId);
        if (orderOpt.isEmpty()) {
            return notFound("Order not found");
        }

        Order order = orderOpt.get();
        List<OrderItem> orderItems = orderService.getOrderItems( order, orderRequestDTO.orderItemListRequestDTO());
        Order updatedOrder = orderService.modifyOrder(order, orderItems, orderRequestDTO);
        OrderResponseDTO orderResponseDTO = OrderMapper.toOrderResponseDTO(updatedOrder);

        return ok(orderResponseDTO, "Order updated successfully");
    }

    @PatchMapping("/orders/{orderId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<OrderStatusResponseDTO>> changeOrderStatus(@Valid @RequestBody OrderStatusRequestDTO orderStatusRequestDTO) {
        OrderStatus orderStatus = OrderStatus.valueOf(orderStatusRequestDTO.status());
        OrderStatusResponseDTO orderStatusResponseDTO = OrderMapper.toOrderStatusResponseDTO(orderStatus.toString());

        return ok(orderStatusResponseDTO, "Status changed successfully");
    }

    @DeleteMapping("/orders/{orderId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<String>> deleteOrder(@PathVariable long orderId) {
        Optional<Order> orderOpt = orderService.findOrderById(orderId);
        if (orderOpt.isEmpty()) {
            return notFound("Order not found");
        }
        orderService.deleteOrderById(orderId);

        return ok(null, "Order deleted successfully");
    }
}
