package SpringProject._Spring.validation.customAnnotations.email;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailLengthValidator.class)
public @interface EmailLength {

    String message() default "Password has to be between " +
            EmailLengthValidator.minLength + "and" +
            EmailLengthValidator.maxLength + "characters long!";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
