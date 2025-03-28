package SpringProject._Spring.validation.customAnnotations.authentication.vetExclusive.specialty;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SpecialtyLengthValidator implements ConstraintValidator<SpecialtyLength,String> {
    public static final int maxLength = 100;

    @Override
    public boolean isValid(String specialty, ConstraintValidatorContext constraintValidatorContext) {
        return specialty.length() <= maxLength;
    }
}
