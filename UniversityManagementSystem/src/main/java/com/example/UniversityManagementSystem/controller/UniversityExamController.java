package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.universityExam.*;
import com.example.UniversityManagementSystem.entity.StudentUniversityExam;
import com.example.UniversityManagementSystem.entity.UniversityExamSubject;
import com.example.UniversityManagementSystem.services.UniversityExamService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("api/university/exam")
public class UniversityExamController {

    private final UniversityExamService universityExamService;
    private final JwtProvider jwtProvider;

    public UniversityExamController(UniversityExamService universityExamService, JwtProvider jwtProvider) {
        this.universityExamService = universityExamService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createExam(@RequestBody UniversityExamRequest dto){
        String res = universityExamService.createExam(dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping("/get/all-exam")
    public ResponseEntity<Page<UniversityExamResponse>> createExam(@RequestParam(defaultValue = "0") int pageNumber,
                                                                   @RequestParam(defaultValue = "10") int pageSize){
        Page<UniversityExamResponse> res = universityExamService.getAllExam(pageNumber,pageSize);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping("/get/exam-by-id/{universityExamId}")
    public ResponseEntity<UniversityExamResponse> getExamById(@PathVariable Long universityExamId){
        UniversityExamResponse res = universityExamService.getExamById(universityExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/update/{universityExamId}")
    public ResponseEntity<String> updateUniversityExam(@PathVariable Long universityExamId,
                                                       @RequestBody UniversityExamRequest dto){
        String res = universityExamService.updateUniversityExam(universityExamId,dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping("/update/university-exam/show-time-table/{universityExamId}")
    public ResponseEntity<String> updateUniversityExamShowTimeTable(@PathVariable Long universityExamId){
        String res = universityExamService.updateUniversityExamShowTimeTable(universityExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/update/university-exam/show-admit-card/{universityExamId}")
    public ResponseEntity<String> updateUniversityExamShowAdmitCardTable(@PathVariable Long universityExamId){
        String res = universityExamService.updateUniversityExamShowAdmitCard(universityExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/update/university-exam/show-result/{universityExamId}")
    public ResponseEntity<String> updateUniversityExamShowResultTable(@PathVariable Long universityExamId){
        String res = universityExamService.updateUniversityExamShowResul(universityExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/university-exam-subject/{universityExamId}")
    public ResponseEntity<List<UniversityExamSubjectResponse>> getUniversityExamSubjects(@PathVariable Long universityExamId){
        List<UniversityExamSubjectResponse> res = universityExamService.getUniversityExamSubjects(universityExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/university-exam-subject/byid/{universityExamSubjectId}")
    public ResponseEntity<UniversityExamSubjectResponse> getUniversityExamSubjectById(@PathVariable Long universityExamSubjectId,
                                                                                      @RequestParam(defaultValue = "0") int pageNumber,
                                                                                      @RequestParam(defaultValue = "10") int pageSize){
        UniversityExamSubjectResponse res = universityExamService.getUniversityExamSubjectById(universityExamSubjectId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/update/university-exam-subject/{universityExamSubjectId}")
    public ResponseEntity<String> updateUniversityExamSubject(@PathVariable Long universityExamSubjectId,
                                                              @RequestBody UniversityExamSubjectRequest dto){
        String res = universityExamService.updateUniversityExamSubject(universityExamSubjectId,dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @GetMapping("/get/student-university-exam/by-university-exam-id/{universityExamId}")
    public ResponseEntity<Page<StudentUniversityExamResponse>> getStudentUniversityExamByUniversityExamId(@PathVariable Long universityExamId,
                                                                                                          @RequestParam(defaultValue = "0") int pageNumber,
                                                                                                          @RequestParam(defaultValue = "10") int pageSize){
        Page<StudentUniversityExamResponse> res = universityExamService.getStudentUniversityExamByUniversityExamId(universityExamId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/student-university-exam/by-userId")
    public ResponseEntity<Page<StudentUniversityExamResponse>> getStudentUniversityExamByUserId(@RequestHeader("Authorization") String jwt,
                                                                                                @RequestParam(defaultValue = "0") int pageNumber,
                                                                                                @RequestParam(defaultValue = "10") int pageSize){
        Long userId = jwtProvider.getUserIdFromToken(jwt);
        Page<StudentUniversityExamResponse> res = universityExamService.getStudentUniversityExamByUserId(userId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/student-university-exam/by-id/{universityExamId}")
    public ResponseEntity<StudentUniversityExamResponse> getStudentUniversityExam(@PathVariable Long universityExamId){
        StudentUniversityExamResponse res = universityExamService.getStudentUniversityExamById(universityExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/updat-student-universityexam-center/{studentUniversityExamId}")
    public ResponseEntity<String> updateStudentUniversityExamCenter(@PathVariable Long studentUniversityExamId,
                                                                    @RequestBody String collegeCode){
        String res = universityExamService.updateStudentUniversityExamCenter(studentUniversityExamId,collegeCode);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping("/save/student-university-exam-form/{studentUniversityExamId}")
    public ResponseEntity<String> saveStudentUniversityExam(@PathVariable Long studentUniversityExamId,@RequestBody List<Long> dto){
        String res = universityExamService.saveStudentUniversityExamForm(studentUniversityExamId,dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @GetMapping("/generate/student-application-form/{studentUniversityExamId}")
    public ResponseEntity<InputStreamResource> generateStudentApplicationForm(@PathVariable Long studentUniversityExamId){
        ByteArrayInputStream res = universityExamService.generateStudentApplicationForm(studentUniversityExamId);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=receipt.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(res));
    }

    @GetMapping("/get/university-exam-time-table/{universityExamId}")
    public ResponseEntity<List<UniversityExamSubjectResponse>> getUniversityExamTimeTable(@PathVariable Long universityExamId){
        List<UniversityExamSubjectResponse> res = universityExamService.getUniversityExamTimeTable(universityExamId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/generate/student-admint-card/{studentUniversityExamId}")
    public ResponseEntity<InputStreamResource> generateStudentAdmitCard(@PathVariable Long studentUniversityExamId){
        ByteArrayInputStream res = universityExamService.generateStudentAdmitCard(studentUniversityExamId);
        HttpHeaders headers  = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION,"attachment; fulename=admitcard.pdf");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(res));
    }

    @PostMapping("/update/student-universit-exam-subject/marks")
    public ResponseEntity<String> updateStudentUniversityExamSubjectMarks(@RequestBody  List<StudentUniversityExamSubjectRequest> dto){
        String res = universityExamService.updateStudentUniversityExamSubjectObtainMarks(dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping("/generate-university-exam-result/{universityExamId}")
    public ResponseEntity<String> generateUniversityExamResult(@PathVariable Long universityExamId){
        String res = universityExamService.generateUniversityExamResult(universityExamId);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @GetMapping("/get/university-exam-result-overview/{universityExamId}")
    public ResponseEntity<UniversityExamResponse> getUniversityExamResultOverview(@PathVariable Long universityExamId,
                                                                                  @RequestParam(defaultValue = "0") int pageNumber,
                                                                                  @RequestParam(defaultValue = "10") int pageSize){
        UniversityExamResponse res = universityExamService.getUniversityExamResultOverview(universityExamId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
     }
}
