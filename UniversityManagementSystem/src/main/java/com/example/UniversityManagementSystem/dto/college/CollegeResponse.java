package com.example.UniversityManagementSystem.dto.college;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import java.io.Serializable;

public class CollegeResponse implements Serializable {
    private Long id;
    private String name;
    private String shortName;
    private String email;
    private String phoneNumber;
    private String collegeCode;
    private Integer totalStudent;
    private Integer totalFaculty;
    private Integer totalDepartment;
    private Integer totalCourse;
    private AddressResponse addressResponse;

    public CollegeResponse(Long id, String name, String shortName, String email, String phoneNumber, String collegeCode,
                           AddressResponse addressResponse) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.collegeCode = collegeCode;
        this.addressResponse = addressResponse;
    }

    public CollegeResponse() {
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

    public String getCollegeCode() {
        return collegeCode;
    }

    public void setCollegeCode(String collegeCode) {
        this.collegeCode = collegeCode;
    }

    public Integer getTotalStudent() {
        return totalStudent;
    }

    public void setTotalStudent(Integer totalStudent) {
        this.totalStudent = totalStudent;
    }

    public Integer getTotalFaculty() {
        return totalFaculty;
    }

    public void setTotalFaculty(Integer totalFaculty) {
        this.totalFaculty = totalFaculty;
    }

    public Integer getTotalDepartment() {
        return totalDepartment;
    }

    public void setTotalDepartment(Integer totalDepartment) {
        this.totalDepartment = totalDepartment;
    }

    public Integer getTotalCourse() {
        return totalCourse;
    }

    public void setTotalCourse(Integer totalCourse) {
        this.totalCourse = totalCourse;
    }
}
