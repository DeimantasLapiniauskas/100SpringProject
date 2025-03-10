package SpringProject._Spring.dto.vet;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record VetRequestDTO(
        @Email(regexp = "^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{3,}\\.[a-zA-Z]{2,}$",
                message = "Invalid email format, vets should have at least 4 symbols before @, at least 3 after @ and before domain, domain at least 2 symbols")
        @Length(min = 11, max = 50, message = "Vets email is either too short or too long! Min is 11, max is 50 symbols")
        String email,

        @NotNull(message = "Password can not be null!")
        @Length(min = 8, max = 50, message = "Vets password is either too short or too long! Min length is 8, max is 50 symbols")
        @Pattern(regexp = "^(?=(.*[a-zA-Z]))(?=(.*\\d))^[a-zA-Z0-9!\"#$%&'()*+,-./:;<=>?@^_`{|}~ ]+$\n",
                message = "Your password must contain at least one number, one letter, and it only accepts those and the regular qwerty keyboard symbols!")
        // qwerty symbols: !"#$%&'()*+,-./:;<=>?@[\]^_{|}~`
        String password,

        @NotNull(message = "First name can not be null!")
        @Length(min = 3, max = 100, message = "Vets first name must be between 3 and 100 characters long!")
        @Pattern(regexp = "^[A-Za-z ]*$", message = "Vets first name must only consist of letters and spaces!")
        String firstName,

        @NotNull(message = "Last name can not be null!")
        @Length(min = 3, max = 100, message = "Vets last name must be between 3 and 100 characters long!")
        @Pattern(regexp = "^[A-Za-z ]*$", message = "Vets last name must only consist of letters and spaces!")
        String lastName,

        @NotNull(message = "Phone number can not be null!")
        @Length(min = 3, max = 17, message = "Vets phone number must be between 3 and 17 characters long!")
        @Pattern(regexp = "^[0-9-]*$", message = "Vets phone number must only be numbers and dashes!")
        String phoneNumber,

        @NotNull(message = "Vets must have a specialty!")
        @Length(max = 100, message = "Specialty can not be longer than 100 characters!")
        String specialty,

        @NotNull(message = "Vets must have a license number!")
        @Length(max = 50, message = "License number can't be longer than 50 characters!")
        String licenseNumber
) {
}
