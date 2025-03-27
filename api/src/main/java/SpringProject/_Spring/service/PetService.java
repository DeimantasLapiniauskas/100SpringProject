package SpringProject._Spring.service;


import SpringProject._Spring.model.pet.Pet;
import SpringProject._Spring.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    private final PetRepository petRepository;

    @Autowired
    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> getAllPetsByOwnerId(long id) {
        return petRepository.findAllByOwnerId(id);
    }

    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    public boolean existsById(long petId) {
        return petRepository.existsById(petId);
    }

    public Optional<Pet> getPetById(long id) {
        return petRepository.findById(id);
    }

    public void deletePetById(long petId) {
        petRepository.deleteById(petId);
    }

    public Page<Pet> findAllPetsPageByOwnerId(int page, int size, String sort, long ownerAccountId) {
        if (sort == null) {
            Pageable pageable = PageRequest.of(page, size);
            return petRepository.findAllByOwnerId(ownerAccountId, pageable);

        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return petRepository.findAllByOwnerId(ownerAccountId, pageable);
    }

    public boolean isNotValidSortField(String sort) {
        List<String> validSortFields = List.of(
                "ownerId", "name", "species", "breed", "birthday", "gender");
        return !validSortFields.contains(sort);
    }
}
