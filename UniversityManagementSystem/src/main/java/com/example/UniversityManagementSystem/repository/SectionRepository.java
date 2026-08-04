package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Section;
import com.example.UniversityManagementSystem.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, Long> {

    Page<Section> findByDepartmentCollegeId(Long collegeId, Pageable pageable);

    Page<Section> findByDepartment(Department department, Pageable pageable);

    Section findByCode(String classCode);
}