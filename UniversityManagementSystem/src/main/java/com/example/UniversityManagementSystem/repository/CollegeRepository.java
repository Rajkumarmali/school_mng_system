package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Class;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollegeRepository extends JpaRepository<College, Long> {
}