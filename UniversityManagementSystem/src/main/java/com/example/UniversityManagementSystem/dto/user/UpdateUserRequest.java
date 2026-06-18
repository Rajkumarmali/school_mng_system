package com.example.UniversityManagementSystem.dto.user;

public class UpdateUserRequest {
    private String email;
    private String userName;

    public UpdateUserRequest() {
    }

    public UpdateUserRequest(String email, String userName) {
        this.email = email;
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
