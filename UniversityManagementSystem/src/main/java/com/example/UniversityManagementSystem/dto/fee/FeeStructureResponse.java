package com.example.UniversityManagementSystem.dto.fee;

public class FeeStructureResponse {
    private Long id;
    private Double amount;
    private String academicYear;
    private String description;
    private String classCode;
    private String className;
    private String departmentCode;
    private String departmentName;
    private String feeTypeName;

    public FeeStructureResponse() {
    }

    public FeeStructureResponse(Long id, Double amount, String academicYear, String description, String classCode, String className, String departmentCode, String departmentName, String feeTypeName) {
        this.id = id;
        this.amount = amount;
        this.academicYear = academicYear;
        this.description = description;
        this.classCode = classCode;
        this.className = className;
        this.departmentCode = departmentCode;
        this.departmentName = departmentName;
        this.feeTypeName = feeTypeName;
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
}
