package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.auth.AuthRequest;
import com.example.UniversityManagementSystem.dto.auth.AuthResponse;
import com.example.UniversityManagementSystem.entity.Tenant;

public interface AuthService {
    public AuthResponse login(AuthRequest dto);
    public Void createUser(String email, Tenant tenant);
}
