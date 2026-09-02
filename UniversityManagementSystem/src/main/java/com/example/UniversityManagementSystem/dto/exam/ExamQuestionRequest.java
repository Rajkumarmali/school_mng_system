package com.example.UniversityManagementSystem.dto.exam;

import com.example.UniversityManagementSystem.entity.type.QuestionType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class ExamQuestionRequest {
    private String question;
    private QuestionType type;
    private Integer correctAnswer;
    private Double marks;
    private Double negativeMarks;
    List<ExamQuestionOptionRequest> examQuestionOptionRequests;
}
