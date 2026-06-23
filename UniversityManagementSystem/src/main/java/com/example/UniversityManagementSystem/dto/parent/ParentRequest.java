package com.example.UniversityManagementSystem.dto.parent;

public class ParentRequest {
    private String fatherName;
    private String fatherNumber;
    private String fatherOccupation;

    private String motherName;
    private String motherNumber;
    private String motherOccupation;

    public ParentRequest(String fatherName, String fatherNumber, String fatherOccupation, String motherName,
                         String motherNumber, String motherOccupation) {
        this.fatherName = fatherName;
        this.fatherNumber = fatherNumber;
        this.fatherOccupation = fatherOccupation;
        this.motherName = motherName;
        this.motherNumber = motherNumber;
        this.motherOccupation = motherOccupation;
    }

    public ParentRequest() {
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getFatherNumber() {
        return fatherNumber;
    }

    public void setFatherNumber(String fatherNumber) {
        this.fatherNumber = fatherNumber;
    }

    public String getFatherOccupation() {
        return fatherOccupation;
    }

    public void setFatherOccupation(String fatherOccupation) {
        this.fatherOccupation = fatherOccupation;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getMotherNumber() {
        return motherNumber;
    }

    public void setMotherNumber(String motherNumber) {
        this.motherNumber = motherNumber;
    }

    public String getMotherOccupation() {
        return motherOccupation;
    }

    public void setMotherOccupation(String motherOccupation) {
        this.motherOccupation = motherOccupation;
    }
}
