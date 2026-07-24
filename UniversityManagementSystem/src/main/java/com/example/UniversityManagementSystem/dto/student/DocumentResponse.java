package com.example.UniversityManagementSystem.dto.student;

import com.example.UniversityManagementSystem.entity.type.DocumentStatus;
import com.example.UniversityManagementSystem.entity.type.DocumentType;

import java.io.Serializable;

public class DocumentResponse implements Serializable {
    private Long id;
    private DocumentType documentType;
    private String documentName;
    private DocumentStatus status;
    private String filePath;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public DocumentResponse() {
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public DocumentStatus getStatus() {
        return status;
    }

    public void setStatus(DocumentStatus status) {
        this.status = status;
    }
}
