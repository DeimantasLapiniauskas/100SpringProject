package SpringProject._Spring.dto.password;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record PasswordUpdateDTO(
        @NotNull(message = "Password can not be null!")
        @Length(min = 8, max = 50, message = "Your password is either too short or too long! Min length is 8, max is 50 symbols")
        String newPassword) {
}
