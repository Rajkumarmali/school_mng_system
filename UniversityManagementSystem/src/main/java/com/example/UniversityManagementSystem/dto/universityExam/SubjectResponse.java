package com.example.UniversityManagementSystem.dto.universityExam;

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
    private String code;
    private String shortName;
    private String name;
    private Integer credit;
    private Integer maxMarks;
    private SubjectType subjectType;
}
