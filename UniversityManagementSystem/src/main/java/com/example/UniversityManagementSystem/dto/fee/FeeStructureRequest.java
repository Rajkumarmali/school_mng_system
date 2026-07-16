package com.example.UniversityManagementSystem.dto.fee;

import com.example.UniversityManagementSystem.entity.type.FeeStructureStatus;

import java.time.LocalDateTime;

public class FeeStructureRequest {
    private Double amount;
    private String academicYear;
    private String description;
    private String classCode;
    private String departmentCode;
    private FeeStructureStatus feeStructureStatus;
    private LocalDateTime dueDate;
    private Long feeTypeId;

    public FeeStructureRequest() {
    }

    public FeeStructureRequest(Double amount, String academicYear, String description, String classCode, String departmentCode, FeeStructureStatus feeStructureStatus, LocalDateTime dueDate, Long feeTypeId) {
        this.amount = amount;
        this.academicYear = academicYear;
        this.description = description;
        this.classCode = classCode;
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

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
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
}

