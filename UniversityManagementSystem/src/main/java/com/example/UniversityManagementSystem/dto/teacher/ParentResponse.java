package com.example.UniversityManagementSystem.dto.teacher;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class ParentResponse implements Serializable {
    private Long id;
    private String fatherName;
    private String fatherNumber;
    private String motherName;
    private String motherNumber;
}
