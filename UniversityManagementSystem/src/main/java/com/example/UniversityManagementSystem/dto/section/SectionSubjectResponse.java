package com.example.UniversityManagementSystem.dto.section;

import java.io.Serializable;

public class SectionSubjectResponse implements Serializable {
    private Long id;
    private SubjectResponse subjectResponse;
    private ClassTeacherResponse teacherResponse;

    public SectionSubjectResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SubjectResponse getSubjectResponse() {
        return subjectResponse;
    }

    public void setSubjectResponse(SubjectResponse subjectResponse) {
        this.subjectResponse = subjectResponse;
    }

    public ClassTeacherResponse getTeacherResponse() {
        return teacherResponse;
    }

    public void setTeacherResponse(ClassTeacherResponse teacherResponse) {
        this.teacherResponse = teacherResponse;
    }
}
