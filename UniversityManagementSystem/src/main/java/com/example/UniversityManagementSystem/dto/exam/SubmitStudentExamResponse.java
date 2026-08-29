package com.example.UniversityManagementSystem.dto.exam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class SubmitStudentExamResponse implements Serializable {
    private Integer totalQuestions;
    private Integer answeredQuestions;
    private Integer markedForReviewQuestions;
}
