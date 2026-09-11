package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentExam;
import com.example.UniversityManagementSystem.entity.type.ExamStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentExamRepository extends JpaRepository<StudentExam, Long> {
    Page<StudentExam> findByExamId(Long examId, Pageable pageable);

    List<StudentExam> findByExamId(Long examId, Sort sort);

    Page<StudentExam> findByStudentUserIdAndExamStatusNot(Long userId, ExamStatus examStatus, Pageable pageable);

    List<StudentExam> findByStudentUserId(Long userId);

    Page<StudentExam> findByStudentUserIdAndExamStatus(Long userId, ExamStatus examStatus, Pageable pageable);
}