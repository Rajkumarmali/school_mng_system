package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.StudentFeeStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class StudentFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StudentFeeStatus status;

    @ManyToOne
    private FeeStructure feeStructure;

    @ManyToOne
    private Student student;

    @OneToOne
    private FeePayment feePayment;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StudentFee() {
    }

    public StudentFee(Long id, StudentFeeStatus status, FeeStructure feeStructure, Student student, FeePayment feePayment,
                      LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.status = status;
        this.feeStructure = feeStructure;
        this.student = student;
        this.feePayment = feePayment;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StudentFeeStatus getStatus() {
        return status;
    }

    public void setStatus(StudentFeeStatus status) {
        this.status = status;
    }

    public FeeStructure getFeeStructure() {
        return feeStructure;
    }

    public void setFeeStructure(FeeStructure feeStructure) {
        this.feeStructure = feeStructure;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
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

    public FeePayment getFeePayment() {
        return feePayment;
    }

    public void setFeePayment(FeePayment feePayment) {
        this.feePayment = feePayment;
    }
}
