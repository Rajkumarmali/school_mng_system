package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentExamAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentExamAnswerRepository extends JpaRepository<StudentExamAnswer, Long> {
    StudentExamAnswer findByQuestionIdAndStudentExamId(Long id, Long studentExamId);

    StudentExamAnswer findByStudentExamIdAndQuestionId(Long studentExamId, Long questionId);

    List<StudentExamAnswer> findByStudentExamId(Long studentExamId);
}