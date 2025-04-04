package SpringProject._Spring.repository;

import SpringProject._Spring.model.pet.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findAllByOwnerId(long id);
    Page<Pet> findAllByOwnerId(long id, Pageable pageable);

    Optional<Pet> findById(long id);

}
