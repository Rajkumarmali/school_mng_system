package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.ResultStatus;
import com.example.UniversityManagementSystem.entity.type.StudentExamStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class StudentUniversityExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StudentExamStatus status;

    @Enumerated(EnumType.STRING)
    private ResultStatus resultStatus;

    private Integer internalMarks;
    private Integer obtainedMarks;

    @ManyToOne
    private UniversityExamSubject universityExamSubject;

    @ManyToOne
    private Student student;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
