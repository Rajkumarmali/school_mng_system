package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.ResultStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class StudentUniversityExamSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double internalMarks;
    private Double obtainMarks;
    private Integer totalCredits;
    private Integer earnedCredits;

    @Enumerated(EnumType.STRING)
    private ResultStatus resultStatus;

    @ManyToOne
    private UniversityExamSubject universityExamSubject;

    @ManyToOne
    private StudentUniversityExam studentUniversityExam;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
