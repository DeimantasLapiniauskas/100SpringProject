package SpringProject._Spring.validation.customAnnotations.authentication.lastName;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LNameRegexValidator implements ConstraintValidator<LNameRegex, String> {

    @Override
    public boolean isValid(String lName, ConstraintValidatorContext constraintValidatorContext) {
        return lName == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with. Also String.matches() throws an error if the string is null.
                lName.trim().length() <= LNameLengthValidator.minLength ||
                lName.length() >= LNameLengthValidator.maxLength || // allow those that don't pass LNameLengthValidator, so that LNameLengthValidator's message has a higher priority.
                lName.matches("^[A-Za-z ]*$");
    }
}
