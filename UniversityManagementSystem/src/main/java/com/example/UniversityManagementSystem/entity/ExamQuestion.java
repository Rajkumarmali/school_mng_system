package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.QuestionType;
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
public class ExamQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String question;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    private Integer marks;

    @ManyToOne
    private Exam exam;

    @OneToMany(mappedBy = "examQuestion",fetch = FetchType.LAZY)
    private List<ExamQuestionOption> QuestionOptions= new ArrayList<>();

    @OneToOne(mappedBy = "question")
    private StudentExamAnswer studentExamAnswer;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
