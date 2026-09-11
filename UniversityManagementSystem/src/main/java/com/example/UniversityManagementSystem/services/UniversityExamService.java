package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.universityExam.*;
import org.springframework.data.domain.Page;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface UniversityExamService {
    String createExam(UniversityExamRequest dto);
    Page<UniversityExamResponse> getAllExam(int pageNumber,int pageSize);
    UniversityExamResponse getExamById(Long universityExamId);
    String updateUniversityExam(Long universityExamId, UniversityExamRequest dto);
    String updateUniversityExamShowTimeTable(Long universityExamId);
    String updateUniversityExamShowAdmitCard(Long universityExamId);
    String updateUniversityExamShowResul(Long universityExamId);
    List<UniversityExamSubjectResponse> getUniversityExamSubjects(Long universityExamId);
    UniversityExamSubjectResponse getUniversityExamSubjectById(Long universityExamSubjectId, int pageNumber, int pageSize);
    String updateUniversityExamSubject(Long universityExamSubjectId, UniversityExamSubjectRequest dto);
    Page<StudentUniversityExamResponse> getStudentUniversityExamByUniversityExamId(Long universityExamId,int pageNumber,int pageSize);
    Page<StudentUniversityExamResponse> getStudentUniversityExamByUserId(Long userId,int pageNumber,int pageSize);
    StudentUniversityExamResponse getStudentUniversityExamById(Long studentUniversityExamId);
    String updateStudentUniversityExamCenter(Long studentUniversityExamId,String collegeCode);
    String saveStudentUniversityExamForm(Long studentUniversityExamId,List<Long> universityExamSubjectsIds);
    ByteArrayInputStream generateStudentApplicationForm(Long studentUniversityExamId);
    List<UniversityExamSubjectResponse> getUniversityExamTimeTable(Long universityExamId);
    ByteArrayInputStream generateStudentAdmitCard(Long studentUniversityExamId);
    String updateStudentUniversityExamSubjectObtainMarks(List<StudentUniversityExamSubjectRequest> dto);
    String generateUniversityExamResult(Long universityExamId);
    UniversityExamResponse getUniversityExamResultOverview(Long universityExamId,int pageNumber,int pageSize);
}
