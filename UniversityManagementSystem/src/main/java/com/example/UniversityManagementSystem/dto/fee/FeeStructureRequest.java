package com.example.UniversityManagementSystem.dto.fee;

import com.example.UniversityManagementSystem.entity.type.FeeStructureStatus;

import java.time.LocalDateTime;

public class FeeStructureRequest {
    private Double amount;
    private String academicYear;
    private String description;
    private String sectionCode;
    private String departmentCode;
    private FeeStructureStatus feeStructureStatus;
    private LocalDateTime dueDate;
    private Long feeTypeId;
    private FeeAssignmentType feeAssignmentType;
    private Boolean applyScholarship=false;


    public FeeStructureRequest() {
    }

    public FeeStructureRequest(Double amount, String academicYear, String description, String sectionCode, String departmentCode, FeeStructureStatus feeStructureStatus, LocalDateTime dueDate, Long feeTypeId) {
        this.amount = amount;
        this.academicYear = academicYear;
        this.description = description;
        this.sectionCode = sectionCode;
        this.departmentCode = departmentCode;
        this.feeStructureStatus = feeStructureStatus;
        this.dueDate = dueDate;
        this.feeTypeId = feeTypeId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSectionCode() {
        return sectionCode;
    }

    public void setSectionCode(String sectionCode) {
        this.sectionCode = sectionCode;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public Long getFeeTypeId() {
        return feeTypeId;
    }

    public void setFeeTypeId(Long feeTypeId) {
        this.feeTypeId = feeTypeId;
    }

    public FeeStructureStatus getFeeStructureStatus() {
        return feeStructureStatus;
    }

    public void setFeeStructureStatus(FeeStructureStatus feeStructureStatus) {
        this.feeStructureStatus = feeStructureStatus;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public FeeAssignmentType getFeeAssignmentType() {
        return feeAssignmentType;
    }

    public void setFeeAssignmentType(FeeAssignmentType feeAssignmentType) {
        this.feeAssignmentType = feeAssignmentType;
    }

    public Boolean getApplyScholarship() {
        return applyScholarship;
    }

    public void setApplyScholarship(Boolean applyScholarship) {
        this.applyScholarship = applyScholarship;
    }
}

