package com.skr.virtuallibrary.controllers.responses;

import lombok.*;
import org.springframework.data.util.Pair;

import java.util.List;

@Getter
@Setter
@Builder
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
