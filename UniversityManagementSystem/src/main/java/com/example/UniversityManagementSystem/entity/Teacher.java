package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.Cast;
import com.example.UniversityManagementSystem.entity.type.Gender;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private String image;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated
    private Cast cast;

    private String aadharNumber;
    private String panNumber;
    private String employeeId;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private Address address;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private College college;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private Parent parent;

    @OneToOne(mappedBy = "hodTeacher")
    private Department departmentHod;

    @ManyToOne
    private Department department;

    @OneToMany(mappedBy = "classTeacher")
    private List<Class> classTeacher=new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Teacher(Long id, String firstName, String lastName, String email, String phoneNumber,
                   LocalDate dob, String image, Gender gender, Cast cast, String aadharNumber,
                   String panNumber, String employeeId, Address address, User user, College college,
                   Parent parent, Department departmentHod,List<Class> classTeacher, Department department, LocalDateTime createdAt,
                   LocalDateTime updatedAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.image = image;
        this.gender = gender;
        this.cast = cast;
        this.aadharNumber = aadharNumber;
        this.panNumber = panNumber;
        this.employeeId = employeeId;
        this.address = address;
        this.user = user;
        this.classTeacher=classTeacher;
        this.college = college;
        this.parent = parent;
        this.departmentHod = departmentHod;
        this.department = department;

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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

    public College getCollege() {
        return college;
    }

    public void setCollege(College college) {
        this.college = college;
    }

    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
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

    public Department getDepartmentHod() {
        return departmentHod;
    }

    public void setDepartmentHod(Department departmentHod) {
        this.departmentHod = departmentHod;
    }

    public List<Class> getClassTeacher() {
        return classTeacher;
    }

    public void setClassTeacher(List<Class> classTeacher) {
        this.classTeacher = classTeacher;
    }
}
