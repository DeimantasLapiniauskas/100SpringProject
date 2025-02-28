package SpringProject._Spring.service;


import SpringProject._Spring.dto.PetResponseDTO;
import SpringProject._Spring.model.Pet;
import SpringProject._Spring.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PetService {

    private final PetRepository petRepository;

    @Autowired
    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public boolean existsByOwnerId(long id) {
        return petRepository.existsByOwnerId(id);
    }

    public Pet getAllPetsByOwnerId(long id) {
        return petRepository.findAllByOwnerId(id);
    }

    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    public boolean existsById(long petId) {
        return petRepository.existsById(petId);
    }

    public Optional<Pet> getPetByid(long id) {
        return petRepository.findById(id);
    }

    public void deletePetById(long petId) {
        petRepository.deleteById(petId);
    }
}
