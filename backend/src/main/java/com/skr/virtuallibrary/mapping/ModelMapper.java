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
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Base64;

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

    @Named("bookCoverBinaryToString")
    static String bookCoverBinaryToString(Binary cover) {
        if (cover != null) {
            return Base64.getEncoder().encodeToString(cover.getData());
        }
        return null;
    }

    ReviewDto toReviewDto(Review review);

    Review toReviewEntity(ReviewDto reviewDto);

}
