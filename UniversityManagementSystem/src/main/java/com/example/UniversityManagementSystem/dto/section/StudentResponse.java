package com.example.UniversityManagementSystem.dto.section;

import com.example.UniversityManagementSystem.entity.type.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentResponse implements Serializable {
    private Long id;
    private String rollNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String registrationNumber;
    private Gender gender;
    private String phoneNumber;
    private double attendancePercent;
    private ParentResponse parentResponse;
}
