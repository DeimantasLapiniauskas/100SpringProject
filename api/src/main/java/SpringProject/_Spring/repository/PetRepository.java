package SpringProject._Spring.repository;

import SpringProject._Spring.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {

    boolean existsByOwnerId(long id);

    Pet findAllByOwnerId(long id);
}
