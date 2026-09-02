package com.example.UniversityManagementSystem.entity;

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
public class StudentExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StudentExamStatus status;

    private Double obtainMarks;
    private LocalDateTime submitted_at;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Exam exam;

    @OneToMany(mappedBy = "studentExam")
    private List<StudentExamAnswer> studentExamAnswers = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
