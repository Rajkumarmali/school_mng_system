package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    private String city;
    private String district;
    private String state;
    private String country;
    private String pincode;

    @OneToOne(mappedBy = "address",fetch = FetchType.LAZY)
    private Teacher teacher;

    @OneToOne(mappedBy = "address",fetch = FetchType.LAZY)
    private Student student;

    @OneToOne(mappedBy = "address",fetch = FetchType.LAZY)
    private University university;

    @OneToOne(mappedBy = "address",fetch = FetchType.LAZY)
    private College college;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public Address(Long id, String address, String city, String district, String state, String country,
                   String pincode, Teacher teacher, Student student, LocalDateTime createdAt,
                   LocalDateTime updatedAt) {
        this.id = id;
        this.address = address;
        this.city = city;
        this.district = district;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
        this.teacher = teacher;
        this.student = student;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Address() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
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
}
