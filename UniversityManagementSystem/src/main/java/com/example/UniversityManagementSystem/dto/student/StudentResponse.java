package com.example.UniversityManagementSystem.dto.student;

import com.example.UniversityManagementSystem.dto.address.AddressRequest;
import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentRequest;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.entity.type.Cast;
import com.example.UniversityManagementSystem.entity.type.Gender;

import java.time.LocalDate;

public class StudentResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String registrationNumber;
    private String phoneNumber;
    private LocalDate dob;
    private Gender gender;
    private Cast cast;
    private String aadharNumber;
    private String image;
    private String username;
    private AddressResponse addressResponse;
    private ParentResponse parentResponse;

    public StudentResponse(Long id, String firstName, String lastName, String email, String registrationNumber,
                           String phoneNumber, LocalDate dob, Gender gender, Cast cast, String aadharNumber, String image, String username,
                           AddressResponse addressResponse, ParentResponse parentResponse) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.registrationNumber = registrationNumber;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.gender = gender;
        this.cast = cast;
        this.aadharNumber = aadharNumber;
        this.image = image;
        this.username = username;
        this.addressResponse = addressResponse;
        this.parentResponse = parentResponse;
    }

    public StudentResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Cast getCast() {
        return cast;
    }

    public void setCast(Cast cast) {
        this.cast = cast;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public AddressResponse getAddressResponse() {
        return addressResponse;
    }

    public void setAddressResponse(AddressResponse addressResponse) {
        this.addressResponse = addressResponse;
    }

    public ParentResponse getParentResponse() {
        return parentResponse;
    }

    public void setParentResponse(ParentResponse parentResponse) {
        this.parentResponse = parentResponse;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}

