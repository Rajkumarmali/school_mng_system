package com.example.UniversityManagementSystem;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.services.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserTest {

    @Autowired
    private AuthService authService;

   @Autowired
   private JwtProvider jwtProvider;

   @Test
   public void getTenantId(){
       Long tenantId= jwtProvider.getCollegeIdFromToken("Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3ODE4NTEzOTUsImV4cCI6MTc4MjY5NzM5NSwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6Mn0.bKsokn8rwcwTxQJrxnuWsSeW8ktJ5NX--5LC37JfZG8");
       System.out.println("TenantId "+ tenantId);
   }

    @Test
    public void getUserId(){
        Long userId=jwtProvider.getUserIdFromToken("Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3ODE4MDc0MjQsImV4cCI6MTc4MjY1MzQyNCwiZW1haWwiOiJzdXBlckBnbWFpbC5jb20iLCJ1c2VySWQiOjJ9.t-Uns915YZC9aGw9zUzTHblbj-K0OxN2VliTNyZv4c8");
        System.out.println("userId"+userId);
    }


    @Test
    public void testCreateUser(){
        College college = new College();
        authService.createUser("email@gmail.com",null,1L,"ADMIN");
    }
}
