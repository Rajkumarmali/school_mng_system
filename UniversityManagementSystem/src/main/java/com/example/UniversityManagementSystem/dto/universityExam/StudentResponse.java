package com.example.UniversityManagementSystem.dto.universityExam;

import com.example.UniversityManagementSystem.entity.type.Cast;
import com.example.UniversityManagementSystem.entity.type.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class StudentResponse implements Serializable {
    private Long id;
    private String enrollmentNumber;
    private String rollNumber;
    private String firstName;
    private String lastName;
    private String photo;
    private String aadhaarNumber;
    private LocalDate dob;
    private String email;
    private String phoneNumber;
    private Gender gender;
    private Cast cast;
    private String fatherName;
    private String motherName;
    private String collegeName;
    private String collegeCode;
}
