package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.ExamQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, Long> {
    @EntityGraph(attributePaths = {"questionOptions"})
    Page<ExamQuestion> findByExamId(Long examId, Pageable pageable);

    List<ExamQuestion> findByExamId(Long examId);
}