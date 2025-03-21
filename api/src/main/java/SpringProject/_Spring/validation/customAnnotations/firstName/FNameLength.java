package SpringProject._Spring.validation.customAnnotations.firstName;

import SpringProject._Spring.validation.customAnnotations.password.PasswordLengthValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordLengthValidator.class)
public @interface FNameLength {
    String message() default "Your first name must be between " +
            FNameLengthValidator.minLength + " and " +
            FNameLengthValidator.maxLength + " characters long!";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
