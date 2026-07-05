package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Page<Department> findByCollegeId(Long collegeId, Pageable pageable);

    boolean existsByCode(String code);

    Department findByCode(String departmentCode);
}