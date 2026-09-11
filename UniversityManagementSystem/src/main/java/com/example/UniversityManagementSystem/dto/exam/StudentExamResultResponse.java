package com.example.UniversityManagementSystem.dto.exam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentExamResultResponse implements Serializable {
    private String studentName;
    private String rollNumber;
    private String RegistrationNumber;
    private Double totalMarks;
    private Double totalObtainMarks;
    Page<ExamQuestionResponse> examQuestionResponses;
}
