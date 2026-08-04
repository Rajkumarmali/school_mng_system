package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.subject.ClassSubjectRequest;
import com.example.UniversityManagementSystem.dto.subject.SubjectRequest;
import com.example.UniversityManagementSystem.dto.subject.SubjectResponse;
import org.springframework.data.domain.Page;

public interface SubjectService {
    String createSubject(Long courseId,SubjectRequest dto);
    String updateSubject(Long subjectId, SubjectRequest dto);
    Page<SubjectResponse> getAllSubject(Long courseId,int pageNumber,int pageSize);
    SubjectResponse getSubjectById(Long subjectId);
}
