package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.FeePayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {

    Page<FeePayment> findByStudentFeeFeeStructureCollegeId(Long collegeId, Pageable pageable);
}