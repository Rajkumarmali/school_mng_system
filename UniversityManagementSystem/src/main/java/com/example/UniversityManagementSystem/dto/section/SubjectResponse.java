package com.example.UniversityManagementSystem.dto.section;

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
    private String description;
    private SubjectType subjectType;
    private Integer credit;
    private Integer maxMarks;
    private Integer passingMarks;
    private Integer totalStudent;
    private Integer totalPresent;
    private Integer totalAbsent;
}
