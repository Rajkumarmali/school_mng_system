package com.example.UniversityManagementSystem.dto.section;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentSubjectResponse implements Serializable {
    private Long id;
    private Integer totalPresent;
    private Integer totalAbsent;
    private Page<SubjectResponse> subjectResponse;
}
