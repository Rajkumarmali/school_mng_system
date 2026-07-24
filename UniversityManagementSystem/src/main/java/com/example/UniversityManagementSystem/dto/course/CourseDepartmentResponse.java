package com.example.UniversityManagementSystem.dto.course;

import java.io.Serializable;

public class CourseDepartmentResponse implements Serializable {
    private Long id;
    private String name;
    private String code;
    private String hodName;
    private String hodEmail;
    private String hodPhoneNumber;

    public CourseDepartmentResponse() {
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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
}
