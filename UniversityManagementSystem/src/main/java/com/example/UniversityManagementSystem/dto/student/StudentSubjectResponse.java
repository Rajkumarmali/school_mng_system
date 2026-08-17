package com.example.UniversityManagementSystem.dto.student;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentSubjectResponse implements Serializable {
    private Integer totalPresent;
    private Integer totalAbsent;
    private Page<SubjectResponse> subjectResponses;
}
