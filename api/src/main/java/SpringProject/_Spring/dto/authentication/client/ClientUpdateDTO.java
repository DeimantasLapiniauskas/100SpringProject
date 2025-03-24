package SpringProject._Spring.dto.authentication.client;

import SpringProject._Spring.validation.customAnnotations.firstName.FNameLength;
import SpringProject._Spring.validation.customAnnotations.firstName.FNameRegex;
import SpringProject._Spring.validation.customAnnotations.lastName.LNameLength;
import SpringProject._Spring.validation.customAnnotations.lastName.LNameRegex;
import SpringProject._Spring.validation.customAnnotations.phoneNumber.NumberLength;
import SpringProject._Spring.validation.customAnnotations.phoneNumber.NumberRegex;
import jakarta.validation.constraints.NotNull;

public record ClientUpdateDTO(@NotNull(message = "First name can not be null!")
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
                              String phoneNumber) {
}
