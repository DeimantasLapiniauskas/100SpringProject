package SpringProject._Spring.validation.customAnnotations.lastName;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LNameLengthValidator implements ConstraintValidator<LNameLength,String> {

    public static final int minLength = 3;
    public static final int maxLength = 100;

    @Override
    public boolean isValid(String lName, ConstraintValidatorContext constraintValidatorContext) {
        return lName == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with
                lName.trim().length() >= minLength &&
                        lName.length() <= maxLength;
    }
}
