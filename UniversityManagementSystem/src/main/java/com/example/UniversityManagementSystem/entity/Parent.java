package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Parent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fatherName;
    private String fatherNumber;
    private String fatherOccupation;

    private String motherName;
    private String motherNumber;
    private String motherOccupation;

    @OneToOne(mappedBy = "parent")
    private Teacher teacher;

    @OneToOne(mappedBy = "parent")
    private Student student;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Parent(Long id, String fatherName, String fatherNumber, String fatherOccupation, String motherName,
                  String motherNumber, String motherOccupation, Teacher teacher, Student student,
                  LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.fatherName = fatherName;
        this.fatherNumber = fatherNumber;
        this.fatherOccupation = fatherOccupation;
        this.motherName = motherName;
        this.motherNumber = motherNumber;
        this.motherOccupation = motherOccupation;
        this.teacher = teacher;
        this.student = student;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Parent() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getFatherNumber() {
        return fatherNumber;
    }

    public void setFatherNumber(String fatherNumber) {
        this.fatherNumber = fatherNumber;
    }

    public String getFatherOccupation() {
        return fatherOccupation;
    }

    public void setFatherOccupation(String fatherOccupation) {
        this.fatherOccupation = fatherOccupation;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getMotherNumber() {
        return motherNumber;
    }

    public void setMotherNumber(String motherNumber) {
        this.motherNumber = motherNumber;
    }

    public String getMotherOccupation() {
        return motherOccupation;
    }

    public void setMotherOccupation(String motherOccupation) {
        this.motherOccupation = motherOccupation;
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
