package com.example.UniversityManagementSystem.dto.course;

import com.example.UniversityManagementSystem.entity.type.CourseDurationType;

public class CourseRequest {
    private String name;
    private String shortName;
    private Float duration;
    private CourseDurationType courseDurationType;
    private String description;

    public CourseRequest() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
