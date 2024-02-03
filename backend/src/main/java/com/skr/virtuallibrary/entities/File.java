package com.skr.virtuallibrary.entities;

import lombok.Data;

@Data
public class File {

    private String filename;

    private String fileType;

    private String fileSize;

    private byte[] file;

}
