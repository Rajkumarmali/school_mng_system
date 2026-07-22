package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
}