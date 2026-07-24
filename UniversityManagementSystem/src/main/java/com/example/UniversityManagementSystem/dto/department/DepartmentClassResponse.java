package com.example.UniversityManagementSystem.dto.department;

import com.example.UniversityManagementSystem.entity.type.ClassStatus;

import java.io.Serializable;

public class DepartmentClassResponse implements Serializable {
    private Long id;
    private String name;
    private String academicYear;
    private String semester;
    private String classCode;
    private ClassStatus classStatus;
    private String classTeacherName;
    private String classTeacherEmail;
    private String classTeacherPhoneNumber;

    public DepartmentClassResponse() {
    }

    public DepartmentClassResponse(Long id, String name, String academicYear, String semester, String classCode, ClassStatus classStatus, String classTeacherName, String classTeacherEmail, String classTeacherPhoneNumber) {
        this.id = id;
        this.name = name;
        this.academicYear = academicYear;
        this.semester = semester;
        this.classCode = classCode;
        this.classStatus = classStatus;
        this.classTeacherName = classTeacherName;
        this.classTeacherEmail = classTeacherEmail;
        this.classTeacherPhoneNumber = classTeacherPhoneNumber;
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

    public String getClassTeacherName() {
        return classTeacherName;
    }

    public void setClassTeacherName(String classTeacherName) {
        this.classTeacherName = classTeacherName;
    }

    public String getClassTeacherEmail() {
        return classTeacherEmail;
    }

    public void setClassTeacherEmail(String classTeacherEmail) {
        this.classTeacherEmail = classTeacherEmail;
    }

    public String getClassTeacherPhoneNumber() {
        return classTeacherPhoneNumber;
    }

    public void setClassTeacherPhoneNumber(String classTeacherPhoneNumber) {
        this.classTeacherPhoneNumber = classTeacherPhoneNumber;
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    public ClassStatus getClassStatus() {
        return classStatus;
    }

    public void setClassStatus(ClassStatus classStatus) {
        this.classStatus = classStatus;
    }
}
