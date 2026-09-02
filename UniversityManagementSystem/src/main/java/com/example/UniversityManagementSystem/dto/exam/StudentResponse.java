package com.example.UniversityManagementSystem.dto.exam;

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
}
