package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.FeeStructure;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeStructureRepository extends JpaRepository<FeeStructure, Long> {
    Page<FeeStructure> findByCollegeId(Long collegeId, Pageable pageable);
}