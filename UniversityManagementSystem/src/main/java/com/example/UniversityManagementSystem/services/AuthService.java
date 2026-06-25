package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.auth.AuthRequest;
import com.example.UniversityManagementSystem.dto.auth.AuthResponse;
import com.example.UniversityManagementSystem.dto.auth.ResetPasswordRequest;
import com.example.UniversityManagementSystem.entity.College;

public interface AuthService {
    public AuthResponse login(AuthRequest dto);
    public Void createUser(String email, College college, String roles);
    public Void updatePassword(String email, ResetPasswordRequest dto);
    public void resetPassword(Long id,String password);
}
