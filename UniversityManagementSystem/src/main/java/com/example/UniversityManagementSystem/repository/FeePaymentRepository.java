package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.FeePayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {
}