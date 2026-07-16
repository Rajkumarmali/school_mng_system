package com.example.UniversityManagementSystem.dto.fee;

import com.example.UniversityManagementSystem.entity.type.StudentFeeStatus;

import java.io.Serializable;
import java.time.LocalDateTime;

public class StudentFeeResponse implements Serializable {
    private Long id;
    private String feeTypename;
    private Double amount;
    private StudentFeeStatus status;
    private String academicYear;
    private String classCode;
    private String className;
    private String departmentCode;
    private String departmentName;
    private LocalDateTime DueDate;
    private StudentResponse studentResponse;
    private FeePaymentResponse feePaymentResponse;

    public StudentFeeResponse() {
    }

    public StudentFeeResponse(Long id, StudentResponse studentResponse, String feeTypename, Double amount,
                              StudentFeeStatus status, String academicYear, String classCode, String className,
                              String departmentCode, String departmentName, LocalDateTime dueDate, FeePaymentResponse feePaymentResponse) {
        this.id = id;
        this.studentResponse = studentResponse;
        this.feeTypename = feeTypename;
        this.amount = amount;
        this.status = status;
        this.academicYear = academicYear;
        this.classCode = classCode;
        this.className = className;
        this.departmentCode = departmentCode;
        this.departmentName = departmentName;
        DueDate = dueDate;
        this.feePaymentResponse = feePaymentResponse;
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

    public FeePaymentResponse getFeePaymentResponse() {
        return feePaymentResponse;
    }

    public void setFeePaymentResponse(FeePaymentResponse feePaymentResponse) {
        this.feePaymentResponse = feePaymentResponse;
    }

    public StudentResponse getStudentResponse() {
        return studentResponse;
    }

    public void setStudentResponse(StudentResponse studentResponse) {
        this.studentResponse = studentResponse;
    }

    public LocalDateTime getDueDate() {
        return DueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        DueDate = dueDate;
    }
}
