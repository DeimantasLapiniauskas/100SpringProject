package SpringProject._Spring.repository;

import SpringProject._Spring.model.Vet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VetRepository extends JpaRepository<Vet, Long> {
}
