package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.auth.AuthRequest;
import com.example.UniversityManagementSystem.dto.auth.AuthResponse;
import com.example.UniversityManagementSystem.dto.auth.ResetPasswordRequest;
import com.example.UniversityManagementSystem.entity.Roles;
import com.example.UniversityManagementSystem.entity.Tenant;

public interface AuthService {
    public AuthResponse login(AuthRequest dto);
    public Void createUser(String email, Tenant tenant, String roles);
    public Void updatePassword(String email, ResetPasswordRequest dto);
}
