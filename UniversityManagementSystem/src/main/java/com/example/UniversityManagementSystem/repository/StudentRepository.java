package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Section;
import com.example.UniversityManagementSystem.entity.Department;
import com.example.UniversityManagementSystem.entity.Scholarship;
import com.example.UniversityManagementSystem.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StudentRepository extends JpaRepository<Student, Long> {
    Page<Student> findByCollegeId(Long collegeId, Pageable pageable);

    Page<Student> findByDepartment(Department department, Pageable pageable);

    Student findByRegistrationNumber(String registrationNumber);

    Student findByUserId(Long userId);

    Page<Student> findByScholarships(Scholarship scholarship, Pageable pageable);

    Page<Student> findByCollegeIdAndRollNumberNotNull(Long collegeId, Pageable pageable);

    Page<Student> findByCollegeIdAndRollNumberNull(Long collegeId, Pageable pageable);

    Page<Student> findByDepartmentCourseId(Long courseId, Pageable pageable);

    Page<Student> findBySections(Section section, Pageable pageable);
}