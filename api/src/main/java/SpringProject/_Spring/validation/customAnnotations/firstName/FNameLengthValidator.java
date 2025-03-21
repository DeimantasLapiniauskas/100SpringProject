package SpringProject._Spring.validation.customAnnotations.firstName;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FNameLengthValidator implements ConstraintValidator<FNameLength,String> {
    public static final int minLength = 3;
    public static final int maxLength = 100;

    @Override
    public boolean isValid(String fName, ConstraintValidatorContext constraintValidatorContext) {
        return fName == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with
                fName.trim().length() >= minLength &&
                        fName.length() <= maxLength;
    }

}
