package com.example.UniversityManagementSystem.dto.section;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class SectionSubjectResponse implements Serializable {
    private Long id;
    private SubjectResponse subjectResponse;
    private ClassTeacherResponse teacherResponse;
    private StudentResponse studentResponse;
}
