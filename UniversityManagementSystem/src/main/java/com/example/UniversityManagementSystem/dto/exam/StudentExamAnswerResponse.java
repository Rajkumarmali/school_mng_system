package com.example.UniversityManagementSystem.dto.exam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentExamAnswerResponse implements Serializable {
    private Long id;
    private Boolean isMarkedForReview;
    private Boolean isAnswered;
    private Long selectedOptionId;
}
