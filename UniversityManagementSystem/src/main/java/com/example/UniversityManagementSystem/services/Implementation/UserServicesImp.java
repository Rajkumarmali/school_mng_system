package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;
import com.example.UniversityManagementSystem.entity.User;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.UserServices;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServicesImp implements UserServices {

    private UserRepository userRepository;

    public UserServicesImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email);
        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setUserName(user.getUsername());
        res.setEmail(user.getEmail());
        return res;
    }

    @Override
    public UserResponse updateUser(String email, UpdateUserRequest dto) {
        User user = userRepository.findByEmail(email);

        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUserName());
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);

        UserResponse res = new UserResponse();
        res.setEmail(updatedUser.getEmail());
        res.setUserName(updatedUser.getUsername());
        return res;
    }
}
