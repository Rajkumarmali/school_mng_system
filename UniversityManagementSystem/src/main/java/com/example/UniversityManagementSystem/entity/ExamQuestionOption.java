package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class ExamQuestionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String optionText;

    private Boolean isTrue;

    @ManyToOne(fetch = FetchType.LAZY)
    private ExamQuestion examQuestion;

    @OneToOne(mappedBy = "selectedOption")
    private StudentExamAnswer studentExamAnswer;

}
