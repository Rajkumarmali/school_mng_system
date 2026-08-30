package com.example.UniversityManagementSystem.entity;

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
public class StudentExamAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String answer;

    private Boolean isMarkedForReview;
    private Boolean isAnswered;
    private Double obtainMarks;

    @ManyToOne
    private StudentExam studentExam;

    @ManyToOne
    private ExamQuestion question;

    @OneToMany(mappedBy = "studentExamAnswer")
    private List<SelectedOptions> selectedOptions = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
