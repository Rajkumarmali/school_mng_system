package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentUniversityExam;
import com.example.UniversityManagementSystem.entity.StudentUniversityExamSubject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentUniversityExamRepository extends JpaRepository<StudentUniversityExam, Long> {

    Page<StudentUniversityExam> findByUniversityExamId(Long universityExamId, Pageable pageable);

    Page<StudentUniversityExam> findByStudentUserId(Long userId, Pageable pageable);

}