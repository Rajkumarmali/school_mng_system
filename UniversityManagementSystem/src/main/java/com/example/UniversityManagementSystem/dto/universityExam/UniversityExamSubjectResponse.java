package com.example.UniversityManagementSystem.dto.universityExam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class UniversityExamSubjectResponse implements Serializable {
    private Long id;
    private Integer maxMarks;
    private Integer passingMarks;
    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private SubjectResponse subjectResponse;
    private Integer totalStudents;
    private Page<StudentUniversityExamSubjectResponse> studentUniversityExamSubjectResponses;
}

