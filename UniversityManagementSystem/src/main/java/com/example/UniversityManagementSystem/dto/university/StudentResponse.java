package com.example.UniversityManagementSystem.dto.university;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
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
    private String email;
    private String aadhaarNumber;
    private Cast cast;
    private LocalDate dob;
    private String image;
    private String phoneNumber;
    private Gender gender;
    private String course;
    private String department;

    private AddressResponse addressResponse;
    private ParentResponse parentResponse;
    private StudentAcademicResponse studentAcademicResponse;

}
