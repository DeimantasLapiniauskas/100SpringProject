package SpringProject._Spring.dto.authentication.vet;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record VetUpdateDTO(@NotNull(message = "First name can not be null!")
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
                           String licenseNumber) {
}
