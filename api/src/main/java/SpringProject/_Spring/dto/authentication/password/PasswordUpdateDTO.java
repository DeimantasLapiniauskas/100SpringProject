package SpringProject._Spring.dto.authentication.password;

import SpringProject._Spring.validation.customAnnotations.authentication.password.PasswordLength;
import SpringProject._Spring.validation.customAnnotations.authentication.password.PasswordRegex;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record PasswordUpdateDTO(
//        @NotNull(message = "Password can not be null!")
//        @Length(min = 8, max = 50, message = "Your password is either too short or too long! Min length is 8, max is 50 symbols")
//        @Pattern(regexp = "^(?=(.*[a-zA-Z]))(?=(.*\\d))[a-zA-Z0-9!\"#$%&'()*+,-./:;<=>?@^_`{|}~ ]*$",
//                message = "Your password must contain at least one number, one letter, and it only accepts those and the regular qwerty keyboard symbols!")
//        // qwerty symbols: !"#$%&'()*+,-./:;<=>?@[\]^_{|}~`
        @NotNull(message = "Password cannot be null!")
        @PasswordLength
        @PasswordRegex
        String newPassword) {
}
