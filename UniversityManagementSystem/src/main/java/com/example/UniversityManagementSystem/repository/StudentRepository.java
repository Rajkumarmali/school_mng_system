package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}