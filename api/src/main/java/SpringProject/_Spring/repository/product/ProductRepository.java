package SpringProject._Spring.repository.product;


import SpringProject._Spring.model.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByNameContainingIgnoreCase(String search, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCaseAndCategoriesName(String search, String categoryName, Pageable pageable);

    Page<Product> findByCategoriesName(String categoryName, Pageable pageable);

    boolean existsProductByName(String name);
}
