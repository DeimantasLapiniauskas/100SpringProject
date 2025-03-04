package SpringProject._Spring.dto;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record PasswordUpdateDTO(@NotNull(message = "Password can not be null!")
                                @Length(min = 6, max = 255, message = "Your password is either too short or too long! Min length is 6, max is 255 symbols")
                                String newPassword) {
}
