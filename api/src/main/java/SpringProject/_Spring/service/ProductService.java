package SpringProject._Spring.service;

import SpringProject._Spring.dto.product.ProductRequestDTO;
import SpringProject._Spring.model.Product;
import SpringProject._Spring.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
            throw new ProductAlreadyExistsException();
        }
    }

    public boolean existsProductByName(String name) {
        return productRepository.existsProductByName(name);
    }
}
