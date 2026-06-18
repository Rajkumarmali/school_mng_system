package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;

import java.util.List;


public interface UserServices {
   public UserResponse getUserProfile(Long userId);
   public UserResponse updateUser(Long userId,UpdateUserRequest dto);
   public List<UserResponse> getAllUsers();
}
