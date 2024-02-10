package com.skr.virtuallibrary.services.testData;

import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.entities.Book;

import java.util.List;

public class BookTestDataBuilder {

    private BookTestDataBuilder() {
    }

    public static BookExample bookExample() {
        String bookId = "foo";

        Book book = Book.builder()
                .id(bookId)
                .title("exampleTitle")
                .authorList(List.of(AuthorTestDataBuilder.authorExample().author()))
                .shortDescription("exampleShortDescription")
                .longDescription("exampleLongDescription")
                .genreList(List.of(GenreTestDataBuilder.genreExample().genre()))
                .tagList(List.of("exampleTag", "exampleTag2"))
                .bookCoverId(null)
                .bookContentId(null)
                .build();

        return new BookExample(book);
    }

    public static BookDtoExample bookDtoExample() {
        String bookDtoId = "foo";

        BookDto bookDto = BookDto.builder()
                .id(bookDtoId)
                .title("exampleTitle")
                .authorList(List.of(AuthorTestDataBuilder.authorDtoExample().authorDto()))
                .shortDescription("exampleShortDescription")
                .longDescription("exampleLongDescription")
                .genreList(List.of(GenreTestDataBuilder.genreExample().genre()))
                .tagList(List.of("exampleTag", "exampleTag2"))
                .bookCoverId(null)
                .bookContentId(null)
                .build();

        return new BookDtoExample(bookDto);
    }

    public static BookExample bookExampleWithoutId() {
        Book book = Book.builder()
                .title("exampleTitle")
                .authorList(List.of(AuthorTestDataBuilder.authorExample().author()))
                .shortDescription("exampleShortDescription")
                .longDescription("exampleLongDescription")
                .genreList(List.of(GenreTestDataBuilder.genreExample().genre()))
                .tagList(List.of("exampleTag", "exampleTag2"))
                .bookCoverId(null)
                .bookContentId(null)
                .build();

        return new BookExample(book);
    }

    public static BookDtoExample bookDtoExampleWithoutId() {
        BookDto bookDto = BookDto.builder()
                .title("exampleTitle")
                .authorList(List.of(AuthorTestDataBuilder.authorDtoExample().authorDto()))
                .shortDescription("exampleShortDescription")
                .longDescription("exampleLongDescription")
                .genreList(List.of(GenreTestDataBuilder.genreExample().genre()))
                .tagList(List.of("exampleTag", "exampleTag2"))
                .bookCoverId(null)
                .bookContentId(null)
                .build();

        return new BookDtoExample(bookDto);
    }

    public static List<Book> exampleBookList() {
        JsonResourceBuilder jsonDataBuilder = new JsonResourceBuilder();
        return jsonDataBuilder.loadModelList("services/books.json", Book.class);
    }

    public static List<BookDto> exampleBookDtoList() {
        JsonResourceBuilder jsonDataBuilder = new JsonResourceBuilder();
        return jsonDataBuilder.loadModelList("services/bookDtos.json", BookDto.class);
    }


}
