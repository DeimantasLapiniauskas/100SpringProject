package SpringProject._Spring.controller;


import SpringProject._Spring.dto.PetMapping;
import SpringProject._Spring.dto.PetRequestDTO;
import SpringProject._Spring.model.Account;
import SpringProject._Spring.model.Pet;
import SpringProject._Spring.model.Role;
import SpringProject._Spring.service.AccountService;
import SpringProject._Spring.service.PetService;
import jakarta.persistence.EntityManager;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;
    private final AccountService accountService;

    @Autowired
    public PetController(PetService petService, AccountService accountService) {
        this.petService = petService;
        this.accountService = accountService;
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getAllPets(@PathVariable long id) {
        if (!accountService.existsAccountById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner does not exist!");
        }
        return ResponseEntity.ok(petService.getAllPetsByOwnerId(id).stream()
                .map(PetMapping::toPetResponseDTO)
                .toList());
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> addPet(@PathVariable long id,
                                    @Valid @RequestBody PetRequestDTO petRequestDTO,
                                    Principal principal) {
        if (!accountService.existsAccountById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner does not exist!");
        }

        if (id != accountService.findIdByEmail(principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not the owner!");
        }

        Pet createdPet = petService
                .savePet(
                        PetMapping.toPet(
                                petRequestDTO, id
                        )
                );
        return ResponseEntity.status(HttpStatus.CREATED).body(PetMapping.toPetResponseDTO(createdPet));
    }

    @PutMapping("/{ownerId}/{petId}")
    public ResponseEntity<?> updatePet(@PathVariable long ownerId,
                                       @PathVariable long petId,
                                       @Valid @RequestBody PetRequestDTO petRequestDTO,
                                       Principal principal
    ) {
        if (!accountService.existsAccountById(ownerId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner does not exist!");
        }

        if (!petService.existsById(petId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet does not exist!");
        }

        final Account currentAccount = accountService.findByEmail(principal.getName()).get();
        if (currentAccount.getId() != petService.getPetByid(petId).get().getOwnerId() &&
                currentAccount.getRoles().stream()
                        .noneMatch(
                                role -> Objects.equals(
                                        role.getName(), "ADMIN"
                                )
                        )
        ) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't edit someone else's pet!");
        }

        Pet petFromDB = petService.getPetByid(petId).get();
        petFromDB.setName(petRequestDTO.name());
        petFromDB.setSpecies(petRequestDTO.species());
        petFromDB.setBreed(petRequestDTO.breed());
        petFromDB.setBirthdate(petRequestDTO.birthdate());
        petFromDB.setGender(petRequestDTO.gender());
        petService.savePet(petFromDB);
        return ResponseEntity.ok(PetMapping.toPetResponseDTO(petFromDB));
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<?> deletePet(
            @PathVariable long petId,
            Principal principal) {

        if (!petService.existsById(petId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet does not exist!");
        }

        final Account currentAccount = accountService.findByEmail(principal.getName()).get();
        if (currentAccount.getId() != petService.getPetByid(petId).get().getOwnerId() &&
                currentAccount.getRoles().stream()
                        .noneMatch(
                                role -> Objects.equals(
                                        role.getName(), "ADMIN"
                                )
                        )
        ) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't delete someone else's pet!");
        }

        petService.deletePetById(petId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
