package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Long> {
}