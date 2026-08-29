package com.example.UniversityManagementSystem.dto.exam;

import com.example.UniversityManagementSystem.entity.type.StudentExamStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class StudentExamRequest {
    private Long id;
    private StudentExamStatus status;
    private Integer obtainMarks;
}
