package SpringProject._Spring.validation.customAnnotations.password;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordRegexValidator.class)
public @interface PasswordRegex {
    String message() default "Your password must contain at least one number," +
            " one letter, and it only accepts those and the regular qwerty keyboard symbols!";
    // qwerty symbols: !"#$%&'()*+,-./:;<=>?@[\]^_{|}~`

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint


}
