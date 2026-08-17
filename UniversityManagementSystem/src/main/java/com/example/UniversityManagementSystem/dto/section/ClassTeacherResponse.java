package com.example.UniversityManagementSystem.dto.section;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class ClassTeacherResponse implements Serializable {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String employeeId;
}
