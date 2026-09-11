package com.example.UniversityManagementSystem.dto.exam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class StudentExamAnswerRequest {
    private Long questionId;
    private Long selectedOptionId;
    private Long studentExamId;
    private Integer answer;
}
