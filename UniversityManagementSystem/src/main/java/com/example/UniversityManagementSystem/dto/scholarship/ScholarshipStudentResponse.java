package com.example.UniversityManagementSystem.dto.scholarship;

import org.springframework.data.domain.Page;

import java.io.Serializable;

public class ScholarshipStudentResponse implements Serializable {

    private ScholarshipResponse scholarshipResponse;
    private Page<StudentResponse> studentResponses;

    public ScholarshipStudentResponse() {
    }

    public ScholarshipResponse getScholarshipResponse() {
        return scholarshipResponse;
    }

    public void setScholarshipResponse(ScholarshipResponse scholarshipResponse) {
        this.scholarshipResponse = scholarshipResponse;
    }

    public Page<StudentResponse> getStudentResponses() {
        return studentResponses;
    }

    public void setStudentResponses(Page<StudentResponse> studentResponses) {
        this.studentResponses = studentResponses;
    }
}
