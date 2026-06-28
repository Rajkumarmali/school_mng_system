package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;
import com.example.UniversityManagementSystem.entity.User;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.UserServices;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServicesImp implements UserServices {

    private final UserRepository userRepository;

    public UserServicesImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Cacheable(cacheNames = "user",key = "#userId")
    public UserResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("User not found"));
        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setUserName(user.getUsername());
        res.setEmail(user.getEmail());
        return res;
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "user",key = "#userId"),
            @CacheEvict(cacheNames = "users",allEntries = true)
    })
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
    @Cacheable(cacheNames = "users",key="{#collegeId,#pageNumber,#pageSize}")
    public Page<UserResponse> getAllUsers(Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Page<User> users = userRepository.findByCollegeId(collegeId,pageable);
        Page<UserResponse> res = users.map(user->{
            UserResponse response = new UserResponse();
            response.setId(user.getId());
            response.setEmail(user.getEmail());
            response.setUserName(user.getUsername());
            return response;
        });

        return res;
    }
}
