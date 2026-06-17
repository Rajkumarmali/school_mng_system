package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.tenant.TenantRequest;
import com.example.UniversityManagementSystem.dto.tenant.TenantResponse;
import com.example.UniversityManagementSystem.entity.Tenant;

import java.util.List;

public interface TenantServices {
   public Tenant createTenant(TenantRequest dto);
   public TenantResponse updateTenant(TenantRequest dto, Long id);
   public List<TenantResponse> getAllTenant();
}
