package com.example.UniversityManagementSystem.dto.teacher;

import com.example.UniversityManagementSystem.dto.address.AddressRequest;
import com.example.UniversityManagementSystem.dto.parent.ParentRequest;
import com.example.UniversityManagementSystem.entity.type.Cast;
import com.example.UniversityManagementSystem.entity.type.Gender;

import java.time.LocalDate;

public class TeacherRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDate dob;
    private Gender gender;
    private Cast cast;
    private String aadharNumber;
    private String panNumber;
    private String departmentCode;

   private ParentRequest parentRequest;
   private AddressRequest addressRequest;
   private BankRequest bankRequest;


    public TeacherRequest() {
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

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public ParentRequest getParentRequest() {
        return parentRequest;
    }

    public void setParentRequest(ParentRequest parentRequest) {
        this.parentRequest = parentRequest;
    }

    public AddressRequest getAddressRequest() {
        return addressRequest;
    }

    public void setAddressRequest(AddressRequest addressRequest) {
        this.addressRequest = addressRequest;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public BankRequest getBankRequest() {
        return bankRequest;
    }

    public void setBankRequest(BankRequest bankRequest) {
        this.bankRequest = bankRequest;
    }
}
