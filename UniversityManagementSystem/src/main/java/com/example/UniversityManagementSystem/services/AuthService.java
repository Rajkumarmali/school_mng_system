package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.auth.AuthRequest;
import com.example.UniversityManagementSystem.dto.auth.AuthResponse;
import com.example.UniversityManagementSystem.dto.auth.ResetPasswordRequest;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.University;
import com.example.UniversityManagementSystem.entity.User;

public interface AuthService {
    public AuthResponse login(AuthRequest dto);
    public User createUser(String email, College college, Long universityId, String roles);
    public Void updatePassword(String email, ResetPasswordRequest dto);
    public void resetPassword(Long id,String password);
}
