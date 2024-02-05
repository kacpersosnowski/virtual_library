package com.skr.virtuallibrary.mapping;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.entities.Genre;
import com.skr.virtuallibrary.entities.User;
import org.mapstruct.Mapper;

@Mapper
public interface ModelMapper {

    BookDto toBookDto(Book book);

    Book toBookEntity(BookDto bookDto);

    AuthorDto toAuthorDto(Author author);

    Author toAuthorEntity(AuthorDto authorDto);

    GenreDto toGenreDto(Genre genre);

    Genre toGenreEntity(GenreDto genreDto);

    UserDto toUserDto(User user);

    User toUserEntity(UserDto userDto);

}
