package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String shortName;
    private String collegeCode;
    private String email;
    private String phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    private University university;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Address address;

    @OneToMany(mappedBy = "college",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "college",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Roles> roles = new ArrayList<>();

    @OneToMany(mappedBy = "college",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Teacher> teachers = new ArrayList<>();

    @OneToMany(mappedBy = "college",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Student> students=new ArrayList<>();

    @OneToMany(mappedBy = "college")
    private List<Department> departments = new ArrayList<>();

    @OneToMany(mappedBy = "college")
    private List<FeeType> feeTypes=new ArrayList<>();

    @OneToMany(mappedBy = "college")
    private List<FeeStructure> feeStructures =new ArrayList<>();

    @OneToMany(mappedBy = "college")
    private List<Course> courses = new ArrayList<>();

    @OneToMany(mappedBy = "college")
    private List<Notification> notifications = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public College(Long id, String name, String shortName, String collegeCode, String email, String phoneNumber,
                   University university, Address address, List<User> users, List<Roles> roles,
                   List<Teacher> teachers,List<FeeType> feeTypes, List<FeeStructure> feeStructures,List<Student> students,List<Department> departments, LocalDateTime createdAt,
                   LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.collegeCode = collegeCode;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.university = university;
        this.address = address;
        this.users = users;
        this.roles = roles;
        this.teachers = teachers;
        this.students = students;
        this.departments =departments;
        this.feeTypes=feeTypes;
        this.feeStructures=feeStructures;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public College() {
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

    public String getCollegeCode() {
        return collegeCode;
    }

    public void setCollegeCode(String collegeCode) {
        this.collegeCode = collegeCode;
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

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Roles> getRoles() {
        return roles;
    }

    public void setRoles(List<Roles> roles) {
        this.roles = roles;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
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

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

    public List<FeeType> getFeeTypes() {
        return feeTypes;
    }

    public void setFeeTypes(List<FeeType> feeTypes) {
        this.feeTypes = feeTypes;
    }

    public List<FeeStructure> getFeeStructures() {
        return feeStructures;
    }

    public void setFeeStructures(List<FeeStructure> feeStructures) {
        this.feeStructures = feeStructures;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }
}
