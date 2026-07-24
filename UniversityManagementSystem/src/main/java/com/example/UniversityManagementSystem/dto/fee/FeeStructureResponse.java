package com.example.UniversityManagementSystem.dto.fee;

import com.example.UniversityManagementSystem.entity.type.FeeStructureStatus;

import java.io.Serializable;
import java.time.LocalDateTime;

public class FeeStructureResponse implements Serializable {
    private Long id;
    private Double amount;
    private String academicYear;
    private String description;
    private String classCode;
    private String className;
    private String departmentCode;
    private String departmentName;
    private String feeTypeName;
    private LocalDateTime dueDate;
    private FeeStructureStatus status;
    private Double totalCollectionAmount;
    private Double totalCollectedAmount;
    private Double totalPendingAmount;
    private Integer totalStudent;
    private Integer totalPaidStudent;
    private Integer totalUnPaidStudent;
    private Boolean applyScholarship;

    public FeeStructureResponse() {
    }

    public FeeStructureResponse(Long id, Double amount, String academicYear, String description, String classCode, String className, String departmentCode, String departmentName, String feeTypeName, LocalDateTime dueDate, FeeStructureStatus status, Double totalCollectionAmount, Double totalCollectedAmount, Double totalPendingAmount, Integer totalStudent, Integer totalPainStudent, Integer totalUnPaidStudent) {
        this.id = id;
        this.amount = amount;
        this.academicYear = academicYear;
        this.description = description;
        this.classCode = classCode;
        this.className = className;
        this.departmentCode = departmentCode;
        this.departmentName = departmentName;
        this.feeTypeName = feeTypeName;
        this.dueDate = dueDate;
        this.status = status;
        this.totalCollectionAmount = totalCollectionAmount;
        this.totalCollectedAmount = totalCollectedAmount;
        this.totalPendingAmount = totalPendingAmount;
        this.totalStudent = totalStudent;
        this.totalPaidStudent = totalPainStudent;
        this.totalUnPaidStudent = totalUnPaidStudent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getFeeTypeName() {
        return feeTypeName;
    }

    public void setFeeTypeName(String feeTypeName) {
        this.feeTypeName = feeTypeName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Double getTotalCollectedAmount() {
        return totalCollectedAmount;
    }

    public void setTotalCollectedAmount(Double totalCollectedAmount) {
        this.totalCollectedAmount = totalCollectedAmount;
    }

    public Integer getTotalStudent() {
        return totalStudent;
    }

    public void setTotalStudent(Integer totalStudent) {
        this.totalStudent = totalStudent;
    }

    public Integer getTotalPaidStudent() {
        return totalPaidStudent;
    }

    public void setTotalPaidStudent(Integer totalPaidStudent) {
        this.totalPaidStudent = totalPaidStudent;
    }

    public Integer getTotalUnPaidStudent() {
        return totalUnPaidStudent;
    }

    public void setTotalUnPaidStudent(Integer totalUnPaidStudent) {
        this.totalUnPaidStudent = totalUnPaidStudent;
    }

    public Double getTotalPendingAmount() {
        return totalPendingAmount;
    }

    public void setTotalPendingAmount(Double totalPendingAmount) {
        this.totalPendingAmount = totalPendingAmount;
    }

    public Double getTotalCollectionAmount() {
        return totalCollectionAmount;
    }

    public void setTotalCollectionAmount(Double totalCollectionAmount) {
        this.totalCollectionAmount = totalCollectionAmount;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public FeeStructureStatus getStatus() {
        return status;
    }

    public void setStatus(FeeStructureStatus status) {
        this.status = status;
    }

    public Boolean getApplyScholarship() {
        return applyScholarship;
    }

    public void setApplyScholarship(Boolean applyScholarship) {
        this.applyScholarship = applyScholarship;
    }
}
