package com.example.UniversityManagementSystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class ExamQuestionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String optionText;

    private Boolean isTrue;

    @ManyToOne(fetch = FetchType.LAZY)
    private ExamQuestion examQuestion;

    @OneToMany(mappedBy = "examQuestionOption")
    private List<SelectedOptions> selectedOptions=new ArrayList<>();

}
