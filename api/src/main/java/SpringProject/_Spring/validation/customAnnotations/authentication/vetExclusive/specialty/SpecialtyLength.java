package SpringProject._Spring.validation.customAnnotations.authentication.vetExclusive.specialty;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SpecialtyLengthValidator.class)
public @interface SpecialtyLength {
    String message() default "Specialty can not be longer than " +
            SpecialtyLengthValidator.maxLength + " characters!";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
