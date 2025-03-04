package SpringProject._Spring.dto;

import SpringProject._Spring.model.Pet;

import java.util.List;

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


    public static Pet toPet(PetRequestDTO petRequestDTO,long ownerId){
        Pet pet = new Pet();
        pet.setOwnerId(ownerId);
        pet.setName(petRequestDTO.name());
        pet.setSpecies(petRequestDTO.species());
        pet.setBreed(petRequestDTO.breed());
        pet.setBirthdate(petRequestDTO.birthdate());
        pet.setGender(petRequestDTO.gender());
        return pet;
    }
}
