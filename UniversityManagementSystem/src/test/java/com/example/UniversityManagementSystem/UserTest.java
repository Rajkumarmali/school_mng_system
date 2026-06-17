package com.example.UniversityManagementSystem;

import com.example.UniversityManagementSystem.entity.Tenant;
import com.example.UniversityManagementSystem.services.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserTest {

    @Autowired
    private AuthService authService;


    @Test
    public void testCreateUser(){
        Tenant tenant = new Tenant();
        authService.createUser("email@gmail.com",null,"ADMIN");
    }
}
