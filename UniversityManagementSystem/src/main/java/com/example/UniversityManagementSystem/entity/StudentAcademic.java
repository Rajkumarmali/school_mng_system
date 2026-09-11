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
public class StudentAcademic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer year;
    private Integer semester;
    private String academicYear;
    private Boolean isCurrent;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Course course;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
