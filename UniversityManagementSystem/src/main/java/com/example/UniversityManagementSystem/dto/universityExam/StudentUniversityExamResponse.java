package com.example.UniversityManagementSystem.dto.universityExam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentUniversityExamResponse implements Serializable {
    private Long id;
    private Boolean filledFrom;
    private StudentResponse studentResponse;
    private UniversityExamResponse universityExamResponse;
}
