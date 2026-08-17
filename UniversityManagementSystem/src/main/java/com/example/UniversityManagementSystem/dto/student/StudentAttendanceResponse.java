package com.example.UniversityManagementSystem.dto.student;

import com.example.UniversityManagementSystem.entity.type.AttendanceStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class StudentAttendanceResponse implements Serializable {
    private Long id;
    private LocalDate date;
    private AttendanceStatus status;
}
