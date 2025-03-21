package SpringProject._Spring.validation.customAnnotations.firstName;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FNameRegexValidator implements ConstraintValidator<FNameRegex, String> {
    @Override
    public boolean isValid(String fName, ConstraintValidatorContext constraintValidatorContext) {
        return fName == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with. Also String.matches() throws an error if the string is null.
                fName.trim().length() <= FNameLengthValidator.minLength ||
                fName.trim().length() >= FNameLengthValidator.maxLength || // allow those that don't pass FNameLengthValidator, so that FNameLengthValidator's message has a higher priority.
                fName.matches("^[A-Za-z ]*$");
    }
}
