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

    //by the idea we don't need this endpoint anymore, but I'll leave it here in case of something was broken
//    @Operation(summary = "Get all pets by owner ID", description = "Retrieves all pets owned by client by his ID")
//    @GetMapping("/{id}")
//    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN') or hasAuthority('SCOPE_ROLE_CLIENT')")
//    public ResponseEntity<List<PetResponseDTO>> getAllPetsByOwnerId(@PathVariable long id) {
//        return ResponseEntity.ok(petService.getAllPetsByOwnerId(id).stream()
//                .map(PetMapping::toPetResponseDTO)
//                .toList());
//    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN') or hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<List<PetResponseDTO>>> getAllPetsByOwner(Authentication authentication) {
        return ok(petService.getAllPetsByOwnerId(clientService.findClientIdByEmail(authentication.getName())).stream()
                .map(PetMapping::toPetResponseDTO)
                .toList());
    }

    @Operation(summary = "Add new pet", description = "Adds a new pet to the database")
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<PetResponseDTO>> addPet(
            @Valid @RequestBody PetRequestDTO petRequestDTO,
            Authentication authentication) {

        long id = clientService.findClientIdByEmail(authentication.getName());

        if (!clientService.existsClientById(id)) {
            return notFound("Owner does not exist!");
        }

        Pet pet = PetMapping.toPet(petRequestDTO, id);
        pet.setOwnerId(id);
        Pet createdPet = petService.savePet(pet);
        return created(PetMapping.toPetResponseDTO(createdPet),"Pet created successfully!");
    }

    @Operation(summary = "Update pet by ID (Client and Admin)", description = "Updates a pet by it's unique ID")
    @PutMapping("/{petId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PetResponseDTO>> updatePet(@PathVariable long petId,
                                                                 @Valid @RequestBody PetRequestDTO petRequestDTO,
                                                                 Authentication authentication
    ) {
        if (!petService.existsById(petId)) {
            return notFound("Pet does not exist!");
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
            return forbidden("You can't edit someone else's pet!");
        }

        Pet petFromDB = petService.getPetById(petId).get();
        petFromDB.setName(petRequestDTO.name());
        petFromDB.setSpecies(petRequestDTO.species());
        petFromDB.setBreed(petRequestDTO.breed());
        petFromDB.setBirthdate(petRequestDTO.birthdate());
        petFromDB.setGender(petRequestDTO.gender());
        petService.savePet(petFromDB);
        return ok(PetMapping.toPetResponseDTO(petFromDB));
    }

    @Operation(summary = "Delete pet by ID (Client and Admin)", description = "Deletes a pet by it's unique ID")
    @DeleteMapping("/{petId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Object>> deletePet(
            @PathVariable long petId,
            Authentication authentication) {

        if (!petService.existsById(petId)) {
            return notFound("Pet does not exist!");
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
            return forbidden("You can't delete someone else's pet!");
        }

        petService.deletePetById(petId);
        return noContent();
    }

    @Operation(summary = "Get pets by owner ID and split them by pages (Client and Admin)", description = "Retrieves all pets owned by client by his ID and splits the list by pages")
    @GetMapping("/pagination")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PetPageResponseDTO>> getAllPostsPage(Authentication authentication,
                                                                           @RequestParam int page,
                                                                           @RequestParam int size,
                                                                           @RequestParam(required = false) String sort) {

        long ownerAccountId = clientService.findClientIdByEmail(authentication.getName());

        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        Page<Pet> pagedPets = petService.findAllPetsPage(page, size, sort, ownerAccountId);
        String message = pagedPets.isEmpty() ? "Pet list is empty" : null;
        PetPageResponseDTO responseDTO = PetMapping.toPetPageResponseDTO(pagedPets);

        return ok(responseDTO, message);
    }
}
