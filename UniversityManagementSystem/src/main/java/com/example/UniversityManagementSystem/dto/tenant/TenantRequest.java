package com.example.UniversityManagementSystem.dto.tenant;

public class TenantRequest {
    private String tenantName;
    private String email;

    public TenantRequest() {
    }

    public TenantRequest(String tenantName, String email) {
        this.tenantName = tenantName;
        this.email = email;
    }

    public String getTenantName() {
        return tenantName;
    }

    public void setTenantName(String tenantName) {
        this.tenantName = tenantName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
