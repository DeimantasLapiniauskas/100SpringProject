package SpringProject._Spring.repository.authentication;

import SpringProject._Spring.model.authentication.Vet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VetRepository extends JpaRepository<Vet, Long> {
    Optional<Vet> findByAccount_email(String email);
}
