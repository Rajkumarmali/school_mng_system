package com.example.UniversityManagementSystem.dto.teacher;

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
    private String registrationNumber;
    private String firstName;
    private String lastName;
    private Gender gender;
    private String email;
    private String phoneNumber;
    private ParentResponse parentResponse;
}
