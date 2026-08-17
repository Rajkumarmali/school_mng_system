package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentAttendance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Long> {
    Page<StudentAttendance> findByStudentSubjectId(Long studentSubjectId, Pageable pageable);
}