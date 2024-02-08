package com.skr.virtuallibrary.entities;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

public class AuditData {

    @CreatedBy
    private User creator;

    @CreatedDate
    private Long createdDate;

    @LastModifiedBy
    private User modifiedBy;

    @LastModifiedDate
    private Long lastModifiedDate;
}
