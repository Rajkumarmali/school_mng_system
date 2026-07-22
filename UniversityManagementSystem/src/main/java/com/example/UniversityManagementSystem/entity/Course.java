package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.CourseDurationType;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String shortName;
    private String courseCode;
    private Float duration;

    @Enumerated(EnumType.STRING)
    private CourseDurationType courseDurationType;

    private Integer totalSemester;
    private String description;

    @ManyToOne
    private College college;

    @OneToMany(mappedBy = "course")
    private List<Department> department=new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Course() {
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

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public Float getDuration() {
        return duration;
    }

    public void setDuration(Float duration) {
        this.duration = duration;
    }

    public CourseDurationType getCourseDurationType() {
        return courseDurationType;
    }

    public void setCourseDurationType(CourseDurationType courseDurationType) {
        this.courseDurationType = courseDurationType;
    }

    public Integer getTotalSemester() {
        return totalSemester;
    }

    public void setTotalSemester(Integer totalSemester) {
        this.totalSemester = totalSemester;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public College getCollege() {
        return college;
    }

    public void setCollege(College college) {
        this.college = college;
    }

    public List<Department> getDepartment() {
        return department;
    }

    public void setDepartment(List<Department> department) {
        this.department = department;
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
