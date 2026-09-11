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
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String code;

    @ManyToOne
    private College college;

    @OneToOne
    private Teacher hodTeacher;

    @OneToMany(mappedBy = "department")
    List<Teacher> teacherList  = new ArrayList<>();

    @OneToMany(mappedBy = "department")
    List<Section> sectionList = new ArrayList<>();

    @OneToMany(mappedBy = "department")
    private List<FeeStructure> feeStructures=new ArrayList<>();

    @OneToMany(mappedBy = "department")
    private List<StudentAcademic> studentAcademics = new ArrayList<>();

    @ManyToOne
    private Course course;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
