package SpringProject._Spring.validation.customAnnotations.phoneNumber;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NumberRegexValidator implements ConstraintValidator<NumberRegex,String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        return password == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with. Also String.matches() throws an error if the string is null.
                password.trim().length() <= NumberLengthValidator.minLength ||
                password.length() >= NumberLengthValidator.maxLength || // allow those that don't pass NumberLengthValidator, so that NumberLengthValidator's message has a higher priority.
                password.matches("^\\+?[0-9]([0-9\\-]*[0-9])?$");
    }
}
