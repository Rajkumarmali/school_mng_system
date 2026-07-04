package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    Page<Teacher> findByCollegeId(Long collegeId, Pageable pageable);

    Teacher findByEmailOrEmployeeId(String hodTeacherEmailOrEmplId, String hodTeacherEmailOrEmplId1);

    Teacher findByUserId(Long userId);
}