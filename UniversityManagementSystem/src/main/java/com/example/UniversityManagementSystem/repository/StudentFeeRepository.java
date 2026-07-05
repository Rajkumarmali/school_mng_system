package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentFee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentFeeRepository extends JpaRepository<StudentFee, Long> {
}