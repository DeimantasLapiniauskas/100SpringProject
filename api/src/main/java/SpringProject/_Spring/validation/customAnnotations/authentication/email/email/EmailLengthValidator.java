package SpringProject._Spring.validation.customAnnotations.authentication.email.email;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailLengthValidator implements ConstraintValidator<EmailLength,String> {

    public static final int minLength = 11;
    public static final int maxLength = 50;

        @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        return email == null || // allow null, because we already have @NotNull checking it, and we want to show that message on receiving a null instead of the one this is associated with
                email.trim().length() >= minLength &&
                        email.length() <= maxLength;    }
}
