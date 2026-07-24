package com.example.UniversityManagementSystem.dto.student;

import com.example.UniversityManagementSystem.entity.type.DocumentType;

public class DocumentRequest {
    private DocumentType documentType;
    private String documentName;

    public DocumentRequest() {
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
}
