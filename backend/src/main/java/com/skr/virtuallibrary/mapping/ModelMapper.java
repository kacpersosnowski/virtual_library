package com.skr.virtuallibrary.mapping;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.entities.Genre;
import org.bson.types.Binary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Base64;

@Mapper
public interface ModelMapper {

    @Mapping(source = "cover", target = "cover", qualifiedByName = "bookCoverBinaryToString")
    BookDto toBookDto(Book book);

    @Mapping(target = "cover", ignore = true)
    Book toBookEntity(BookDto bookDto);

    AuthorDto toAuthorDto(Author author);

    Author toAuthorEntity(AuthorDto authorDto);

    GenreDto toGenreDto(Genre genre);

    Genre toGenreEntity(GenreDto genreDto);

    @Named("bookCoverBinaryToString")
    static String bookCoverBinaryToString(Binary cover) {
        return Base64.getEncoder().encodeToString(cover.getData());
    }

}
