package com.skr.virtuallibrary.mapping;

import com.skr.virtuallibrary.dto.*;
import com.skr.virtuallibrary.entities.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface ModelMapper {

    @Mapping(target = "authorList", source = "authorDtoList")
    @Mapping(target = "genreList", source = "genreDtoList")
    BookDto toBookDto(Book book, List<AuthorDto> authorDtoList, List<GenreDto> genreDtoList);

    Book toBookEntity(BookDto bookDto);

    AuthorDto toAuthorDto(Author author);

    Author toAuthorEntity(AuthorDto authorDto);

    GenreDto toGenreDto(Genre genre);

    Genre toGenreEntity(GenreDto genreDto);

    UserDto toUserDto(User user);

    User toUserEntity(UserDto userDto);

    @Mapping(target = "created", source = "auditData.createdDate")
    @Mapping(target = "lastModified", source = "auditData.lastModifiedDate")
    ReviewDto toReviewDto(Review review);

    @Mapping(target = "auditData.createdDate", source = "created")
    @Mapping(target = "auditData.lastModifiedDate", source = "lastModified")
    Review toReviewEntity(ReviewDto reviewDto);

}
