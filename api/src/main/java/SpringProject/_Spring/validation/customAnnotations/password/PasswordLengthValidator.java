package SpringProject._Spring.validation.customAnnotations.password;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordLengthValidator implements ConstraintValidator<PasswordLength, String> {

    public static final int minLength = 8;
    public static final int maxLength = 50;
    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        return password == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with
                password.trim().length() >= minLength &&
                        password.length() <= maxLength;
    }
}
