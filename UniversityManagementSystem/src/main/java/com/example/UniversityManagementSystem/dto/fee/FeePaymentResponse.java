package com.example.UniversityManagementSystem.dto.fee;


import java.io.Serializable;
import java.time.LocalDateTime;

public class FeePaymentResponse implements Serializable {
    private Long id;
    private Double amount;
    private String paymentMode;
    private String transactionId;
    private LocalDateTime paymentDataAndTime;
    private String receiptNumber;

    public FeePaymentResponse() {
    }

    public FeePaymentResponse(Long id, Double amount, String paymentMode, String transactionId,
                              LocalDateTime paymentDataAndTime, String receiptNumber) {
        this.id = id;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.transactionId = transactionId;
        this.paymentDataAndTime = paymentDataAndTime;
        this.receiptNumber = receiptNumber;
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

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
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
}
