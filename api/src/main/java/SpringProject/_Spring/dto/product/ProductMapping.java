package SpringProject._Spring.dto.product;

import SpringProject._Spring.model.Product;

public class ProductMapping {

    public static ProductResponseDTO toProductResponseDTO(Product product) {
        return new ProductResponseDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getStockQuantity());
    }
}
