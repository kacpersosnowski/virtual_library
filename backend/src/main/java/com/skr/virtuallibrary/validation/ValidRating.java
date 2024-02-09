package com.skr.virtuallibrary.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidRating {

    String message() default "Invalid rating. Must be between 1 and 5.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
