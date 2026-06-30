package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class, Long> {
}