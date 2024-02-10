package com.skr.virtuallibrary.services.testData;

import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.entities.Genre;

import java.util.List;

public class GenreTestDataBuilder {

    private GenreTestDataBuilder() {
    }

    public static GenreExample genreExample() {
        String genreId = "foo";

        Genre genre = Genre.builder()
                .id(genreId)
                .name("exampleName")
                .build();

        return new GenreExample(genre);
    }

    public static GenreDtoExample genreDtoExample() {
        String genreDtoId = "foo";

        GenreDto genreDto = GenreDto.builder()
                .id(genreDtoId)
                .name("exampleName")
                .build();

        return new GenreDtoExample(genreDto);
    }

    public static GenreExample genreExampleWithoutId() {
        Genre genre = Genre.builder()
                .name("exampleName")
                .build();

        return new GenreExample(genre);
    }

    public static GenreDtoExample genreDtoExampleWithoutId() {
        GenreDto genreDto = GenreDto.builder()
                .name("exampleName")
                .build();

        return new GenreDtoExample(genreDto);
    }

    public static List<Genre> exampleGenreList() {
        JsonResourceBuilder jsonDataBuilder = new JsonResourceBuilder();
        return jsonDataBuilder.loadModelList("services/genres.json", Genre.class);
    }

    public static List<GenreDto> exampleGenreDtoList() {
        JsonResourceBuilder jsonDataBuilder = new JsonResourceBuilder();
        return jsonDataBuilder.loadModelList("services/genres.json", GenreDto.class);
    }

}
