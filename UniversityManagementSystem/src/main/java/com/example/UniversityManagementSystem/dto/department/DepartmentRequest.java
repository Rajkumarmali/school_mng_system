package com.example.UniversityManagementSystem.dto.department;

public class DepartmentRequest {
    private String name;
    private String description;
    private String hodTeacherEmailOrEmplId;

    public DepartmentRequest() {
    }

    public DepartmentRequest(String name, String description, String hodTeacherEmailOrEmplId) {
        this.name = name;
        this.description = description;
        this.hodTeacherEmailOrEmplId = hodTeacherEmailOrEmplId;
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

    public String getHodTeacherEmailOrEmplId() {
        return hodTeacherEmailOrEmplId;
    }

    public void setHodTeacherEmailOrEmplId(String hodTeacherEmailOrEmplId) {
        this.hodTeacherEmailOrEmplId = hodTeacherEmailOrEmplId;
    }
}
