package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.FeeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeeTypeRepository extends JpaRepository<FeeType, Long> {
    List<FeeType> findByCollegeId(Long collegeId);
}