package SpringProject._Spring.repository;

import SpringProject._Spring.model.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    boolean existsByOwnerId(long id);

    List<Pet> findAllByOwnerId(long id);
    Page<Pet> findAllByOwnerId(long id, Pageable pageable);

//    @Query("SELECT p FROM Pet p WHERE p.owner.email = :email")
//    Page<Pet> findAllOwnerPage(String email, Pageable pageable);
}
