package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.auth.AuthRequest;
import com.example.UniversityManagementSystem.dto.auth.AuthResponse;

public interface AuthService {
    public AuthResponse login(AuthRequest dto);
}
