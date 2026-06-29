package com.example.UniversityManagementSystem.dto.college;

import com.example.UniversityManagementSystem.dto.address.AddressRequest;
import com.example.UniversityManagementSystem.entity.Address;

public class CollegeRequest {

    private String name;
    private String shortName;
    private String email;
    private String phoneNumber;
    private AddressRequest addressRequest;

    public CollegeRequest(String name, String shortName, String email, String phoneNumber, AddressRequest addressRequest) {
        this.name = name;
        this.shortName = shortName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.addressRequest = addressRequest;
    }

    public CollegeRequest() {
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

    public AddressRequest getAddressRequest() {
        return addressRequest;
    }

    public void setAddressRequest(AddressRequest addressRequest) {
        this.addressRequest = addressRequest;
    }
}
