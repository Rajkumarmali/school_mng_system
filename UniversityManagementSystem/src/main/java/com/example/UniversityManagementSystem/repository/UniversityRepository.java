package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, Long> {
}