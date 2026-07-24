package com.example.UniversityManagementSystem.dto.scholarship;

import org.springframework.data.domain.Page;

import java.io.Serializable;

public class StudentScholarshipResponse implements Serializable {

    private StudentResponse studentResponse;
    private Page<ScholarshipResponse> scholarshipResponses;

    public StudentScholarshipResponse() {
    }

    public Page<ScholarshipResponse> getScholarshipResponses() {
        return scholarshipResponses;
    }

    public void setScholarshipResponses(Page<ScholarshipResponse> scholarshipResponses) {
        this.scholarshipResponses = scholarshipResponses;
    }

    public StudentResponse getStudentResponse() {
        return studentResponse;
    }

    public void setStudentResponse(StudentResponse studentResponse) {
        this.studentResponse = studentResponse;
    }
}
