package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.SubjectType;
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
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String name;
    private String shortName;
    private String description;
    private Integer semester;
    private Integer year;

    @Enumerated(EnumType.STRING)
    private SubjectType subjectType;

    private Integer credit;
    private Integer maxMarks;
    private Integer passingMarks;

    @ManyToOne
    private Course course;

    @OneToMany(mappedBy = "subject")
    private List<SectionSubject> sectionSubjects = new ArrayList<>();

    @OneToOne(mappedBy = "subject")
    private UniversityExamSubject universityExamSubject;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
