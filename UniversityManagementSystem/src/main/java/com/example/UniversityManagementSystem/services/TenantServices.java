package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.tenant.TenantRequest;
import com.example.UniversityManagementSystem.dto.tenant.TenantResponse;
import com.example.UniversityManagementSystem.entity.College;

import java.util.List;

public interface TenantServices {
   public College createTenant(TenantRequest dto);
   public TenantResponse updateTenant(TenantRequest dto, Long id);
   public List<TenantResponse> getAllTenant();
   public TenantResponse getTenantById(Long id);
}
