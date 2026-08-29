package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.exam.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ExamServices {
    String createExam(List<ExamRequest> dto);
    String updateExam(Long examId,ExamRequest dto);
    String updateExamToShowQuestionPaper(Long examId);
    Page<ExamResponse> getExams(Long sectionId, int pageNumber, int pageSize);
    Page<ExamResponse> getExamsBySectionSubjectId(Long sectionSubjectId,int pageNumber,int pageSize);
    ExamResponse getExamById(Long examId);
    Page<StudentExamResponse> getStudentExamsByExamId(Long examId, int pageNumber, int pageSize);
    Page<StudentExamResponse> getStudentExamsByUserId(Long userId, int pageNumber, int pageSize);
    Page<StudentExamResponse> getOnGoingStudentExams(Long userId, int pageNumber, int pageSize);
    StudentExamOverviewResponse getStudentExamOverview(Long userId);
    StudentExamResponse getStudentExamById(Long studentExamId);
    String updateStudentExamStatus(StudentExamRequest dto);
    String updateStudentExamObtainMarks(List<StudentExamRequest> dto);
    String createExamQuestion(Long examId,ExamQuestionRequest dto);
    String updateExamQuestion(Long examQuestionId,ExamQuestionRequest dto);
    String deleteExamQuestion(Long examQuestionId);
    Page<ExamQuestionResponse> getExamQuestions(Long examId,int pageNumber,int pageSize);
    List<ExamQuestionResponse> getStudentExamQuestions(Long studentExamId);
    String saveStudentAnswer(StudentExamAnswerRequest dto);
    String updateReviewQuestion(Long studentExamId,Long questionId);
    String clearStudentAnswer(Long studentExamId,Long questionId);
    String submitExam(Long studentExamId);
    SubmitStudentExamResponse getSubmitStudentExamDetails(Long studentExamId);
}
