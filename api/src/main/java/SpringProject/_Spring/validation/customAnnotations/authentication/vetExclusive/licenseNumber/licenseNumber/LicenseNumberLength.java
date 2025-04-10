package SpringProject._Spring.validation.customAnnotations.authentication.vetExclusive.licenseNumber.licenseNumber;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LicenseNumberLengthValidator.class)
public @interface LicenseNumberLength {
    String message() default "Your license number can't be longer than " +
            LicenseNumberLengthValidator.maxLength + " characters!";

    Class<?>[] groups() default {}; //required for @Constraint

    Class<? extends Payload>[] payload() default {}; //required for @Constraint
}
