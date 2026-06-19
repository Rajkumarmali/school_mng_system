package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;

    @ManyToOne
    private Tenant tenant;

    @ManyToMany
    @JoinTable(name = "user_roles",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id"))
    private List<Roles> roles = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private Teacher teacher;

    @OneToOne(mappedBy = "user")
    private Student student;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public User(Long id, String username, String email, String password, Tenant tenant, List<Roles> roles, Teacher teacher, User user, Student student, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.tenant = tenant;
        this.teacher = teacher;
        this.student = student;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.roles  = roles;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
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
}
