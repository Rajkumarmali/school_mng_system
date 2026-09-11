package com.example.UniversityManagementSystem.dto.universityExam;

import com.example.UniversityManagementSystem.entity.type.ResultStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class StudentUniversityExamResponse implements Serializable {
    private Long id;
    private Boolean filledFrom;
    private String examCenterCollegeName;
    private String examCenterCollegeCode;
    private LocalDateTime submittedAt;
    private Double totalMarks;
    private Double totalObtainMarks;
    private ResultStatus resultStatus;
    private Integer totalCredits;
    private Integer earnedCredits;
    private Integer totalSubjects;
    private StudentResponse studentResponse;
    private UniversityExamResponse universityExamResponse;
    private List<StudentUniversityExamSubjectResponse> studentUniversityExamSubjectResponse;
}
