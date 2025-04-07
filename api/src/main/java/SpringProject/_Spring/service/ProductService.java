package SpringProject._Spring.service;

import SpringProject._Spring.dto.product.ProductMapping;
import SpringProject._Spring.dto.product.ProductPageResponseDTO;
import SpringProject._Spring.dto.product.ProductPageResult;
import SpringProject._Spring.dto.product.ProductRequestDTO;
import SpringProject._Spring.exceptions.EntityIdNotFoundException;
import SpringProject._Spring.exceptions.NameAlreadyExistsException;
import SpringProject._Spring.model.Product;
import SpringProject._Spring.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

        Product product = ProductMapping.toProduct(productRequestDTO);

        return saveProduct(product);
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
        String message = pagedProducts.isEmpty() ? "Product list is empty" : null;
        ProductPageResponseDTO responseDTO = ProductMapping.toProductPageResponseDTO(pagedProducts);

        return new ProductPageResult(responseDTO, message);
    }

    public Page<Product> getProductPages(int page, int size, String sort) {
        if (sort == null) {
            Pageable pageable = PageRequest.of(page, size);
            return productRepository.findAll(pageable);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return productRepository.findAll(pageable);
    }

    public Product updateProduct(long id, ProductRequestDTO productRequestDTO) {
        if (!existsProductById(id)) {
            throw new EntityIdNotFoundException(id);
        }

        Product product = findProductById(id).get();

        ProductMapping.updateProductFromDTO(product, productRequestDTO);

        return saveProduct(product);
    }

    public Boolean existsProductById(long id) {
        return productRepository.existsById(id);
    }

    public Optional<Product> findProductById(long id) {
        return productRepository.findById(id);
    }
}
