package com.skr.virtuallibrary.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    private static final int MIN_LENGTH = 8;
    private static final int MAX_LENGTH = 30;

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
        // NOTE initialization not needed
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return s != null &&
                (s.length() >= MIN_LENGTH && s.length() <= MAX_LENGTH) &&
                s.matches(".*\\d.*") &&
                s.matches(".*[a-z].*") &&
                s.matches(".*[A-Z].*") &&
                s.matches(".*[\\Q!@#$%^&*()|{}[]:;\"'\\,<.>/?~`-=_+\\E].*");
    }
}
