package com.example.UniversityManagementSystem.dto.auth;

public class AuthRequest {

    private String password;
    private String usernameOrEmail;

    public AuthRequest(String email, String username, String password, String usernameOrEmail) {
            this.password = password;
        this.usernameOrEmail = usernameOrEmail;
    }

    public AuthRequest() {
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }
}

