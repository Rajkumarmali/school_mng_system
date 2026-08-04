package com.example.UniversityManagementSystem.dto.section;

import com.example.UniversityManagementSystem.entity.type.SectionStatus;

public class SectionRequest {
    private String name;
    private String academicYear;
    private Integer semester;
    private Integer year;
    private String employeeEmailOrEmployeeId;
    private SectionStatus sectionStatus;

    public SectionRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public String getEmployeeEmailOrEmployeeId() {
        return employeeEmailOrEmployeeId;
    }

    public void setEmployeeEmailOrEmployeeId(String employeeEmailOrEmployeeId) {
        this.employeeEmailOrEmployeeId = employeeEmailOrEmployeeId;
    }

    public SectionStatus getSectionStatus() {
        return sectionStatus;
    }

    public void setSectionStatus(SectionStatus sectionStatus) {
        this.sectionStatus = sectionStatus;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
