package SpringProject._Spring.validation.customAnnotations.authentication.lastName;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LNameLengthValidator.class)
public @interface LNameLength {

    String message() default "Your last name must be between " +
            LNameLengthValidator.minLength + " and " +
            LNameLengthValidator.maxLength + " characters long!";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
