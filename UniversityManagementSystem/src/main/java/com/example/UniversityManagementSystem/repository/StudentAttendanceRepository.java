package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Long> {
    StudentAttendance findByStudentSubjectIdAndDate(Long studentSubjectId, LocalDate date);
}