package com.example.UniversityManagementSystem.dto.exam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class StudentExamOverviewResponse implements Serializable {
    private Integer totalExam;
    private Integer upcomingExam;
    private Integer onGoingExam;
    private double avgMarks;
}
