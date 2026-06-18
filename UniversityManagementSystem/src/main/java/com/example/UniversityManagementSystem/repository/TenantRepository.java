package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
}