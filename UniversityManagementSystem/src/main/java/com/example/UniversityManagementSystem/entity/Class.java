package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.ClassStatus;
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

    @Enumerated(EnumType.STRING)
    private ClassStatus classStatus;

    @ManyToOne
    private Department department;

    @ManyToOne
    private Teacher classTeacher;

    @ManyToMany(mappedBy = "classes")
    private List<Student> students=new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Class() {
    }

    public Class(Long id, String name, String acedamicYear, String semester, ClassStatus classStatus, Department department,
                 Teacher classTeacher, List<Student> students, LocalDateTime createdAt,
                 LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.acedamicYear = acedamicYear;
        this.semester = semester;
        this.classStatus = classStatus;
        this.department = department;
        this.classTeacher = classTeacher;
        this.students = students;
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

    public ClassStatus getClassStatus() {
        return classStatus;
    }

    public void setClassStatus(ClassStatus classStatus) {
        this.classStatus = classStatus;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
