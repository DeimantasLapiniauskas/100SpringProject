package SpringProject._Spring.dto.product;

import SpringProject._Spring.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public class ProductMapping {

    public static ProductResponseDTO toProductResponseDTO(Product product) {
        return new ProductResponseDTO(product.getName(), product.getDescription(), product.getPrice(), product.getStockQuantity());
    }

    public static Product toProduct(ProductRequestDTO productRequestDTO) {
        return new Product(productRequestDTO.name(), productRequestDTO.description(), productRequestDTO.price(), productRequestDTO.stockQuantity());
    }

    public static ProductPageResponseDTO toProductPageResponseDTO(Page<Product> productsPage) {
        List<ProductResponseDTO> productResponseListDTO = productsPage.getContent()
                .stream()
                .map(ProductMapping::toProductResponseDTO)
                .toList();

        return new ProductPageResponseDTO(
                productResponseListDTO,
                productsPage.getTotalPages(),
                (int) productsPage.getTotalElements(),
                productsPage.getNumber(),
                productsPage.getSize()
        );
    }
}
