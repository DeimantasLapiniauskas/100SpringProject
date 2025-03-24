package SpringProject._Spring.validation.customAnnotations.authentication.email.email;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailRegexValidator implements ConstraintValidator<EmailRegex,String> {

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        return email == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with. Also String.matches() throws an error if the string is null.
                email.trim().length() <= EmailLengthValidator.minLength ||
                email.length() >= EmailLengthValidator.maxLength || // allow those that don't pass EmailLengthValidator, so that EmailLengthValidator's message has a higher priority.
                email.matches("^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{3,}\\.[a-zA-Z]{2,}$");
    }
}
