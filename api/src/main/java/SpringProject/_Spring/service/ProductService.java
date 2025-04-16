package SpringProject._Spring.service;

import SpringProject._Spring.dto.product.ProductMapping;
import SpringProject._Spring.dto.product.ProductPageResult;
import SpringProject._Spring.dto.product.ProductRequestDTO;
import SpringProject._Spring.exceptions.NameAlreadyExistsException;
import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.product.Product;
import SpringProject._Spring.repository.product.CategoryRepository;
import SpringProject._Spring.repository.product.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public Product addNewProduct(ProductRequestDTO productRequestDTO) {
        if (existsProductByName(productRequestDTO.name())) {
            throw new NameAlreadyExistsException("Product", productRequestDTO.name());
        }

        return saveProduct(ProductMapping.toProduct(productRequestDTO, categoryRepository));
    }

    public boolean existsProductByName(String name) {
        return productRepository.existsProductByName(name);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public ProductPageResult findAllProductsPage(int page, int size, String sort, String search) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }
        if (search != null && search.trim().length() > 50) {
            throw new IllegalArgumentException("Search query is too long");
        }
        if (search != null && search.trim().matches("^[%_]+$")) {
            throw new IllegalArgumentException("Search query cannot contain only wildcards");
        }

        Page<Product> pagedProducts = getProductPages(page, size, sort, search);

        return new ProductPageResult(ProductMapping.toProductPageResponseDTO(pagedProducts), pagedProducts.isEmpty() ? "Product list is empty" : null);
    }

    public Page<Product> getProductPages(int page, int size, String sort, String search) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        boolean isAllCategories = sort == null || sort.trim().isEmpty() || sort.equalsIgnoreCase("All");

        if (isAllCategories) {
            if (search == null || search.trim().isEmpty()) {
                return productRepository.findAll(pageable);
            } else {
                return productRepository.searchByName(search.toLowerCase(), pageable);
            }
        } else {
            if (search == null || search.trim().isEmpty()) {
                return productRepository.findByCategory(sort, pageable);
            } else {
                return productRepository.searchInCategory(search.toLowerCase(), sort, pageable);
            }
        }
    }

    public Product updateProduct(long id, ProductRequestDTO productRequestDTO) {
        if (!existsProductById(id)) {
            throw new NotFoundException("Product with id '" + id + "' not found");
        }

        Product product = findProductById(id);

        ProductMapping.updateProductFromDTO(product, productRequestDTO, categoryRepository);

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
