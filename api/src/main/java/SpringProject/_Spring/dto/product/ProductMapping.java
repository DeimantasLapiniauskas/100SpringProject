package SpringProject._Spring.dto.product;

import SpringProject._Spring.dto.product.category.CategoryMapper;
import SpringProject._Spring.model.product.Product;
import SpringProject._Spring.repository.product.CategoryRepository;
import org.springframework.data.domain.Page;

import java.util.List;

public class ProductMapping {

    public static ProductResponseDTO toProductResponseDTO(Product product) {
        return new ProductResponseDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getStockQuantity(), product.getImageUrl());
    }

    public static Product toProduct(ProductRequestDTO productRequestDTO, CategoryRepository categoryRepository) {
        return new Product(productRequestDTO.name(), productRequestDTO.description(), productRequestDTO.price(), productRequestDTO.stockQuantity(), CategoryMapper.toCategoryListFromDTO(productRequestDTO.categories(), categoryRepository), productRequestDTO.imageUrl());
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

    public static void updateProductFromDTO(Product product, ProductRequestDTO productRequestDTO, CategoryRepository categoryRepository) {
        product.setName(productRequestDTO.name());
        product.setDescription(productRequestDTO.description());
        product.setPrice(productRequestDTO.price());
        product.setStockQuantity(productRequestDTO.stockQuantity());
        product.setCategories(CategoryMapper.toCategoryListFromDTO(productRequestDTO.categories(), categoryRepository));
        product.setImageUrl(productRequestDTO.imageUrl());
    }


}
