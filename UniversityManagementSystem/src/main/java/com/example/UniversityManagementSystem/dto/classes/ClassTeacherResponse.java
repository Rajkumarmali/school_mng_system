package com.example.UniversityManagementSystem.dto.classes;

import java.io.Serializable;

public class ClassTeacherResponse implements Serializable {

    private String name;
    private String email;
    private String phoneNumber;
    private String employeeId;

    public ClassTeacherResponse(String name, String email, String phoneNumber, String employeeId) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.employeeId = employeeId;
    }

    public ClassTeacherResponse() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
}
