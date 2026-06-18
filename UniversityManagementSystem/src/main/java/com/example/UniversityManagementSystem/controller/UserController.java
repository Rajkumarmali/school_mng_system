package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;
import com.example.UniversityManagementSystem.services.UserServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserServices userServices;
    private JwtProvider jwtProvider;

    public UserController(UserServices userServices, JwtProvider jwtProvider) {
        this.userServices = userServices;
        this.jwtProvider = jwtProvider;
    }

    @GetMapping("/user-profile")
    public ResponseEntity<UserResponse> getUserProfile(@RequestHeader("Authorization") String jwt){
        String email = jwtProvider.getEmailFromToken(jwt);
        UserResponse res = userServices.getUserProfile(email);
        return new ResponseEntity<UserResponse>(res,HttpStatus.OK);
    }
    @PostMapping("/update-user")
    public ResponseEntity<UserResponse> updateUser(@RequestHeader("Authorization") String jwt, @RequestBody UpdateUserRequest dto){
        String email = jwtProvider.getEmailFromToken(jwt);
        UserResponse res = userServices.updateUser(email,dto);
        return new ResponseEntity<UserResponse>(res,HttpStatus.OK);
    }
}
