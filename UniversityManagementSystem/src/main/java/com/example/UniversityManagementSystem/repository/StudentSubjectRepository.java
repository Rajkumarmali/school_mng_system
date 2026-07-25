package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentSubject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentSubjectRepository extends JpaRepository<StudentSubject, Long> {
}