package SpringProject._Spring.dto.cart;

import SpringProject._Spring.model.cart.CartItem;

import java.util.List;
import java.sql.Timestamp;

public record CartResponseDTO(
        long id,
        long clientId,
        List<CartItem> cartItems,
        Timestamp createdAt
) { }
