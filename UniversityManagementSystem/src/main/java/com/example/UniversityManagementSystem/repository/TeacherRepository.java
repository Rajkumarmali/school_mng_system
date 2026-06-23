package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}