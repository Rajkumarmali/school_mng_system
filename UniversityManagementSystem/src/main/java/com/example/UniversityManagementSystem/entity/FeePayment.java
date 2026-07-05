package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.PaymentMode;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class FeePayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private PaymentMode paymentMode;
    private String transactionId;

    @ManyToOne
    private Student student;

    @ManyToOne
    private FeeStructure feeStructure;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FeePayment() {
    }

    public FeePayment(Long id, Double amount, PaymentMode paymentMode, String transactionId, Student student,
                      FeeStructure feeStructure, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.transactionId = transactionId;
        this.student = student;
        this.feeStructure = feeStructure;
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

    public PaymentMode getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(PaymentMode paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public FeeStructure getFeeStructure() {
        return feeStructure;
    }

    public void setFeeStructure(FeeStructure feeStructure) {
        this.feeStructure = feeStructure;
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
}
