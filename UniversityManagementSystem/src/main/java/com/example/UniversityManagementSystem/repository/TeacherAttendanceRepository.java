package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.TeacherAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherAttendanceRepository extends JpaRepository<TeacherAttendance, Long> {
}