package SpringProject._Spring.dto;


import SpringProject._Spring.model.Gender;

import java.time.LocalDate;

public record PetResponseDTO(
        long id,
        String name,
        String species,
        String breed,
        LocalDate birthdate,
        Gender gender
) { //returned
}
