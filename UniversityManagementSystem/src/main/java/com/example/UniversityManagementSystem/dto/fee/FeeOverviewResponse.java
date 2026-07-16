package com.example.UniversityManagementSystem.dto.fee;

import java.io.Serializable;

public class FeeOverviewResponse implements Serializable {
    private Double totalFee;
    private Double totalPaidFee;
    private Double totalPendingFee;

    public FeeOverviewResponse() {
    }

    public Double getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(Double totalFee) {
        this.totalFee = totalFee;
    }

    public Double getTotalPaidFee() {
        return totalPaidFee;
    }

    public void setTotalPaidFee(Double totalPaidFee) {
        this.totalPaidFee = totalPaidFee;
    }

    public Double getTotalPendingFee() {
        return totalPendingFee;
    }

    public void setTotalPendingFee(Double totalPendingFee) {
        this.totalPendingFee = totalPendingFee;
    }
}
