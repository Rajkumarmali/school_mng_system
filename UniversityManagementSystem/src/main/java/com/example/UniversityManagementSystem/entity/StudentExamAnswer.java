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
public class StudentExamAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String answer;

    private Integer obtainMarks;
    private Boolean isMarkedForReview;
    private Boolean isAnswered;

    @ManyToOne
    private ExamQuestionOption selectedOption;

    @ManyToOne
    private StudentExam studentExam;

    @ManyToOne
    private ExamQuestion question;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
