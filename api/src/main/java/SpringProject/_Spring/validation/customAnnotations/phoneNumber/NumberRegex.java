package SpringProject._Spring.validation.customAnnotations.phoneNumber;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NumberRegexValidator.class)
public @interface NumberRegex {

    String message() default "Your phone number must only be numbers and dashes!";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
