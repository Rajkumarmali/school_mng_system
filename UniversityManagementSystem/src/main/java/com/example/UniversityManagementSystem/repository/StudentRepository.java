package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Class;
import com.example.UniversityManagementSystem.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Page<Student> findByCollegeId(Long collegeId, Pageable pageable);

    Student findByRegistrationNumber(String registrationNumber);

    Page<Student> findByClasses(Class clas, Pageable pageable);
}