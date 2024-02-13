package com.skr.virtuallibrary.exceptions;

public class AuthorAlreadyExistsException extends AlreadyExistsException {

    public AuthorAlreadyExistsException(String message) {
        super(String.format("Author with name: %s already exists", message));
    }

}
