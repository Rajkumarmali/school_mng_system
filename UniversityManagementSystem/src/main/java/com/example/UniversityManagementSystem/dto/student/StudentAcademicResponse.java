package com.example.UniversityManagementSystem.dto.student;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentAcademicResponse implements Serializable {
    private Long id;
    private Integer year;
    private Integer semester;
    private String academicYear;
    private Boolean isCurrent;

    private String courseCode;
    private String courseName;
    private String departmentCode;
    private String departmentName;
}
