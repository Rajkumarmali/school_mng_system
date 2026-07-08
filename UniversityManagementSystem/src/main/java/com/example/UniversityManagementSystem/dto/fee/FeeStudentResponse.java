package com.example.UniversityManagementSystem.dto.fee;

import com.example.UniversityManagementSystem.entity.type.Gender;
import com.example.UniversityManagementSystem.entity.type.StudentFeeStatus;

public class FeeStudentResponse {
    private Long id;

    private String name;
    private String email;
    private String registrationNumber;
    private String phoneNumber;
    private Gender gender;

    private String feeTypename;
    private Double amount;
    private StudentFeeStatus status;
    private String academicYear;
    private String classCode;
    private String className;
    private String departmentCode;
    private String departmentName;

    public FeeStudentResponse() {
    }

    public FeeStudentResponse(Long id, String name, String email, String registrationNumber, String phoneNumber,
                              Gender gender, String feeTypename, Double amount, StudentFeeStatus status, String academicYear, String classCode, String className,
                              String departmentCode, String departmentName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.registrationNumber = registrationNumber;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.feeTypename = feeTypename;
        this.amount = amount;
        this.status = status;
        this.academicYear = academicYear;
        this.classCode = classCode;
        this.className = className;
        this.departmentCode = departmentCode;
        this.departmentName = departmentName;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
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

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public StudentFeeStatus getStatus() {
        return status;
    }

    public void setStatus(StudentFeeStatus status) {
        this.status = status;
    }

    public String getFeeTypename() {
        return feeTypename;
    }

    public void setFeeTypename(String feeTypename) {
        this.feeTypename = feeTypename;
    }
}
