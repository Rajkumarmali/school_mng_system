package com.example.UniversityManagementSystem.entity;

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
public class UniversityExamSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer maxMarks;
    private Integer passingMarks;
    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne
    private UniversityExam universityExam;

    @OneToOne
    private Subject subject;

    @OneToMany(mappedBy = "universityExamSubject")
    private List<StudentUniversityExamSubject> universityExamSubject=new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
