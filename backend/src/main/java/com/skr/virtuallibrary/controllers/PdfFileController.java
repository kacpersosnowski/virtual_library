package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.PdfFile;
import com.skr.virtuallibrary.services.PdfFileService;
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
@RequestMapping("/pdf-files")
@Tag(name = "Pdf Files", description = "Pdf Files management APIs")
@RequiredArgsConstructor
public class PdfFileController {

    private final PdfFileService pdfFileService;

    @Operation(summary = "Get Pdf File by id")
    @GetMapping("/{id}")
    public ResponseEntity<ByteArrayResource> getPdfFile(@PathVariable String id) {
        PdfFile pdfFile = pdfFileService.getPdfFile(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(pdfFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pdfFile.getFilename() + "\"")
                .body(new ByteArrayResource(pdfFile.getFile()));
    }

}
