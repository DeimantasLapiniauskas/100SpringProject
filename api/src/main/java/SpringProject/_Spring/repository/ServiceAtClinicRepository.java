package SpringProject._Spring.repository;

import SpringProject._Spring.model.ServiceAtClinic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceAtClinicRepository extends JpaRepository<ServiceAtClinic, Long> {
    boolean existsByName(String name);
    Optional<ServiceAtClinic> findByName(String name);
}
