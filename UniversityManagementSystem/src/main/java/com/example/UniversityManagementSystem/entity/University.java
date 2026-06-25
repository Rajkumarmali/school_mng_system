package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class University {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String shortName;
    private String universityCode;
    private String email;
    private String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Address address;

    @OneToMany(mappedBy = "university",fetch = FetchType.LAZY)
    private List<College> colleges = new ArrayList<>();

    @OneToMany(mappedBy = "university",fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public University(Long id, String name, String shortName, String universityCode, String email,
                      String phoneNumber, Address address, List<College> colleges, List<User> uses,
                      LocalDateTime createdAt,
                      LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.universityCode = universityCode;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.colleges = colleges;
        this.users = uses;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public University() {
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

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<College> getColleges() {
        return colleges;
    }

    public void setColleges(List<College> colleges) {
        this.colleges = colleges;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
