package SpringProject._Spring.validation.customAnnotations.phoneNumber;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NumberLengthValidator implements ConstraintValidator<NumberLength,String> {

    public static final int minLength = 3;
    public static final int maxLength = 17;


    @Override
    public boolean isValid(String nmbr, ConstraintValidatorContext constraintValidatorContext) {
        return nmbr == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with
                nmbr.trim().length() >= minLength &&
                        nmbr.length() <= maxLength;
    }
}
