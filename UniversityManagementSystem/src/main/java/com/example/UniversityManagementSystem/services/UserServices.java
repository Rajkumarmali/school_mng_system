package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserServices {
    UserResponse getUserProfile(Long userId);
    UserResponse updateUser(Long userId,UpdateUserRequest dto);
    Page<UserResponse> getAllUsers(Long collegeId,int pageNumber,int pageSize);
    String updateUserImage(Long userId, MultipartFile image);
}
