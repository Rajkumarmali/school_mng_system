package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.universityExam.StudentUniversityExamResponse;
import com.example.UniversityManagementSystem.dto.universityExam.UniversityExamRequest;
import com.example.UniversityManagementSystem.dto.universityExam.UniversityExamResponse;
import com.example.UniversityManagementSystem.dto.universityExam.UniversityExamSubjectResponse;
import org.springframework.data.domain.Page;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface UniversityExamService {
    String createExam(UniversityExamRequest dto);
    Page<UniversityExamResponse> getAllExam(int pageNumber,int pageSize);
    UniversityExamResponse getExamById(Long universityExamId);
    String updateUniversityExam(Long universityExamId, UniversityExamRequest dto);
    List<UniversityExamSubjectResponse> getUniversityExamSubjects(Long universityExamId);
    Page<StudentUniversityExamResponse> getStudentUniversityExamByUniversityExamId(Long universityExamId,int pageNumber,int pageSize);
    Page<StudentUniversityExamResponse> getStudentUniversityExamByUserId(Long userId,int pageNumber,int pageSize);
    StudentUniversityExamResponse getStudentUniversityExamById(Long studentUniversityExamId);
    String saveStudentUniversityExamForm(Long studentUniversityExamId,List<Long> universityExamSubjectsIds);
    ByteArrayInputStream generateStudentApplicationForm(Long studentUniversityExamId);
}
