package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentExam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentExamRepository extends JpaRepository<StudentExam, Long> {
    Page<StudentExam> findByExamId(Long examId, Pageable pageable);
}