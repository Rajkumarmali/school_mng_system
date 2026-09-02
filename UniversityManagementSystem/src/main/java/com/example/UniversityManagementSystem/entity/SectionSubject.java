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
public class SectionSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Section section;

    @ManyToOne
    private Subject subject;

    @ManyToOne
    private Teacher teacher;

    @OneToMany(mappedBy = "sectionSubject")
    private List<StudentSubject> studentSubjects = new ArrayList<>();

    @OneToMany(mappedBy = "sectionSubject")
    private List<Exam> exams = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
