package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.entities.File;
import com.skr.virtuallibrary.services.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/files")
@Tag(name = "Files", description = "Files management APIs")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @Operation(summary = "Get image by id")
    @GetMapping("/image/{id}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable String id) {
        return getFile(id, "image/png");
    }

    @Operation(summary = "Get book content by id")
    @GetMapping("/content/{id}")
    public ResponseEntity<ByteArrayResource> getBookContent(@PathVariable String id) {
        return getFile(id, "application/pdf");
    }

    @Operation(summary = "Get image file name by id")
    @GetMapping("/image/{id}/filename")
    public String getImageFilename(@PathVariable String id) {
        return fileService.getFilename(id);
    }

    @Operation(summary = "Get book content file name by id")
    @GetMapping("/content/{id}/filename")
    public String getBookContentFilename(@PathVariable String id) {
        return fileService.getFilename(id);
    }

    private ResponseEntity<ByteArrayResource> getFile(String id, String expectedContentType) {
        File file = fileService.getFile(id, expectedContentType);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(file.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(new ByteArrayResource(file.getFile()));
    }

}
