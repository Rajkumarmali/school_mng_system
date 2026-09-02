package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.ExamStatus;
import com.example.UniversityManagementSystem.entity.type.ExamType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UniversityExam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private ExamType type;

    private LocalDateTime formStartAt;
    private LocalDateTime formEndAt;

    private String academicYear;
    private Integer year;
    private Integer semester;

    private Boolean showResult;

    @ManyToOne
    private Course course;

    @OneToMany(mappedBy = "universityExam")
    private List<UniversityExamSubject> universityExamSubjects = new ArrayList<>();

    @OneToMany(mappedBy = "universityExam")
    private List<StudentUniversityExam> studentUniversityExams = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
