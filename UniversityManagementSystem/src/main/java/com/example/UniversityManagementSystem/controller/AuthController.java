package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.auth.AuthRequest;
import com.example.UniversityManagementSystem.dto.auth.AuthResponse;
import com.example.UniversityManagementSystem.dto.auth.ResetPasswordRequest;
import com.example.UniversityManagementSystem.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;
    private JwtProvider jwtProvider;

    public AuthController(AuthService authService, JwtProvider jwtProvider) {
        this.authService = authService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest dto){
        AuthResponse res = authService.login(dto);;
        return new ResponseEntity<AuthResponse>(res, HttpStatus.OK);
    }

    @PostMapping("/update-password")
    public ResponseEntity<Void> updatePassword(@RequestHeader("Authorization") String jwt,@RequestBody ResetPasswordRequest dto){
      if(jwt==null){
          throw new BadCredentialsException("Please login");
      }
       String email = jwtProvider.getEmailFromToken(jwt);
       authService.updatePassword(email,dto);
       return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/reset-password/{id}")
    public ResponseEntity<Void> resetPassword(@PathVariable Long id,@RequestBody ResetPasswordRequest dto){
          String password = dto.getNewPassword();
          authService.resetPassword(id,password);
         return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
