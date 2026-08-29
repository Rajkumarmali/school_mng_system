package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.exam.*;
import com.example.UniversityManagementSystem.services.ExamServices;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/exam")
public class ExamController {

    private final ExamServices examServices;
    private final JwtProvider jwtProvider;

    public ExamController(ExamServices examServices, JwtProvider jwtProvider) {
        this.examServices = examServices;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createExam(@RequestBody List<ExamRequest> dto){
        String res = examServices.createExam(dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/update/{examId}")
    public ResponseEntity<String> updateExam(@PathVariable Long examId,
                                             @RequestBody ExamRequest dto){
        String res = examServices.updateExam(examId,dto);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/update/showQuestionPapetToStudent/{examId}")
    public ResponseEntity<String> updateToShowQuestionPaperToStudent(@PathVariable Long examId){
        String res = examServices.updateExamToShowQuestionPaper(examId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/{sectionId}")
    public ResponseEntity<Page<ExamResponse>> getExams(@PathVariable Long sectionId,
                                                       @RequestParam(defaultValue = "0") int pageNumber,
                                                       @RequestParam(defaultValue = "10") int pageSize){
        Page<ExamResponse> res = examServices.getExams(sectionId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/bysectionSubjectId/{sectionSubjectId}")
    public ResponseEntity<Page<ExamResponse>> getExamsBySectionSubjectId(@PathVariable Long sectionSubjectId,
                                                       @RequestParam(defaultValue = "0") int pageNumber,
                                                       @RequestParam(defaultValue = "10") int pageSize){
        Page<ExamResponse> res = examServices.getExamsBySectionSubjectId(sectionSubjectId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/exambyid/{examId}")
    public ResponseEntity<ExamResponse> getExamById(@PathVariable Long examId){
        ExamResponse res = examServices.getExamById(examId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/studentExam/{examId}")
    public ResponseEntity<Page<StudentExamResponse>> getStudentExamByExamId(@PathVariable Long examId,
                                                                            @RequestParam(defaultValue = "0") int pageNumber,
                                                                            @RequestParam(defaultValue = "10") int pageSize){
        Page<StudentExamResponse> res = examServices.getStudentExamsByExamId(examId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/studentexam/byuserid")
    public ResponseEntity<Page<StudentExamResponse>> getStudentExamsByStudentId(@RequestHeader("Authorization") String jwt,
                                                                                @RequestParam(defaultValue = "0") int pageNumber,
                                                                                @RequestParam(defaultValue = "10") int pageSize){
        Long userId = jwtProvider.getUserIdFromToken(jwt);
        Page<StudentExamResponse> res = examServices.getStudentExamsByUserId(userId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/studentexam/byid/{studentExamId}")
    public ResponseEntity<StudentExamResponse> getStudentExamById(@PathVariable Long studentExamId){
        StudentExamResponse res = examServices.getStudentExamById(studentExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/ongoin/studentexam")
    public ResponseEntity<Page<StudentExamResponse>> getOngoingStudentExam(@RequestHeader("Authorization") String jwt,
                                                                           @RequestParam(defaultValue = "0") int pageNumber,
                                                                           @RequestParam(defaultValue = "10") int pageSize ){
        Long userId = jwtProvider.getUserIdFromToken(jwt);
        Page<StudentExamResponse> res = examServices.getOnGoingStudentExams(userId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/studentExamOverview")
    public ResponseEntity<StudentExamOverviewResponse> getStudentExamOverview(@RequestHeader("Authorization") String jwt){
        Long userId = jwtProvider.getUserIdFromToken(jwt);
        StudentExamOverviewResponse res = examServices.getStudentExamOverview(userId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/update/studentExam/status")
    public ResponseEntity<String> updateStudentExamStatus(@RequestBody StudentExamRequest dto){
        String res = examServices.updateStudentExamStatus(dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping("/update/studentExam/marks")
    public ResponseEntity<String> updateStudentExamMarks(@RequestBody List<StudentExamRequest> dto){
        String res = examServices.updateStudentExamObtainMarks(dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping("/create/examquestion/{examId}")
    public ResponseEntity<String> createExamQuestion(@PathVariable Long examId,
                                                     @RequestBody ExamQuestionRequest dto){
        String res = examServices.createExamQuestion(examId, dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping("/update/examquestion/{examId}")
    public ResponseEntity<String> updateExamQuestion(@PathVariable Long examId,
                                                     @RequestBody ExamQuestionRequest dto){
        String res = examServices.updateExamQuestion(examId,dto);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @DeleteMapping("/delete/examquestion/{examQuestionId}")
    public ResponseEntity<String> deleteExamQuestion(@PathVariable Long examQuestionId){
        String res = examServices.deleteExamQuestion(examQuestionId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/examquestion/{examId}")
    public ResponseEntity<Page<ExamQuestionResponse>> getExamQuestions(@PathVariable Long examId,
                                                                       @RequestParam(defaultValue = "0") int pageNumber,
                                                                       @RequestParam(defaultValue = "10") int pageSize){
        Page<ExamQuestionResponse> res = examServices.getExamQuestions(examId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/studentexamquestion/{studentExamId}")
    public ResponseEntity<List<ExamQuestionResponse>> getStudentExamQuestion(@PathVariable Long studentExamId){
        List<ExamQuestionResponse> res = examServices.getStudentExamQuestions(studentExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/save/studentanswer")
    public ResponseEntity<String> startStudentExam(@RequestBody StudentExamAnswerRequest dto){
        String res = examServices.saveStudentAnswer(dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping("/update/questionreview/{studentExamId}/{questionId}")
    public ResponseEntity<String> updateReviewQuestion(@PathVariable Long studentExamId,
                                                       @PathVariable Long questionId){
        String res = examServices.updateReviewQuestion(studentExamId,questionId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/clear/studentanswer/{studentExamId}/{questionId}")
    public ResponseEntity<String> clearStudentAnswer(@PathVariable Long studentExamId,
                                                     @PathVariable Long questionId){
        String res = examServices.clearStudentAnswer(studentExamId,questionId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/submit/studentexam/{studentExamId}")
    public ResponseEntity<String> submitStudentExam(@PathVariable Long studentExamId){
        String res = examServices.submitExam(studentExamId);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @GetMapping("/get/submit/studentexamdetail/{studentExamId}")
    public ResponseEntity<SubmitStudentExamResponse> getSubmitStudentExamDetails(@PathVariable Long studentExamId){
        SubmitStudentExamResponse res = examServices.getSubmitStudentExamDetails(studentExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

}
