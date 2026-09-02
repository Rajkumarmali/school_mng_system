package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.ResultStatus;
import com.example.UniversityManagementSystem.entity.type.StudentExamStatus;
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
public class StudentUniversityExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double sgpa;
    private Double cgpa;
    private Integer totalCredits;
    private Integer earnedCredits;
    private Boolean filledFrom;

    @ManyToOne
    private UniversityExam universityExam;

    @ManyToOne
    private Student student;

    @OneToMany(mappedBy = "studentUniversityExam")
    private List<StudentUniversityExamSubject> studentUniversityExamSubjects = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
