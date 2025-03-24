package SpringProject._Spring.dto.authentication.client;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record ClientUpdateDTO(@NotNull(message = "First name can not be null!")
                              @Length(min = 3, max = 100,
                                      message = "Your first name must be between 3 and 100 characters long!")
                              @Pattern(regexp = "^[A-Za-z ]*$",
                                      message = "Your first name must only consist of letters and spaces!")
                              String firstName,

                              @NotNull(message = "Last name can not be null!")
                              @Length(min = 3, max = 100,
                                      message = "Your last name must be between 3 and 100 characters long!")
                              @Pattern(regexp = "^[A-Za-z ]*$",
                                      message = "Your last name must only consist of letters and spaces!")
                              String lastName,

                              @NotNull(message = "Phone number can not be null!")
                              @Length(min = 3, max = 17,
                                      message = "Your phone number must be between 3 and 17 characters long!")
                              @Pattern(regexp = "^[0-9\\-+]+$",
                                      message = "Your phone number must only be numbers and dashes!")
                              String phoneNumber) {
}
