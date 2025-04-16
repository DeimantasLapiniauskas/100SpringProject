package SpringProject._Spring.dto.cart;


import SpringProject._Spring.model.cart.Cart;


public class CartMapping {
    public static CartResponseDTO toCartResponseDTO(Cart cart) {
        return new CartResponseDTO(cart.getId(), cart.getClientId(), cart.getCartItems(), cart.getCreatedAt());
    }
    
}
