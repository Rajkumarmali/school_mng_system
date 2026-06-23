package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;
import com.example.UniversityManagementSystem.entity.User;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.UserServices;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServicesImp implements UserServices {

    private UserRepository userRepository;

    public UserServicesImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("User not found"));
        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setUserName(user.getUsername());
        res.setEmail(user.getEmail());
        return res;
    }

    @Override
    public UserResponse updateUser(Long userId, UpdateUserRequest dto) {
        User user = userRepository.findById(userId).orElseThrow(()-> new IllegalArgumentException("User not found"));

        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUserName());
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);

        UserResponse res = new UserResponse();

        res.setId(updatedUser.getId());
        res.setEmail(updatedUser.getEmail());
        res.setUserName(updatedUser.getUsername());
        return res;
    }

    @Override
    public List<UserResponse> getAllUsers(Long tenantId) {
        List<User> users = userRepository.findByCollegeId(tenantId);
        List<UserResponse> res = users.stream().map(user->{
            UserResponse response = new UserResponse();
            response.setId(user.getId());
            response.setEmail(user.getEmail());
            response.setUserName(user.getUsername());
            return response;
        }).toList();
        return res;
    }
}
