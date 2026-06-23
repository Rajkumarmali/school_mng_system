package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}