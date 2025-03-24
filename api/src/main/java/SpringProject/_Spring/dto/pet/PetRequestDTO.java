package SpringProject._Spring.dto.pet;


import SpringProject._Spring.model.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

public record PetRequestDTO(
        @NotNull(message = "Your pet must have a name!")
        @Length(min = 2, max = 30, message = "Name must be between 2 and 30 characters long!")
        @Pattern(regexp = "^[A-Za-z\\s-]+$", message = "Name must contain only letters and spaces, allows only English alphabet")
        String name,

        @NotNull(message = "Your pets' species cannot be null!")
        @NotBlank(message = "You must provide a species!")
        @Pattern(regexp = "^[A-Za-z\\s-]+$", message = "Species must contain only letters and spaces, allows only English alphabet")
        String species,

        @Pattern(regexp = "^[A-Za-z\\s-]+$", message = "Breed must contain only letters and spaces, allows only English alphabet")
        String breed, //breed can be null or empty

        LocalDate birthdate, // birthdate can be null or empty

        @NotNull(message = "Your pets' gender cannot be null!")
        Gender gender
) { //given
}
