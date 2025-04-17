package SpringProject._Spring.repository;


import SpringProject._Spring.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {


    boolean existsProductByName(String name);
}
