package com.example.UniversityManagementSystem.dto.universityExam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class UniversityExamSubjectRequest {
    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
