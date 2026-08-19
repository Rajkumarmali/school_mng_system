package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Exam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    Page<Exam> findBySectionSubjectSectionId(Long sectionId, Pageable pageable);
}