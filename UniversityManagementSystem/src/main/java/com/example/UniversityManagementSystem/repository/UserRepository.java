package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailOrUsername(String email,String username);

    User findByEmail(String email);

    Page<User> findByCollegeId(Long collegeId, Pageable pageable);
}