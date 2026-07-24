package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Page<Course> findByCollegeId(Long collegeId, Pageable pageable);
    Course findByCourseCode(String courseCode);
}