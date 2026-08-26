package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.ExamMode;
import com.example.UniversityManagementSystem.entity.type.ExamStatus;
import com.example.UniversityManagementSystem.entity.type.ExamType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private ExamType type;

    @Enumerated(EnumType.STRING)
    private ExamMode mode;

    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer maxMarks;
    private Integer passingMarks;

    private Boolean showQuestionToStudent;

    @Enumerated(EnumType.STRING)
    private ExamStatus status;

    @ManyToOne
    private SectionSubject sectionSubject;

    @OneToMany(mappedBy = "exam")
    private List<ExamQuestion> examQuestions = new ArrayList<>();

    @OneToMany(mappedBy = "exam")
    private List<StudentExam> studentExams = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
