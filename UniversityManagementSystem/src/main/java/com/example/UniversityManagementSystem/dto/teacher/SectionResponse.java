package com.example.UniversityManagementSystem.dto.teacher;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class SectionResponse implements Serializable {
    private Long id;
    private String name;
    private String code;
    private Integer year;
    private Integer semester;
    private String departmentName;
    private String departmentCode;
}
