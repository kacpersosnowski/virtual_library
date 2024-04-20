package com.skr.virtuallibrary.exceptions;

public class ResetPasswordNotFoundException extends NotFoundException {
    public ResetPasswordNotFoundException() {
        super("Request for resetting password not found.");
    }
}
