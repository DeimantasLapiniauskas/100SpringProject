package SpringProject._Spring.validation.customAnnotations.authentication.vetExclusive.licenseNumber.licenseNumber;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LicenseNumberLengthValidator implements ConstraintValidator<LicenseNumberLength, String> {
    public static final int maxLength = 50;

    @Override
    public boolean isValid(String licenseNumber, ConstraintValidatorContext constraintValidatorContext) {
        return licenseNumber.length() <= maxLength;
    }

}
