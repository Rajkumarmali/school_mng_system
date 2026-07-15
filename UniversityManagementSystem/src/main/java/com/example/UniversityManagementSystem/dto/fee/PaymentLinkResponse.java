package com.example.UniversityManagementSystem.dto.fee;

public class PaymentLinkResponse {
    private String paymentLinkId;
    private String paymentLink;

    public PaymentLinkResponse() {
    }

    public String getPaymentLinkId() {
        return paymentLinkId;
    }

    public void setPaymentLinkId(String paymentLinkId) {
        this.paymentLinkId = paymentLinkId;
    }

    public String getPaymentLink() {
        return paymentLink;
    }

    public void setPaymentLink(String paymentLink) {
        this.paymentLink = paymentLink;
    }
}
