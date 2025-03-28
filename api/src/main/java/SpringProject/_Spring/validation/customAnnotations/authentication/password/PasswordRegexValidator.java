package SpringProject._Spring.validation.customAnnotations.authentication.password;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordRegexValidator implements ConstraintValidator<PasswordRegex, String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        return password == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with. Also String.matches() throws an error if the string is null.
                password.trim().length() <= PasswordLengthValidator.minLength ||
                password.length() >= PasswordLengthValidator.maxLength || // allow those that don't pass PasswordLengthValidator, so that PasswordLengthValidator's message has a higher priority.
                password.matches("^(?=(.*[a-zA-Z]))(?=(.*\\d))[a-zA-Z0-9!\"#$%&'()*+,-./:;<=>?@^_`{|}~ ]*$");
    }
}
