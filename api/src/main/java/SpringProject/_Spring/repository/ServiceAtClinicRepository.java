package SpringProject._Spring.repository;

import SpringProject._Spring.model.Review;
import SpringProject._Spring.model.ServiceAtClinic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ServiceAtClinicRepository extends JpaRepository<ServiceAtClinic, Long> {
    boolean existsByName(String name);

    Optional<ServiceAtClinic> findByName(String name);

    Optional<List<ServiceAtClinic>> findAllById(long id);

    @Query(value = """
            SELECT p FROM ServiceAtClinic p
            WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))
            OR str(p.price) LIKE CONCAT('%', :search, '%')
            """,

            countQuery = """
            SELECT COUNT(p) FROM ServiceAtClinic p
            WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
            OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))
            OR str(p.price) LIKE CONCAT('%', :search, '%')
            """ )
    Page<ServiceAtClinic> searchInAllFields (@Param("search") String search, Pageable pageable);
}
