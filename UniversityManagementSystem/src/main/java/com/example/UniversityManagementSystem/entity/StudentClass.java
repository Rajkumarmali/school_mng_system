package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.ClassStatus;
import jakarta.persistence.*;


import java.time.LocalDateTime;

@Entity
public class StudentClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Class aclass;

    @Enumerated(EnumType.STRING)
    private ClassStatus classStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StudentClass() {
    }

    public StudentClass(Long id, Student student, Class aclass, ClassStatus classStatus, LocalDateTime createdAt,
                        LocalDateTime updatedAt) {
        this.id = id;
        this.student = student;
        this.aclass = aclass;
        this.classStatus = classStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public Class getAclass() {
        return aclass;
    }

    public void setAclass(Class aclass) {
        this.aclass = aclass;
    }

    public ClassStatus getClassStatus() {
        return classStatus;
    }

    public void setClassStatus(ClassStatus classStatus) {
        this.classStatus = classStatus;
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
