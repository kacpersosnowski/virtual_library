package com.skr.virtuallibrary.mapping;

import com.skr.virtuallibrary.dto.*;
import com.skr.virtuallibrary.entities.*;
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
