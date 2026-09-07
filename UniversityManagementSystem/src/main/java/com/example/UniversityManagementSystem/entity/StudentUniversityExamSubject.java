package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.ResultStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class StudentUniversityExamSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double internalMarks;
    private Double obtainMarks;
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
