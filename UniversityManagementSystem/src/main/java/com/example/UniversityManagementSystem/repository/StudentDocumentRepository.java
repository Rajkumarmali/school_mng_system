package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDocumentRepository extends JpaRepository<StudentDocument, Long> {
}