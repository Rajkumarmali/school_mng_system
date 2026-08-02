package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    Subject findByCode(String subjectCode);
}