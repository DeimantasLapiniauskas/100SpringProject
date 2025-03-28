package SpringProject._Spring.validation.customAnnotations.authentication.phoneNumber;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NumberLengthValidator.class)
public @interface NumberLength {

    String message() default "Your phone number must be between " +
            NumberLengthValidator.minLength + " and " +
            NumberLengthValidator.maxLength + " characters long!";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
