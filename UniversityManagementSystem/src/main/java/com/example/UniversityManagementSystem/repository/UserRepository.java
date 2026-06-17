package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}