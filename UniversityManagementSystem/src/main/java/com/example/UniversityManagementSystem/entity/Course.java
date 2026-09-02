package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.CourseDurationType;
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
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String shortName;
    private String courseCode;
    private Float duration;

    @Enumerated(EnumType.STRING)
    private CourseDurationType courseDurationType;

    private Integer totalSemester;
    private String description;

    @OneToMany(mappedBy = "course")
    private List<Department> department=new ArrayList<>();

    @OneToMany(mappedBy = "course")
    private List<Subject> subjects = new ArrayList<>();

    @ManyToMany(mappedBy = "courses")
    private List<College> colleges = new ArrayList<>();

    @OneToMany(mappedBy = "course")
    private List<UniversityExam> universityExams = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
