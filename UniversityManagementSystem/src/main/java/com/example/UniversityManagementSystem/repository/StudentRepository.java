package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByTenantId(Long tenantId);
}