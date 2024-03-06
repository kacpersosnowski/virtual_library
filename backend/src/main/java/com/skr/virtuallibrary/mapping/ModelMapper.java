package com.skr.virtuallibrary.mapping;

import com.skr.virtuallibrary.dto.*;
import com.skr.virtuallibrary.entities.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

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

    @Mapping(target = "created", source = "review.auditData.createdDate")
    @Mapping(target = "lastModified", source = "review.auditData.lastModifiedDate")
    @Mapping(target = "author", source = "user")
    @Mapping(target = "id", source = "review.id")
    ReviewDto toReviewDto(Review review, User user);

    @Mapping(target = "auditData.createdDate", source = "created")
    @Mapping(target = "auditData.lastModifiedDate", source = "lastModified")
    @Mapping(target = "authorId", source = "author.id")
    Review toReviewEntity(ReviewDto reviewDto);

}
