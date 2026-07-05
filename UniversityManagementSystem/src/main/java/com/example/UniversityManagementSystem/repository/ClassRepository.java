package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Class;
import com.example.UniversityManagementSystem.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class, Long> {
    Page<Class> findByDepartment(Department department, Pageable pageable);
}