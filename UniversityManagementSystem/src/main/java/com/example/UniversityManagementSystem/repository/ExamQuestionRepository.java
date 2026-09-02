package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.ExamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, Long> {
}