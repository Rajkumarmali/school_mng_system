package com.example.UniversityManagementSystem.dto.university;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;

import java.io.Serializable;

public class UniversityResponse implements Serializable {
    private Long id;
    private String name;
    private String shortName;
    private String universityCode;
    private String email;
    private String phoneNumber;
    private Integer totalStudent;
    private Integer totalDepartment;
    private Integer totalTeacher;
    private AddressResponse addressResponse;

    public UniversityResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getUniversityCode() {
        return universityCode;
    }

    public void setUniversityCode(String universityCode) {
        this.universityCode = universityCode;
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

    public AddressResponse getAddressResponse() {
        return addressResponse;
    }

    public void setAddressResponse(AddressResponse addressResponse) {
        this.addressResponse = addressResponse;
    }

    public Integer getTotalStudent() {
        return totalStudent;
    }

    public void setTotalStudent(Integer totalStudent) {
        this.totalStudent = totalStudent;
    }

    public Integer getTotalDepartment() {
        return totalDepartment;
    }

    public void setTotalDepartment(Integer totalDepartment) {
        this.totalDepartment = totalDepartment;
    }

    public Integer getTotalTeacher() {
        return totalTeacher;
    }

    public void setTotalTeacher(Integer totalTeacher) {
        this.totalTeacher = totalTeacher;
    }
}
