package com.skr.virtuallibrary.dto;

import lombok.Data;

@Data
public class PdfFile {

    private String filename;

    private String fileType;

    private String fileSize;

    private byte[] file;

}
