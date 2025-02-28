package SpringProject._Spring.controller;


import SpringProject._Spring.dto.PetMapping;
import SpringProject._Spring.dto.PetRequestDTO;
import SpringProject._Spring.model.Pet;
import SpringProject._Spring.service.PetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;

@RestController
@RequestMapping("/api/pets/{id}")
public class PetController {

    private final PetService petService;


    @Autowired
    public PetController(PetService petService) {
        this.petService = petService;
    }


    @GetMapping
    public ResponseEntity<?> getAllPets(@PathVariable long id) {
        if (!petService.existsByOwnerId(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner does not exist!");
        }

        return ResponseEntity.ok(PetMapping.toPetResponseDTO(petService.getAllPetsByOwnerId(id)));
    }

    @PostMapping
    public ResponseEntity<?> addPet(@PathVariable long id,
                                    @Valid @RequestBody PetRequestDTO petRequestDTO,
                                    Principal principal) {
        if (!petService.existsByOwnerId(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner does not exist!");
        }

        //todo: Assign owner via principal
        Pet createdPet = petService.savePet(PetMapping.toPet(petRequestDTO, userService.getUserByEmail(principal.getName())));
        return ResponseEntity.status(HttpStatus.CREATED).body(PetMapping.toPetResponseDTO(createdPet));
    }

    @PutMapping("/{petId}")
    public ResponseEntity<?> updatePet(@PathVariable long id,
                                       @PathVariable long petId,
                                       @Valid @RequestBody PetRequestDTO petRequestDTO
    ) {
        if (!petService.existsByOwnerId(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner does not exist!");
        }

        if (!petService.existsById(petId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet does not exist!");
        }

        Pet petFromDB = petService.getPetByid(id).get();
        petFromDB.setName(petRequestDTO.name());
        petFromDB.setSpecies(petRequestDTO.species());
        petFromDB.setBreed(petRequestDTO.breed());
        petFromDB.setBirthdate(petRequestDTO.birthdate());
        petFromDB.setGender(petRequestDTO.gender());
        petService.savePet(petFromDB);
        return ResponseEntity.ok(PetMapping.toPetResponseDTO(petFromDB));
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<?> deletePet(@PathVariable long id,
                                       @PathVariable long petId,
                                       Principal principal) {

        if (!petService.existsById(petId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet does not exist!");
        }

        final User currentUser = userService.findUserByUsername(principal.getName()).get();
        if (currentUser.getId() != petService.getPetByid(petId).get().getOwnerId() &&
                currentUser.getRoles().stream()
                        .noneMatch(
                                role -> Objects.equals(
                                        role.getName(), "ROLE_ADMIN"
                                )
                        )
        ){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to do that!")
        }


           // petService.deletePetById
    }
}
