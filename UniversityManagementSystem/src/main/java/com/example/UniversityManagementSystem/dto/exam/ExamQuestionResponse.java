package com.example.UniversityManagementSystem.dto.exam;


import com.example.UniversityManagementSystem.entity.type.QuestionType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class ExamQuestionResponse implements Serializable {
    private Long id;
    private String question;
    private QuestionType type;
    private Integer correctAnswer;
    private Double marks;
    private Double negativeMarks;
    StudentExamAnswerResponse studentExamAnswerResponses;
    List<ExamQuestionOptionResponse> examQuestionOptionResponses;
}
