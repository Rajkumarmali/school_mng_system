package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;


public interface UserServices {
   public UserResponse getUserProfile(String email);
   public UserResponse updateUser(String email,UpdateUserRequest dto);
}
