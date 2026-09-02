package com.example.UniversityManagementSystem.dto.exam;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@Getter
@Setter
public class ExamResultOverviewResponse implements Serializable {
    private Integer totalStudent;
    private Integer totalAppearedStudent;
    private Integer totalPassedStudent;
    private Integer totalFiledStudent;
    private Double avgMarks;
    private List<Map<String,Object>> topPerformanceStudents = new ArrayList<>();
}
