package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class FeeStructure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String academicYear;

    @ManyToOne
    private Department department;

    private String Description;

    @ManyToOne
    private FeeType feeType;

    @ManyToOne
    private Class aClass;

    @OneToMany(mappedBy = "feeStructure")
    private List<StudentFee> studentFees = new ArrayList<>();

    @OneToMany(mappedBy = "feeStructure")
    private List<FeePayment> feePayments=new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FeeStructure() {
    }

    public FeeStructure(Long id, Double amount, String academicYear, Department department, String description, FeeType feeType,
                        List<StudentFee> studentFees, List<FeePayment> feePayments, LocalDateTime createdAt,
                        LocalDateTime updatedAt) {
        this.id = id;
        this.amount = amount;
        this.academicYear = academicYear;
        this.department = department;
        Description = description;
        this.feeType = feeType;
        this.studentFees = studentFees;
        this.feePayments = feePayments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public FeeType getFeeType() {
        return feeType;
    }

    public void setFeeType(FeeType feeType) {
        this.feeType = feeType;
    }

    public List<StudentFee> getStudentFees() {
        return studentFees;
    }

    public void setStudentFees(List<StudentFee> studentFees) {
        this.studentFees = studentFees;
    }

    public List<FeePayment> getFeePayments() {
        return feePayments;
    }

    public void setFeePayments(List<FeePayment> feePayments) {
        this.feePayments = feePayments;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}
