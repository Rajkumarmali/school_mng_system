package com.example.UniversityManagementSystem.dto.universityExam;

import com.example.UniversityManagementSystem.entity.type.ResultStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentUniversityExamSubjectResponse implements Serializable {
    private Long id;
    private Double internalMarks;
    private Double obtainMarks;
    private Integer totalCredits;
    private Integer earnedCredits;
    private ResultStatus resultStatus;
    private StudentResponse studentResponse;
    private SubjectResponse subjectResponse;
}
