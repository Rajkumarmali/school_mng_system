package com.example.UniversityManagementSystem.dto.student;

import com.example.UniversityManagementSystem.entity.type.SubjectType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class SubjectResponse implements Serializable {
    private Long id;
    private Long studentSubjectId;
    private String code;
    private String shortName;
    private SubjectType subjectType;
    private Integer totalPresent;
    private Integer totalAbsent;
}
