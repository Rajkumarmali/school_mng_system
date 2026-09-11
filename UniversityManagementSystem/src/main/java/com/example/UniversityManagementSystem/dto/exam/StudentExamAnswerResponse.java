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
public class StudentExamAnswerResponse implements Serializable {
    private Long id;
    private Boolean isMarkedForReview;
    private Boolean isAnswered;
    private Double obtainMarks;
    private Integer answer;
    private List<Map<String,Object>> selectedOptions = new ArrayList<>();
}
