package com.example.UniversityManagementSystem.dto.course;

import com.example.UniversityManagementSystem.entity.type.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class CourseStudentResponse implements Serializable {
    private Long id;
    private String rollNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String registrationNumber;
    private String phoneNumber;
    private Gender gender;
    private String college;

}
