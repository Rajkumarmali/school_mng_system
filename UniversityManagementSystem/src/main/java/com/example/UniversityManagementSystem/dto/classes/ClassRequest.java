package com.example.UniversityManagementSystem.dto.classes;

import com.example.UniversityManagementSystem.entity.type.SectionStatus;

public class ClassRequest {
    private String name;
    private String academicYear;
    private String semester;
    private String employeeEmailOrEmployeeId;
    private SectionStatus sectionStatus;

    public ClassRequest() {
    }

    public ClassRequest(String name, String academicYear, String semester, String employeeEmailOrEmployeeId, SectionStatus sectionStatus) {
        this.name = name;
        this.academicYear = academicYear;
        this.semester = semester;
        this.employeeEmailOrEmployeeId = employeeEmailOrEmployeeId;
        this.sectionStatus = sectionStatus;
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

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getEmployeeEmailOrEmployeeId() {
        return employeeEmailOrEmployeeId;
    }

    public void setEmployeeEmailOrEmployeeId(String employeeEmailOrEmployeeId) {
        this.employeeEmailOrEmployeeId = employeeEmailOrEmployeeId;
    }

    public SectionStatus getClassStatus() {
        return sectionStatus;
    }

    public void setClassStatus(SectionStatus sectionStatus) {
        this.sectionStatus = sectionStatus;
    }
}
