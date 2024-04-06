package com.skr.virtuallibrary.exceptions;

public class BookListAlreadyExistsException extends AlreadyExistsException {
    public BookListAlreadyExistsException(String message) {
        super(String.format("Book list with name: %s already exists.", message));
    }
}
