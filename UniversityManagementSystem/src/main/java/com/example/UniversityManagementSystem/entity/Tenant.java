package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "tenant")
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "tenant")
    private List<Roles> roles = new ArrayList<>();

    @OneToMany(mappedBy = "tenant")
    private List<Teacher> teachers = new ArrayList<>();

    @OneToMany(mappedBy = "tenant")
    private List<Student> students=new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Tenant(Long id, String name,List<Teacher> teachers, List<User> users, List<Roles> roles,
                  List<Student> students,LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.users = users;
        this.roles = roles;
        this.teachers=teachers;
        this.students=students;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Tenant() {
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
}
