package com.skr.virtuallibrary.services;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.skr.virtuallibrary.dto.PdfFile;
import com.skr.virtuallibrary.exceptions.IncorrectContentTypeException;
import com.skr.virtuallibrary.exceptions.InternalException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PdfFileService {

    private final GridFsTemplate gridFsTemplate;

    private final GridFsOperations gridFsOperations;

    public String addPdfFile(MultipartFile upload) {
        if (!Objects.equals(upload.getContentType(), "application/pdf")) {
            throw new IncorrectContentTypeException("Incorrect content type: " + upload.getContentType());
        }
        try {
            DBObject metadata = new BasicDBObject();
            metadata.put("fileSize", upload.getSize());
            Object fileID = gridFsTemplate.store(upload.getInputStream(), upload.getOriginalFilename(), upload.getContentType(), metadata);
            return fileID.toString();
        } catch (IOException ex) {
            throw new InternalException("Error occurred while saving pdf file", ex);
        }
    }

    public PdfFile getPdfFile(String id) {
        try {
            GridFSFile gridFSFile = gridFsTemplate.findOne( new Query(Criteria.where("_id").is(id)) );
            PdfFile pdfFile = new PdfFile();
            if (gridFSFile != null && gridFSFile.getMetadata() != null) {
                pdfFile.setFilename( gridFSFile.getFilename() );
                pdfFile.setFileType( gridFSFile.getMetadata().get("_contentType").toString() );
                pdfFile.setFileSize( gridFSFile.getMetadata().get("fileSize").toString() );
                pdfFile.setFile( IOUtils.toByteArray(gridFsOperations.getResource(gridFSFile).getInputStream()) );
            }
            return pdfFile;
        } catch (IOException ex) {
            throw new InternalException("Error occurred while getting pdf file", ex);
        }
    }

}
