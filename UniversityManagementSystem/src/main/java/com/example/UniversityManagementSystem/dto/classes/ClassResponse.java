package com.example.UniversityManagementSystem.dto.classes;

import com.example.UniversityManagementSystem.entity.type.SectionStatus;

import java.io.Serializable;

public class ClassResponse implements Serializable {
    private Long id;
    private String name;
    private String academicYear;
    private String semester;
    private String departmentName;
    private String departmentCode;
    private String classCode;
    private ClassTeacherResponse classTeacherResponse;
    private SectionStatus sectionStatus;
    private Integer totalStudents;

    public ClassResponse() {
    }

    public ClassResponse(Long id, String name, String academicYear, String semester, String departmentName, String departmentCode, String classCode, ClassTeacherResponse classTeacherResponse, SectionStatus sectionStatus, Integer totalStudents) {
        this.id = id;
        this.name = name;
        this.academicYear = academicYear;
        this.semester = semester;
        this.departmentName = departmentName;
        this.departmentCode = departmentCode;
        this.classCode = classCode;
        this.classTeacherResponse = classTeacherResponse;
        this.sectionStatus = sectionStatus;
        this.totalStudents = totalStudents;
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

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public ClassTeacherResponse getClassTeacherResponse() {
        return classTeacherResponse;
    }

    public void setClassTeacherResponse(ClassTeacherResponse classTeacherResponse) {
        this.classTeacherResponse = classTeacherResponse;
    }

    public SectionStatus getClassStatus() {
        return sectionStatus;
    }

    public void setClassStatus(SectionStatus sectionStatus) {
        this.sectionStatus = sectionStatus;
    }

    public Integer getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(Integer totalStudents) {
        this.totalStudents = totalStudents;
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }
}
