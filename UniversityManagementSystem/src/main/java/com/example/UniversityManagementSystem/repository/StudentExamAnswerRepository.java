package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentExamAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentExamAnswerRepository extends JpaRepository<StudentExamAnswer, Long> {
}