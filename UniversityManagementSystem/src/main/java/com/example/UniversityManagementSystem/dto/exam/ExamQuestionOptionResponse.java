package com.example.UniversityManagementSystem.dto.exam;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@Getter
@Setter
public class ExamQuestionOptionResponse implements Serializable {
    private Long id;
    private String optionText;
    private Boolean isTrue;
}
