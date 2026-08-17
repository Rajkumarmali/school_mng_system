package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.dto.university.StudentResponse;
import com.example.UniversityManagementSystem.dto.university.UniversityResponse;
import com.example.UniversityManagementSystem.services.UniversityService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/university")
public class UniversityController {

    private final UniversityService universityService;

    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping("/get")
    public ResponseEntity<UniversityResponse> getUniversityOverview(){
        UniversityResponse res = universityService.getUniversityOveriew();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get/students")
    public ResponseEntity<Page<StudentResponse>> getStudents(@RequestParam(defaultValue = "0") int pageNumber,
                                                             @RequestParam(defaultValue = "10") int pageSize){
        Page<StudentResponse> res = universityService.getStudents(pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/admission/students")
    public ResponseEntity<Page<StudentResponse>> getAdmissionStudents(@RequestParam(defaultValue = "0") int pageNumber,
                                                             @RequestParam(defaultValue = "10") int pageSize){
        Page<StudentResponse> res = universityService.getAdmissionStudent(pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
    @GetMapping("/get/student/{studentId}")
    public ResponseEntity<StudentResponse> getStudentById(@PathVariable Long studentId){
        StudentResponse res = universityService.getStudentById(studentId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
