package com.example.UniversityManagementSystem.dto.teacher;

import com.example.UniversityManagementSystem.entity.type.AttendanceStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class StudentAttendanceRequest {
    private LocalDate date;
    private AttendanceStatus status;
}
