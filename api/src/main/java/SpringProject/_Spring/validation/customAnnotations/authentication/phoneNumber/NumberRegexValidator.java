package SpringProject._Spring.validation.customAnnotations.authentication.phoneNumber;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NumberRegexValidator implements ConstraintValidator<NumberRegex,String> {

    @Override
    public boolean isValid(String number, ConstraintValidatorContext constraintValidatorContext) {
        return number == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with. Also String.matches() throws an error if the string is null.
                number.trim().length() <= NumberLengthValidator.minLength ||
                number.length() >= NumberLengthValidator.maxLength || // allow those that don't pass NumberLengthValidator, so that NumberLengthValidator's message has a higher priority.
                number.matches("^\\+?[0-9]+([0-9\\-]*[0-9])?$");
    }
}
