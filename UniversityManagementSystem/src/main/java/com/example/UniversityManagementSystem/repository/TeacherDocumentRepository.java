package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.TeacherDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherDocumentRepository extends JpaRepository<TeacherDocument, Long> {
}