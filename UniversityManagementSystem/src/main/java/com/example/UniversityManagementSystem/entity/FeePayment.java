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
    private LocalDateTime paymentDataAndTime;
    private String receiptNumber;

    @OneToOne(mappedBy = "feePayment")
    private StudentFee studentFee;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FeePayment() {
    }

    public FeePayment(Long id, Double amount, PaymentMode paymentMode, String transactionId,
                      LocalDateTime paymentDataAndTime, String receiptNumber, StudentFee studentFee,
                      LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.transactionId = transactionId;
        this.paymentDataAndTime = paymentDataAndTime;
        this.receiptNumber = receiptNumber;
        this.studentFee = studentFee;
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

    public LocalDateTime getPaymentDataAndTime() {
        return paymentDataAndTime;
    }

    public void setPaymentDataAndTime(LocalDateTime paymentDataAndTime) {
        this.paymentDataAndTime = paymentDataAndTime;
    }


    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public StudentFee getStudentFee() {
        return studentFee;
    }

    public void setStudentFee(StudentFee studentFee) {
        this.studentFee = studentFee;
    }
}
