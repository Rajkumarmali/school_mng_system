package com.example.UniversityManagementSystem.dto.fee;

public class OrderResponse {
    private String orderId;
    private Integer amount;
    private String currency;
    private Long studentFeeId;

    public OrderResponse() {
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Long getStudentFeeId() {
        return studentFeeId;
    }

    public void setStudentFeeId(Long studentFeeId) {
        this.studentFeeId = studentFeeId;
    }
}

