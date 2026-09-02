package com.example.UniversityManagementSystem.dto.exam;

import com.example.UniversityManagementSystem.entity.type.ExamMode;
import com.example.UniversityManagementSystem.entity.type.ExamStatus;
import com.example.UniversityManagementSystem.entity.type.ExamType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class ExamResponse implements Serializable {
    private Long id;
    private String name;
    private ExamType type;
    private ExamMode mode;
    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer maxMarks;
    private Integer passingMarks;
    private ExamStatus status;
    private Boolean showQuestionToStudent;
    private Boolean showResult;
    private Boolean generatedResult;
    private Integer totalQuestion;
    private SubjectResponse subjectResponse;
}
