package SpringProject._Spring.dto.authentication.vet;

import SpringProject._Spring.validation.customAnnotations.firstName.FNameLength;
import SpringProject._Spring.validation.customAnnotations.firstName.FNameRegex;
import SpringProject._Spring.validation.customAnnotations.lastName.LNameLength;
import SpringProject._Spring.validation.customAnnotations.lastName.LNameRegex;
import SpringProject._Spring.validation.customAnnotations.phoneNumber.NumberLength;
import SpringProject._Spring.validation.customAnnotations.phoneNumber.NumberRegex;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record VetUpdateRequestDTO(@NotNull(message = "First name can not be null!")
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
                           @Length(max = 100, message = "Specialty can not be longer than 100 characters!")
                           String specialty,

                                  @NotNull(message = "Vets must have a license number!")
                           @Length(max = 50, message = "License number can't be longer than 50 characters!")
                           String licenseNumber) {
}
