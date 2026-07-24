package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Class;
import com.example.UniversityManagementSystem.entity.Department;
import com.example.UniversityManagementSystem.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StudentRepository extends JpaRepository<Student, Long> {
    Page<Student> findByCollegeId(Long collegeId, Pageable pageable);

    Page<Student> findByDepartment(Department department, Pageable pageable);

    Student findByRegistrationNumber(String registrationNumber);

    Page<Student> findByClasses(Class clas, Pageable pageable);

    Student findByUserId(Long userId);

    Page<Student> findByDepartmentCourseId(Long courseId, Pageable pageable);
}