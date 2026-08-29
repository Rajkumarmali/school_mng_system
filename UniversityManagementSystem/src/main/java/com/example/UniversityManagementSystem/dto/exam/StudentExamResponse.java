package com.example.UniversityManagementSystem.dto.exam;

import com.example.UniversityManagementSystem.entity.type.StudentExamStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentExamResponse implements Serializable {
    private Long id;
    private StudentExamStatus status;
    private Integer obtainMarks;
    private StudentResponse studentResponse;
    private ExamResponse examResponse;
}
