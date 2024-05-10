package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class GenreAssignedToBookException extends ResponseStatusException {

    public GenreAssignedToBookException() {
        super(HttpStatus.BAD_REQUEST, "Genre is assigned to book(s)");
    }

}
