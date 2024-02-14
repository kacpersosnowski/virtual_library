package com.skr.virtuallibrary.services.testData;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.services.testData.records.AuthorDtoExample;
import com.skr.virtuallibrary.services.testData.records.AuthorExample;

import java.util.List;

public class AuthorTestDataBuilder {

    private AuthorTestDataBuilder() {
    }

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
        JsonResourceBuilder jsonDataBuilder = new JsonResourceBuilder();
        return jsonDataBuilder.loadModelList("services/authors.json", Author.class);
    }

    public static List<AuthorDto> exampleAuthorDtoList() {
        JsonResourceBuilder jsonDataBuilder = new JsonResourceBuilder();
        return jsonDataBuilder.loadModelList("services/authorDtos.json", AuthorDto.class);
    }
}
