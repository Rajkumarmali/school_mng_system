package com.example.UniversityManagementSystem.dto.university;

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
    private String courseCode;
    private String courseName;
    private String departmentCode;
    private String departmentName;
}
