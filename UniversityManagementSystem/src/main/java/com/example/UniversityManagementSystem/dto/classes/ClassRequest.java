package com.example.UniversityManagementSystem.dto.classes;

import com.example.UniversityManagementSystem.entity.type.ClassStatus;

public class ClassRequest {
    private String name;
    private String academicYear;
    private String semester;
    private String employeeEmailOrEmployeeId;
    private ClassStatus classStatus;

    public ClassRequest() {
    }

    public ClassRequest(String name, String academicYear, String semester, String employeeEmailOrEmployeeId, ClassStatus classStatus) {
        this.name = name;
        this.academicYear = academicYear;
        this.semester = semester;
        this.employeeEmailOrEmployeeId = employeeEmailOrEmployeeId;
        this.classStatus = classStatus;
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

    public ClassStatus getClassStatus() {
        return classStatus;
    }

    public void setClassStatus(ClassStatus classStatus) {
        this.classStatus = classStatus;
    }
}
