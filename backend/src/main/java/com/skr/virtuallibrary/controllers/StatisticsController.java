package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.services.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/stats")
@Tag(name = "Statistics", description = "Getting library's statistics APIs")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/all")
    @Operation(summary = "Get database statistics.")
    public Map<String, Long> getAllStatistics() {
        return statisticsService.getAllStatistics();
    }
}
