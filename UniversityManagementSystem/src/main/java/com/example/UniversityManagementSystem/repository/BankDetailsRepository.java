package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankDetailsRepository extends JpaRepository<BankDetails, Long> {
}