package com.skr.virtuallibrary.exceptions;

public class GenreAlreadyExistsException extends AlreadyExistsException {

    public GenreAlreadyExistsException(String message) {
        super(String.format("Genre with name: %s already exists", message));
    }
}
