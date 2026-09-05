package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.UniversityExamSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UniversityExamSubjectRepository extends JpaRepository<UniversityExamSubject, Long> {
    List<UniversityExamSubject> findByUniversityExamId(Long universityExamId);
}