package SpringProject._Spring.dto.pet;

import SpringProject._Spring.model.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.stream.Collectors;

public class PetMapping {

    public static PetResponseDTO toPetResponseDTO(Pet pet) {
        return new PetResponseDTO(
                pet.getId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getBirthdate(),
                pet.getGender()
        );
    }

    public static List<PetResponseDTO> toPetDTOList(List<Pet> pets) {
        return pets.stream()
                .map(
                        pet -> new PetResponseDTO(
                                pet.getId(),
                                pet.getName(),
                                pet.getSpecies(),
                                pet.getBreed(),
                                pet.getBirthdate(),
                                pet.getGender()
                        )
                )
                .toList();
    }


    public static Pet toPet(PetRequestDTO petRequestDTO, long ownerId) {
        Pet pet = new Pet();
        pet.setOwnerId(ownerId);
        pet.setName(petRequestDTO.name());
        pet.setSpecies(petRequestDTO.species());
        pet.setBreed(petRequestDTO.breed());
        pet.setBirthdate(petRequestDTO.birthdate());
        pet.setGender(petRequestDTO.gender());
        return pet;
    }

    public static Page<PetResponseDTO> toPageListPageDTO(Page<Pet> petsPage) {
        List<PetResponseDTO> petListResponseDTO = petsPage.getContent().stream()
                .map(PetMapping::toPetResponseDTO)
                .toList();

        return new PageImpl<>(petListResponseDTO, petsPage.getPageable(), petsPage.getTotalElements());
    }
}
