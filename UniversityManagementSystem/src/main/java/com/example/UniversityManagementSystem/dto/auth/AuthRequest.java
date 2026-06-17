package com.example.UniversityManagementSystem.dto.auth;

public class AuthRequest {
    private String usernameOrPassword;
    private String password;

    public AuthRequest(String email, String username, String usernameOrPassword, String password) {
        this.usernameOrPassword = usernameOrPassword;

        this.password = password;
    }

    public AuthRequest() {
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsernameOrPassword() {
        return usernameOrPassword;
    }

    public void setUsernameOrPassword(String usernameOrPassword) {
        this.usernameOrPassword = usernameOrPassword;
    }
}

