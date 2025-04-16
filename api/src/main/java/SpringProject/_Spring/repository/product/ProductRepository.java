package SpringProject._Spring.repository.product;


import SpringProject._Spring.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    boolean existsProductByName(String name);
}
