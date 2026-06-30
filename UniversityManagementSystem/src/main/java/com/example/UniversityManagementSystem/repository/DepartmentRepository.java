package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}