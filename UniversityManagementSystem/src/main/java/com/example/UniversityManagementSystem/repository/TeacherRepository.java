package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByTenantId(Long tenantId);
}