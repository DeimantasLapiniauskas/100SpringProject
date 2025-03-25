package SpringProject._Spring.validation.customAnnotations.authentication.email.email;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailRegexValidator.class)
public @interface EmailRegex {
    String message() default "Invalid email format, you should have at least 4 symbols before @," +
            " at least 3 after @ and before domain, domain at least 2 symbols long, and not have any consecutive @'s or .'s";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
