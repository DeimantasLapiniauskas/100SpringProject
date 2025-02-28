package SpringProject._Spring.dto;


import SpringProject._Spring.model.Gender;

import java.time.LocalDate;

public record PetRequestDTO(
        String name,
        String species,
        String breed,
        LocalDate birthdate,
        Gender gender
) { //given
}
