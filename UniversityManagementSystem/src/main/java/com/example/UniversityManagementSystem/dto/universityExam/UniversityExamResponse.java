package com.example.UniversityManagementSystem.dto.universityExam;

import com.example.UniversityManagementSystem.entity.Course;
import com.example.UniversityManagementSystem.entity.type.ExamType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class UniversityExamResponse implements Serializable {
    private Long id;
    private String name;
    private ExamType type;

    private LocalDateTime formStartAt;
    private LocalDateTime formEndAt;

    private String academicYear;
    private Integer year;
    private Integer semester;
    private String courseCode;
    private String courseName;

    private Integer totalSubjects;
    private Integer totalStudents;
    private Integer totalFilledFormStudents;
}
