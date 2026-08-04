package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Section;
import com.example.UniversityManagementSystem.entity.SectionSubject;
import com.example.UniversityManagementSystem.entity.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionSubjectRepository extends JpaRepository<SectionSubject, Long> {
    Boolean existsBySubjectAndSection(Subject subject, Section section);

    Page<SectionSubject> findBySectionId(Long sectionId, Pageable pageable);
}