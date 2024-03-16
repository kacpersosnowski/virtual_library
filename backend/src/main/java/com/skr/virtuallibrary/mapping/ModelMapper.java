package com.skr.virtuallibrary.mapping;

import com.skr.virtuallibrary.dto.*;
import com.skr.virtuallibrary.entities.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper
public interface ModelMapper {

    @Mapping(target = "authorList", source = "authorDtoList")
    @Mapping(target = "genreList", source = "genreDtoList")
    BookDto toBookDto(Book book, List<AuthorDto> authorDtoList, List<GenreDto> genreDtoList);

    @Mapping(target = "authorList", source = "authorList", qualifiedByName = "authorListToAuthorIdList")
    @Mapping(target = "genreList", source = "genreList", qualifiedByName = "genreListToGenreIdList")
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

    @Named("authorListToAuthorIdList")
    static List<String> authorListToAuthorIdList(List<AuthorDto> authorDtos) {
        return authorDtos.stream().map(AuthorDto::getId).toList();
    }

    @Named("genreListToGenreIdList")
    static List<String> genreListToGenreIdList(List<GenreDto> genreDtos) {
        return genreDtos.stream().map(GenreDto::getId).toList();
    }
}
