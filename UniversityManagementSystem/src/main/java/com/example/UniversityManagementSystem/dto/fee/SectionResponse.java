package com.example.UniversityManagementSystem.dto.fee;

import com.example.UniversityManagementSystem.entity.type.SectionStatus;

import java.io.Serializable;

public class SectionResponse implements Serializable {
    private Long id;
    private String code;
    private String name;
    private Integer year;
    private Integer semester;
    private String AcademicYear;
    private SectionStatus status;
    private Double totalFee;
    private Double totalPendingFee;
    private Double collectedFee;
    private Integer totalStudent;
    private String departmentName;
    private String departmentCode;
    private String courseName;
    private String courseCode;


    public SectionResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public String getAcademicYear() {
        return AcademicYear;
    }

    public void setAcademicYear(String academicYear) {
        AcademicYear = academicYear;
    }

    public SectionStatus getStatus() {
        return status;
    }

    public void setStatus(SectionStatus status) {
        this.status = status;
    }

    public Double getTotalPendingFee() {
        return totalPendingFee;
    }

    public void setTotalPendingFee(Double totalPendingFee) {
        this.totalPendingFee = totalPendingFee;
    }

    public Double getCollectedFee() {
        return collectedFee;
    }

    public void setCollectedFee(Double collectedFee) {
        this.collectedFee = collectedFee;
    }

    public Integer getTotalStudent() {
        return totalStudent;
    }

    public void setTotalStudent(Integer totalStudent) {
        this.totalStudent = totalStudent;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(Double totalFee) {
        this.totalFee = totalFee;
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

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }
}
