package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private College college;

    @ManyToMany(mappedBy = "roles",fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();

    private String name;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Roles() {
    }

    public Roles(Long id, College college, List<User> users, String name, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.college = college;
        this.users = users;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public College getTenant() {
        return college;
    }

    public void setTenant(College college) {
        this.college = college;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
