package SpringProject._Spring.dto.authentication.vet;

import SpringProject._Spring.validation.customAnnotations.authentication.email.EmailLength;
import SpringProject._Spring.validation.customAnnotations.authentication.email.EmailRegex;
import SpringProject._Spring.validation.customAnnotations.authentication.firstName.FNameLength;
import SpringProject._Spring.validation.customAnnotations.authentication.firstName.FNameRegex;
import SpringProject._Spring.validation.customAnnotations.authentication.lastName.LNameLength;
import SpringProject._Spring.validation.customAnnotations.authentication.lastName.LNameRegex;
import SpringProject._Spring.validation.customAnnotations.authentication.vetExclusive.licenseNumber.licenseNumber.LicenseNumberLength;
import SpringProject._Spring.validation.customAnnotations.authentication.password.PasswordLength;
import SpringProject._Spring.validation.customAnnotations.authentication.password.PasswordRegex;
import SpringProject._Spring.validation.customAnnotations.authentication.phoneNumber.NumberLength;
import SpringProject._Spring.validation.customAnnotations.authentication.phoneNumber.NumberRegex;
import SpringProject._Spring.validation.customAnnotations.authentication.vetExclusive.specialty.SpecialtyLength;
import jakarta.validation.constraints.NotNull;

public record VetRequestDTO(

        @NotNull(message = "Password cannot be null!")
        @EmailLength
        @EmailRegex //Two different custom annotations, so I could give each of them different default messages
        String email,

        @NotNull(message = "Password cannot be null!")
        @PasswordLength
        @PasswordRegex
        String password,

        @NotNull(message = "First name can not be null!")
        @FNameLength
        @FNameRegex
        String firstName,

        @NotNull(message = "Last name can not be null!")
        @LNameLength
        @LNameRegex
        String lastName,

        @NotNull(message = "Phone number can not be null!")
        @NumberLength
        @NumberRegex
        String phoneNumber,

        @NotNull(message = "Vets must have a specialty!")
        @SpecialtyLength
        String specialty,

        @NotNull(message = "Vets must have a license number!")
        @LicenseNumberLength
        String licenseNumber
) {
}
