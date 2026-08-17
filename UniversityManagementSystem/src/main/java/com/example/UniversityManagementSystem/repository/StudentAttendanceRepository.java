package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.StudentAttendance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Long> {
    StudentAttendance findByStudentSubjectIdAndDate(Long studentSubjectId, LocalDate date);
    Page<StudentAttendance> findByStudentSubjectId(Long studentSubjectId, Pageable pageable);
}