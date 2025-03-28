package SpringProject._Spring.controller;


import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.pet.PetMapping;
import SpringProject._Spring.dto.pet.PetPageResponseDTO;
import SpringProject._Spring.dto.pet.PetRequestDTO;
import SpringProject._Spring.dto.pet.PetResponseDTO;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.pet.Pet;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.PetService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/pets")
public class PetController extends BaseController {

    private final PetService petService;
    private final ClientService clientService;
    private final AccountService accountService;

    @Autowired
    public PetController(PetService petService, AccountService accountService, ClientService clientService) {
        this.petService = petService;
        this.clientService = clientService;
        this.accountService = accountService;
    }

    @Operation(summary = "Get all pets by owner ID", description = "Retrieves all pets owned by client by his ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN') or hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<List<PetResponseDTO>> getAllPetsByOwnerId(@PathVariable long id) {
        return ResponseEntity.ok(petService.getAllPetsByOwnerId(id).stream()
                .map(PetMapping::toPetResponseDTO)
                .toList());
    }

    @Operation(summary = "Add new pet", description = "Adds a new pet to the database")
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> addPet(
            @Valid @RequestBody PetRequestDTO petRequestDTO,
            Authentication authentication) {

        long id = clientService.findClientIdByEmail(authentication.getName());

        if (!clientService.existsClientById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Owner does not exist!");
        }

        Pet pet = PetMapping.toPet(petRequestDTO, id);
        pet.setOwnerId(id);
        Pet createdPet = petService.savePet(pet);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(PetMapping.toPetResponseDTO(createdPet));
    }

    @Operation(summary = "Update pet by ID (Client and Admin)", description = "Updates a pet by it's unique ID")
    @PutMapping("/{petId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updatePet(@PathVariable long petId,
                                       @Valid @RequestBody PetRequestDTO petRequestDTO,
                                       Authentication authentication
    ) {
        if (!petService.existsById(petId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pet does not exist!");
        }

        final Account currentAccount = accountService.findByEmail(authentication.getName()).get();

        if (clientService.findClientIdByEmail(currentAccount.getEmail())
                !=
                petService.getPetById(petId).get().getOwnerId()
                &&
                currentAccount.getRoles().stream()
                        .noneMatch(
                                role ->
                                        Objects.equals(
                                                role.getName(), "ADMIN"
                                        )
                        )
        ) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can't edit someone else's pet!");
        }

        Pet petFromDB = petService.getPetById(petId).get();
        petFromDB.setName(petRequestDTO.name());
        petFromDB.setSpecies(petRequestDTO.species());
        petFromDB.setBreed(petRequestDTO.breed());
        petFromDB.setBirthdate(petRequestDTO.birthdate());
        petFromDB.setGender(petRequestDTO.gender());
        petService.savePet(petFromDB);
        return ResponseEntity.ok(PetMapping.toPetResponseDTO(petFromDB));
    }

    @Operation(summary = "Delete pet by ID (Client and Admin)", description = "Deletes a pet by it's unique ID")
    @DeleteMapping("/{petId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> deletePet(
            @PathVariable long petId,
            Authentication authentication) {

        if (!petService.existsById(petId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet does not exist!");
        }

        final Account currentAccount = accountService.findByEmail(authentication.getName()).get();
        if (clientService.findClientIdByEmail(currentAccount.getEmail())
                !=
                petService.getPetById(petId).get().getOwnerId()
                &&
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

//    @Operation(summary = "Get pets by owner ID and split them by pages (Client and Admin)", description = "Retrieves all pets owned by client by his ID and splits the list by pages")
//    @GetMapping("/pagination")
//    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN')")
//    public ResponseEntity<Page<PetResponseDTO>> getPetsPageByOwnerId(Authentication authentication,
//                                                                     @RequestParam int page,
//                                                                     @RequestParam int size,
//                                                                     @RequestParam(required = false) String sort) {
//
//
//        long ownerAccountId = clientService.findClientIdByEmail(authentication.getName());
//
//
//        if (page < 0 || size <= 0) {
//            throw new IllegalArgumentException("Invalid page or size parameters");
//        }
//
//        if (sort != null && petService.isNotValidSortField(sort)) {
//            throw new IllegalArgumentException("Invalid sort field");
//        }
//
//        return ResponseEntity.ok(PetMapping.toPageListPageDTO(petService.findAllPetsPageByOwnerId(page, size, sort, ownerAccountId)));
//    }

    @Operation(summary = "Get pets by owner ID and split them by pages (Client and Admin)", description = "Retrieves all pets owned by client by his ID and splits the list by pages")@GetMapping("/pagination")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PetPageResponseDTO>> getAllPostsPage(Authentication authentication,
                                                                           @RequestParam int page,
                                                                           @RequestParam int size,
                                                                           @RequestParam(required = false) String sort) {
        long ownerAccountId = clientService.findClientIdByEmail(authentication.getName());
        if (page < 0 || size <= 0) {        throw new IllegalArgumentException("Invalid page or size parameters");    }
        Page<Pet> pagedPets = petService.findAllPetsPage(page, size, sort, ownerAccountId);
        String message = pagedPets.isEmpty() ? "Pet list is empty" : null;
        PetPageResponseDTO responseDTO = PetMapping.toPetPageResponseDTO(pagedPets);
        return ok(responseDTO, message);}


}
