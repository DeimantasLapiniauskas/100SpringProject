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

    @Query(value = """
                SELECT p FROM Product p
                WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                ORDER BY p.id DESC
            """,
            countQuery = """
                        SELECT COUNT(p) FROM Product p
                        WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                    """)
    Page<Product> searchByName(@Param("search") String search, Pageable pageable);

    @Query(value = """
                SELECT p FROM Product p
                JOIN p.categories c
                WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                AND c.name = :categoryName
                ORDER BY p.id DESC
            """,
            countQuery = """
                        SELECT COUNT(p) FROM Product p
                        JOIN p.categories c
                        WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                        AND c.name = :categoryName
                    """)
    Page<Product> searchInCategory(
            @Param("search") String search,
            @Param("categoryName") String categoryName,
            Pageable pageable
    );

    @Query(value = """
                SELECT p FROM Product p
                JOIN p.categories c
                WHERE c.name = :categoryName
                ORDER BY p.id DESC
            """,
            countQuery = """
                        SELECT COUNT(p) FROM Product p
                        JOIN p.categories c
                        WHERE c.name = :categoryName
                    """)
    Page<Product> findByCategory(
            @Param("categoryName") String categoryName,
            Pageable pageable
    );

    boolean existsProductByName(String name);
}
