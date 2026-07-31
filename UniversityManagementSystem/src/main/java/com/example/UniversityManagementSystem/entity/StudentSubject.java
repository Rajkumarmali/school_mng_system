package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class StudentSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private SectionSubject sectionSubject;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StudentSubject() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public SectionSubject getSectionSubject() {
        return sectionSubject;
    }

    public void setSectionSubject(SectionSubject sectionSubject) {
        this.sectionSubject = sectionSubject;
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
