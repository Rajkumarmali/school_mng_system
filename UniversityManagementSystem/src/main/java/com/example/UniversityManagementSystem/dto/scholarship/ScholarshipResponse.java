package com.example.UniversityManagementSystem.dto.scholarship;

import com.example.UniversityManagementSystem.entity.type.ScholarshipStatus;

import java.io.Serializable;

public class ScholarshipResponse implements Serializable {
    private Long id;
    private String name;
    private String code;
    private String description;
    private ScholarshipStatus status;
    private Double scholarshipPercent;
    private Integer totalStudent;

    public ScholarshipResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public Integer getTotalStudent() {
        return totalStudent;
    }

    public void setTotalStudent(Integer totalStudent) {
        this.totalStudent = totalStudent;
    }
}
