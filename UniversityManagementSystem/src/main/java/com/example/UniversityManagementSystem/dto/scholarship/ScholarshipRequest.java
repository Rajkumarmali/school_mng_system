package com.example.UniversityManagementSystem.dto.scholarship;

import com.example.UniversityManagementSystem.entity.type.ScholarshipStatus;

public class ScholarshipRequest {
    private String name;
    private String description;
    private ScholarshipStatus status;
    private Double scholarshipPercent;

    public ScholarshipRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getScholarshipPercent() {
        return scholarshipPercent;
    }

    public void setScholarshipPercent(Double scholarshipPercent) {
        this.scholarshipPercent = scholarshipPercent;
    }

    public ScholarshipStatus getStatus() {
        return status;
    }

    public void setStatus(ScholarshipStatus status) {
        this.status = status;
    }
}
