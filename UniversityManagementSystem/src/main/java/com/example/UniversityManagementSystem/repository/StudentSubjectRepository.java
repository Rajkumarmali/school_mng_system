package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.SectionSubject;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.StudentSubject;
import com.example.UniversityManagementSystem.entity.type.SectionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentSubjectRepository extends JpaRepository<StudentSubject, Long> {
    Boolean existsByStudentAndSectionSubject(Student student, SectionSubject sectionSubject);

    Page<StudentSubject> findBySectionSubjectId(Long sectionSubjectId, Pageable pageable);

    Page<StudentSubject> findByStudentUserIdAndSectionSubjectSectionStatus(Long userId, SectionStatus sectionStatus, Pageable pageable);

    List<StudentSubject> findByStudentUserIdAndSectionSubjectSectionStatus(Long userId, SectionStatus sectionStatus);

    List<StudentSubject> findByStudentIdAndSectionSubjectSectionId(Long studentId, Long sectionId);

    Page<StudentSubject> findByStudentIdAndSectionSubjectSectionId(Long studentId, Long sectionId,Pageable pageable);
}