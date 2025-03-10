package SpringProject._Spring.dto.client;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;


public record ClientRequestDTO(
        @Email(regexp = "^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{3,}\\.[a-zA-Z]{2,}$",
                message = "Invalid email format, you should have at least 4 symbols before @, at least 3 after @ and before domain, domain at least 2 symbols")
        @Length(min = 11, max = 50,
                message = "Your email is either too short or too long! Min is 11, max is 50 symbols")
        String email,

        @NotNull(message = "Password can not be null!")
        @Length(min = 8, max = 50, message = "Your password is either too short or too long! Min length is 8, max is 50 symbols")
        @Pattern(regexp = "^(?=(.+[a-zA-Z]))(?=(.+\\d))^[a-zA-Z0-9!\"#$%&'()*+,-./:;<=>?@^_`{|}~ ]+$\n",
                message = "Your password must contain at least one number, one letter, and it only accepts those and the regular qwerty keyboard symbols!")
        // qwerty symbols: !"#$%&'()*+,-./:;<=>?@[\]^_{|}~`
        String password,

        @NotNull(message = "First name can not be null!")
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


