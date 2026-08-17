package com.example.UniversityManagementSystem.dto.teacher;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class TeacherClassResponse implements Serializable {
  private Long id;
  private Integer totalStudent;
  private SubjectResponse subjectResponse;
  private SectionResponse sectionResponse;
}
