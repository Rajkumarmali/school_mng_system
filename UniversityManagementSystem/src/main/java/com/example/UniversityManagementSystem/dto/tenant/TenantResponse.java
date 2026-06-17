package com.example.UniversityManagementSystem.dto.tenant;

public class TenantResponse {
    private Long id;
   private String tenantName;

    public TenantResponse() {
    }

    public TenantResponse(Long id, String tenantName) {
        this.id = id;
        this.tenantName = tenantName;
    }

    public String getTenantName() {
        return tenantName;
    }

    public void setTenantName(String tenantName) {
        this.tenantName = tenantName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
