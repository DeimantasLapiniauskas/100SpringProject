package SpringProject._Spring.service;

import SpringProject._Spring.dto.product.ProductMapping;
import SpringProject._Spring.dto.product.ProductPageResult;
import SpringProject._Spring.dto.product.ProductRequestDTO;
import SpringProject._Spring.exceptions.NameAlreadyExistsException;
import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.product.Product;
import SpringProject._Spring.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addNewProduct(ProductRequestDTO productRequestDTO) {
        if (existsProductByName(productRequestDTO.name())) {
            throw new NameAlreadyExistsException("Product", productRequestDTO.name());
        }

        return saveProduct(ProductMapping.toProduct(productRequestDTO));
    }

    public boolean existsProductByName(String name) {
        return productRepository.existsProductByName(name);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public ProductPageResult findAllProductsPage(int page, int size, String sort) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }
        Page<Product> pagedProducts = getProductPages(page, size, sort);

        return new ProductPageResult(ProductMapping.toProductPageResponseDTO(pagedProducts), pagedProducts.isEmpty() ? "Product list is empty" : null);
    }

    public Page<Product> getProductPages(int page, int size, String sort) {
        return sort == null ? productRepository.findAll(PageRequest.of(page, size)) : productRepository.findAll(PageRequest.of(page, size, Sort.by(sort)));
    }

    public Product updateProduct(long id, ProductRequestDTO productRequestDTO) {
        if (!existsProductById(id)) {
            throw new NotFoundException("Product with id '" + id + "' not found");
        }

        Product product = findProductById(id);

        ProductMapping.updateProductFromDTO(product, productRequestDTO);

        return saveProduct(product);
    }

    public Boolean existsProductById(long id) {
        return productRepository.existsById(id);
    }

    public Product findProductById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));
    }

    public void deleteProduct(long id) {
        if (!existsProductById(id)) {
            throw new NotFoundException("Product with id '" + id + "' not found");
        }
        productRepository.deleteById(id);
    }
}
