package com.skr.virtuallibrary.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class RatingValidator implements ConstraintValidator<ValidRating, Integer> {

    private static final int MIN_RATING = 1;
    private static final int MAX_RATING = 5;

    @Override
    public void initialize(ValidRating constraintAnnotation) {
        // NOTE initialization not needed
    }

    @Override
    public boolean isValid(Integer rating, ConstraintValidatorContext constraintValidatorContext) {
        return rating != null && (rating >= MIN_RATING && rating <= MAX_RATING);
    }
}
