package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.FeeStructureStatus;
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
    private LocalDateTime dueDate;

    @ManyToOne
    private College college;

    @ManyToOne
    private Department department;

    private String Description;

    @ManyToOne
    private FeeType feeType;

    @Enumerated(EnumType.STRING)
    private FeeStructureStatus status;

    @ManyToOne
    private Class aClass;

    @OneToMany(mappedBy = "feeStructure")
    private List<StudentFee> studentFees = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FeeStructure() {
    }

    public FeeStructure(Long id, Double amount, String academicYear, LocalDateTime dueDate, Department department,
                        String description, FeeType feeType, FeeStructureStatus status, Class aClass,
                        List<StudentFee> studentFees, LocalDateTime createdAt,
                        LocalDateTime updatedAt) {
        this.id = id;
        this.amount = amount;
        this.academicYear = academicYear;
        this.dueDate = dueDate;
        this.department = department;
        Description = description;
        this.feeType = feeType;
        this.status = status;
        this.aClass = aClass;
        this.studentFees = studentFees;
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

    public FeeStructureStatus getStatus() {
        return status;
    }

    public void setStatus(FeeStructureStatus status) {
        this.status = status;
    }

    public Class getaClass() {
        return aClass;
    }

    public void setaClass(Class aClass) {
        this.aClass = aClass;
    }

    public List<StudentFee> getStudentFees() {
        return studentFees;
    }

    public void setStudentFees(List<StudentFee> studentFees) {
        this.studentFees = studentFees;
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

    public College getCollege() {
        return college;
    }

    public void setCollege(College college) {
        this.college = college;
    }

    public Class getAClass() {
        return aClass;
    }

    public void setAClass(Class aClass) {
        this.aClass = aClass;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }
}
