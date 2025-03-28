package SpringProject._Spring.validation.customAnnotations.authentication.phoneNumber;

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

    String message() default "Must only be numbers and dashes, it can only start with a number or an optional plus, and can only end with a number!";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
