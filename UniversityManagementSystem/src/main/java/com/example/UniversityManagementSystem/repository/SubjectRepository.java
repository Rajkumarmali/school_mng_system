package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Page<Subject> findByCourseId(Long courseId, Pageable pageable);
}