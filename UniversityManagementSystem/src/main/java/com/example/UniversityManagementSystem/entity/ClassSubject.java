package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ClassSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Class aClass;

    @ManyToOne
    private Subject subject;

    @ManyToOne
    private Teacher teacher;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ClassSubject() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Class getAClass() {
        return aClass;
    }

    public void setAClass(Class aClass) {
        this.aClass = aClass;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
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
