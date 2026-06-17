package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Roles;
import com.example.UniversityManagementSystem.entity.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Long> {

    Roles findByNameAndTenant(String role, Tenant tenant);
}