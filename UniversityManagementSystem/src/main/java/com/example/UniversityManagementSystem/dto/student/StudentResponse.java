package com.example.UniversityManagementSystem.dto.student;

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
    private String rollNumber;
    private String enrollmentNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String registrationNumber;
    private String phoneNumber;
    private LocalDate dob;
    private Gender gender;
    private Cast cast;
    private String aadharNumber;
    private String image;
    private String username;
    private AddressResponse addressResponse;
    private ParentResponse parentResponse;
    private StudentAcademicResponse studentAcademicResponse;

}

