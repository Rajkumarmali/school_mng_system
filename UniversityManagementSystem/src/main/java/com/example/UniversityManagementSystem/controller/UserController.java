package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;
import com.example.UniversityManagementSystem.services.UserServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        Long userId = jwtProvider.getUserIdFromToken(jwt);
        UserResponse res = userServices.getUserProfile(userId);
        return new ResponseEntity<UserResponse>(res,HttpStatus.OK);
    }
    @PostMapping("/update-user")
    public ResponseEntity<UserResponse> updateUser(@RequestHeader("Authorization") String jwt, @RequestBody UpdateUserRequest dto){
        Long userId = jwtProvider.getUserIdFromToken(jwt);
        UserResponse res = userServices.updateUser(userId,dto);
        return new ResponseEntity<UserResponse>(res,HttpStatus.OK);
    }

    @GetMapping("/get-allusers")
    public ResponseEntity<List<UserResponse>> getAllUsers(@RequestHeader("Authorization") String jwt){
        Long tenantId= jwtProvider.getTenantIdFromToken(jwt);
        List<UserResponse> res = userServices.getAllUsers(tenantId);
        return new ResponseEntity<List<UserResponse>>(res,HttpStatus.OK);
    }
    @GetMapping("/get-userbyid/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id){
        UserResponse res = userServices.getUserProfile(id);
        return new ResponseEntity<UserResponse>(res,HttpStatus.OK);
    }
}
