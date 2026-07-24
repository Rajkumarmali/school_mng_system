package com.example.UniversityManagementSystem.dto.course;

import com.example.UniversityManagementSystem.entity.type.CourseDurationType;

import java.io.Serializable;

public class CourseResponse implements Serializable {
    private Long id;
    private String name;
    private String shortName;
    private String courseCode;
    private Float duration;
    private CourseDurationType courseDurationType;
    private Integer totalSemester;
    private String description;

    private Integer totalDepartment;
    private Integer totalStudent;

    public CourseResponse() {
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

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public Integer getTotalDepartment() {
        return totalDepartment;
    }

    public void setTotalDepartment(Integer totalDepartment) {
        this.totalDepartment = totalDepartment;
    }

    public Integer getTotalStudent() {
        return totalStudent;
    }

    public void setTotalStudent(Integer totalStudent) {
        this.totalStudent = totalStudent;
    }
}
