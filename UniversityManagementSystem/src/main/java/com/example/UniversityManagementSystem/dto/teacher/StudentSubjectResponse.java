package com.example.UniversityManagementSystem.dto.teacher;

import com.example.UniversityManagementSystem.entity.type.AttendanceStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentSubjectResponse implements Serializable {
    private Long id;
    private AttendanceStatus attendance;
    private StudentResponse studentResponse;
    private Integer totalPresent;
    private Integer totalAbsent;
}
