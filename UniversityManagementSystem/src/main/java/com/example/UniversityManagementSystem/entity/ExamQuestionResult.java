package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class ExamQuestionResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double obtainMarks;

    @ManyToOne
    private StudentExam studentExam;

    @ManyToOne
    private ExamQuestion examQuestion;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
