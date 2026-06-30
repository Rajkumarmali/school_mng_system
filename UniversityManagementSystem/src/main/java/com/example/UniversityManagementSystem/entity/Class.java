package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String acedamicYear;
    private String semester;

    @ManyToOne
    private Department department;

    @OneToOne
    private Teacher classTeacher;

    @OneToMany(mappedBy = "aclass")
    List<StudentClass> studentClassList = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Class() {
    }

    public Class(Long id, String name, String acedamicYear, String semester, Department department,
                 Teacher classTeacher, List<StudentClass> studentClassList, LocalDateTime createdAt,
                 LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.acedamicYear = acedamicYear;
        this.semester = semester;
        this.department = department;
        this.classTeacher = classTeacher;
        this.studentClassList = studentClassList;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public String getAcedamicYear() {
        return acedamicYear;
    }

    public void setAcedamicYear(String acedamicYear) {
        this.acedamicYear = acedamicYear;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Teacher getClassTeacher() {
        return classTeacher;
    }

    public void setClassTeacher(Teacher classTeacher) {
        this.classTeacher = classTeacher;
    }

    public List<StudentClass> getStudentClassList() {
        return studentClassList;
    }

    public void setStudentClassList(List<StudentClass> studentClassList) {
        this.studentClassList = studentClassList;
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
