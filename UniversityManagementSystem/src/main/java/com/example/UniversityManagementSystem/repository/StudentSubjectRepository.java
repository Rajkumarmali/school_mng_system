package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.SectionSubject;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.StudentSubject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentSubjectRepository extends JpaRepository<StudentSubject, Long> {
    Boolean existsByStudentAndSectionSubject(Student student, SectionSubject sectionSubject);

    Page<StudentSubject> findBySectionSubjectId(Long sectionSubjectId, Pageable pageable);
}