package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.Cast;
import com.example.UniversityManagementSystem.entity.type.Gender;
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
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String enrollmentNumber;
    private String rollNumber;

    private String firstName;
    private String lastName;
    private String email;
    private String registrationNumber;
    private String phoneNumber;
    private LocalDate dob;
    private String image;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated
    private Cast cast;

    private String aadhaarNumber;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Address address;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private College college;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Parent parent;

    @ManyToOne()
    private Department department;

    @ManyToMany(mappedBy = "students")
    private List<Section> sections =new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<StudentFee> studentFees=new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<StudentDocument> studentDocument = new ArrayList<>();

    @ManyToMany(mappedBy = "students")
    private List<Scholarship> scholarships = new ArrayList<>() ;

    @OneToMany(mappedBy = "student")
    private List<StudentSubject> studentSubjects = new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<StudentUniversityExam> studentUniversityExams = new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<StudentExam> studentExams = new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<StudentAcademic> studentAcademics = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
