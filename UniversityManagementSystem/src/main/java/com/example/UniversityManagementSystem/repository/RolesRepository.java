package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.Roles;
import com.example.UniversityManagementSystem.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RolesRepository extends JpaRepository<Roles, Long> {
    Roles findByNameAndCollege(String role, College college);

    List<Roles> findByCollegeId(Long collegeId);
}