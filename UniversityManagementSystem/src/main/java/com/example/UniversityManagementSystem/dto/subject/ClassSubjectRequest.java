package com.example.UniversityManagementSystem.dto.subject;

import java.util.List;

public class ClassSubjectRequest {
    private Long classId;
    private String academicYear;
    private List<Long> subjectIds;

    public ClassSubjectRequest() {
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public List<Long> getSubjectIds() {
        return subjectIds;
    }

    public void setSubjectIds(List<Long> subjectIds) {
        this.subjectIds = subjectIds;
    }
}
