package SpringProject._Spring.repository.authentication;

import SpringProject._Spring.model.authentication.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByAccount_Email(String email);

    boolean existsByAccount_Email(String email);

    Client findByAccountId(long id);
}
