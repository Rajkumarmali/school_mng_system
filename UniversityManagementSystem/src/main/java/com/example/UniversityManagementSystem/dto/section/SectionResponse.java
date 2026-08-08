package com.example.UniversityManagementSystem.dto.section;

import com.example.UniversityManagementSystem.entity.type.SectionStatus;

import java.io.Serializable;

public class SectionResponse implements Serializable {
    private Long id;
    private String name;
    private String academicYear;
    private Integer semester;
    private Integer year;
    private String departmentName;
    private String departmentCode;
    private String code;
    private ClassTeacherResponse classTeacherResponse;
    private SectionStatus sectionStatus;
    private Integer totalStudents;

    public SectionResponse() {
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

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public ClassTeacherResponse getClassTeacherResponse() {
        return classTeacherResponse;
    }

    public void setClassTeacherResponse(ClassTeacherResponse classTeacherResponse) {
        this.classTeacherResponse = classTeacherResponse;
    }

    public SectionStatus getSectionStatus() {
        return sectionStatus;
    }

    public void setSectionStatus(SectionStatus sectionStatus) {
        this.sectionStatus = sectionStatus;
    }

    public Integer getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(Integer totalStudents) {
        this.totalStudents = totalStudents;
    }
}
