package com.skr.virtuallibrary.services.testData;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.entities.Author;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AuthorTestDataBuilder {

    private AuthorTestDataBuilder(){}

    public static AuthorExample authorExample() {
        String authorId = "foo";

        Author author = Author.builder()
                .id(authorId)
                .firstName("exampleName")
                .lastName("exampleLastName")
                .build();

        return new AuthorExample(author);
    }

    public static AuthorExample authorExampleWithoutId() {
        Author author = Author.builder()
                .firstName("exampleName")
                .lastName("exampleLastName")
                .build();

        return new AuthorExample(author);
    }

    public static AuthorDtoExample authorDtoExample() {
        String authorDtoId = "foo";

        AuthorDto authorDto = AuthorDto.builder()
                .id(authorDtoId)
                .firstName("exampleName")
                .lastName("exampleLastName")
                .build();

        return new AuthorDtoExample(authorDto);
    }

    public static AuthorDtoExample authorDtoExampleWithoutId() {
        AuthorDto authorDto = AuthorDto.builder()
                .firstName("exampleName")
                .lastName("exampleLastName")
                .build();

        return new AuthorDtoExample(authorDto);
    }

    public static List<Author> exampleAuthorList() {
        Author author1 = Author.builder()
                .id("id1")
                .firstName("exampleName1")
                .lastName("exampleLastName1")
                .build();
        Author author2 = Author.builder()
                .id("id2")
                .firstName("exampleName2")
                .lastName("exampleLastName3")
                .build();
        Author author3 = Author.builder()
                .id("id3")
                .firstName("exampleName3")
                .lastName("exampleLastName3")
                .build();

        return new ArrayList<>(Arrays.asList(author1, author2, author3));
    }

    public static List<AuthorDto> exampleAuthorDtoList() {
        AuthorDto authorDto1 = AuthorDto.builder()
                .id("id1")
                .firstName("exampleName1")
                .lastName("exampleLastName1")
                .build();
        AuthorDto authorDto2 = AuthorDto.builder()
                .id("id2")
                .firstName("exampleName2")
                .lastName("exampleLastName3")
                .build();
        AuthorDto authorDto3 = AuthorDto.builder()
                .id("id3")
                .firstName("exampleName3")
                .lastName("exampleLastName3")
                .build();

        return new ArrayList<>(Arrays.asList(authorDto1, authorDto2, authorDto3));
    }
}
