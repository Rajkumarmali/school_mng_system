package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.Cast;
import com.example.UniversityManagementSystem.entity.type.Gender;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated
    private Cast cast;

    private String aadharNumber;
    private String panNumber;
    private String employeeId;

    @OneToOne
    private Address address;

    @OneToOne
    private User user;

    @ManyToOne
    private Tenant tenant;

    @OneToOne
    private Parent parent;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Teacher(String phoneNumber, Long id, String firstName, String lastName, String email,
                   LocalDate dob, Gender gender, Cast cast, String aadharNumber, String panNumber,
                   String employeeId, Address address, User user, Tenant tenant, Parent parent,
                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.phoneNumber = phoneNumber;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
        this.cast = cast;
        this.aadharNumber = aadharNumber;
        this.panNumber = panNumber;
        this.employeeId = employeeId;
        this.address = address;
        this.user = user;
        this.tenant = tenant;
        this.parent = parent;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Teacher() {
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

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
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
