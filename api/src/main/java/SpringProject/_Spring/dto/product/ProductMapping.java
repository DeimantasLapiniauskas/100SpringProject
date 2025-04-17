package SpringProject._Spring.dto.product;

import SpringProject._Spring.model.product.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public class ProductMapping {

    public static ProductResponseDTO toProductResponseDTO(Product product) {
        return new ProductResponseDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getStockQuantity());
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

    public static void updateProductFromDTO(Product product, ProductRequestDTO productRequestDTO) {
        product.setName(productRequestDTO.name());
        product.setDescription(productRequestDTO.description());
        product.setPrice(productRequestDTO.price());
        product.setStockQuantity(product.getStockQuantity());
    }
}
