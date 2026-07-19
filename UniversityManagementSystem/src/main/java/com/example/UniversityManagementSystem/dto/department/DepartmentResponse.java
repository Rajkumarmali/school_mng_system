package com.example.UniversityManagementSystem.dto.department;

import java.io.Serializable;

public class DepartmentResponse implements Serializable {
    private Long id;
    private String name;
    private String description;
    private String code;
    private String courseCode;
    private String hodName;
    private String hodEmail;
    private String hodPhoneNumber;
    private String employeeId;
    private Integer totalTeacher;
    private Integer totalStudent;
    private Integer totalClass;

    public DepartmentResponse() {
    }

    public DepartmentResponse(Long id, String name, String description, String hodName, String hodEmail,
                              String hodPhoneNumber, String code, String employeeId, Integer totalTeacher, Integer totalStudent, Integer totalClass) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hodName = hodName;
        this.hodEmail = hodEmail;
        this.hodPhoneNumber = hodPhoneNumber;
        this.code = code;
        this.employeeId = employeeId;
        this.totalTeacher = totalTeacher;
        this.totalStudent = totalStudent;
        this.totalClass = totalClass;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHodName() {
        return hodName;
    }

    public void setHodName(String hodName) {
        this.hodName = hodName;
    }

    public String getHodEmail() {
        return hodEmail;
    }

    public void setHodEmail(String hodEmail) {
        this.hodEmail = hodEmail;
    }

    public String getHodPhoneNumber() {
        return hodPhoneNumber;
    }

    public void setHodPhoneNumber(String hodPhoneNumber) {
        this.hodPhoneNumber = hodPhoneNumber;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Integer getTotalTeacher() {
        return totalTeacher;
    }

    public void setTotalTeacher(Integer totalTeacher) {
        this.totalTeacher = totalTeacher;
    }

    public Integer getTotalStudent() {
        return totalStudent;
    }

    public void setTotalStudent(Integer totalStudent) {
        this.totalStudent = totalStudent;
    }

    public Integer getTotalClass() {
        return totalClass;
    }

    public void setTotalClass(Integer totalClass) {
        this.totalClass = totalClass;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }
}
