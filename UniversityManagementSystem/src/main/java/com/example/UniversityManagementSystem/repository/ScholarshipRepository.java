package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Scholarship;
import com.example.UniversityManagementSystem.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
    Page<Scholarship> findByCollegeId(Long collegeId, Pageable pageable);

    Page<Scholarship> findByStudents(Student student, Pageable pageable);

}