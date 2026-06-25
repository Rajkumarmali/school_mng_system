package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollegeRepository extends JpaRepository<College, Long> {
}