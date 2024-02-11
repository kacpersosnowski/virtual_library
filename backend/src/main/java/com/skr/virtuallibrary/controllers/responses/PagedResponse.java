package com.skr.virtuallibrary.controllers.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.util.Pair;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PagedResponse<T> {

    Long totalElements;

    List<T> content;

    public PagedResponse(Pair<Long, List<T>> pair) {
        this.totalElements = pair.getFirst();
        this.content = pair.getSecond();
    }

    public PagedResponse(List<T> list) {
        this.totalElements = (long) list.size();
        this.content = list;
    }
}
