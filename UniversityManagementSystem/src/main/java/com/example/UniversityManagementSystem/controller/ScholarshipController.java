package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.scholarship.*;
import com.example.UniversityManagementSystem.entity.type.ScholarshipStatus;
import com.example.UniversityManagementSystem.services.ScholarshipService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scholarship")
public class ScholarshipController {

    private final ScholarshipService scholarshipService;
    private final JwtProvider jwtProvider;

    public ScholarshipController(ScholarshipService scholarshipService, JwtProvider jwtProvider) {
        this.scholarshipService = scholarshipService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/create")
    private ResponseEntity<String> createScholarship(@RequestHeader("Authorization") String jwt,
                                                     @RequestBody ScholarshipRequest dto){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        String res = scholarshipService.create(collegeId,dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/update/{scholarshipId}")
    private ResponseEntity<String> updateScholarship(@PathVariable Long scholarshipId,
                                                     @RequestBody ScholarshipRequest dto){
        String res = scholarshipService.update(scholarshipId,dto);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get")
    private ResponseEntity<Page<ScholarshipResponse>> getAllScholarship(@RequestHeader("Authorization") String jwt,
                                                                        @RequestParam(defaultValue = "0") int pageNumber,
                                                                        @RequestParam(defaultValue = "10") int pageSize){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        Page<ScholarshipResponse> res = scholarshipService.getScholarships(collegeId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/assign/student/{scholarshipId}")
    private ResponseEntity<String> assignScholarshipToStudent(@PathVariable Long scholarshipId,
                                                              @RequestBody List<ScholarshipStudentRequest> dto){
        String res = scholarshipService.assignScholarshipToStudent(scholarshipId,dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping("/remove/student/{studentId}/{scholarshipId}")
    private ResponseEntity<String> removeStudentFromScholarship(@PathVariable Long studentId,
                                                                @PathVariable Long scholarshipId){
        String res = scholarshipService.removeStudentFromScholarship(studentId,scholarshipId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/student/scholarship/{studentId}")
    private ResponseEntity<StudentScholarshipResponse> getStudentScholarship(@PathVariable Long studentId,
                                                                             @RequestParam(defaultValue = "0") int pageNumber,
                                                                             @RequestParam(defaultValue = "10") int pageSize ){
        StudentScholarshipResponse res = scholarshipService.getStudentScholarship(studentId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/scholarship/student/{scholarshipId}")
    private ResponseEntity<ScholarshipStudentResponse> getScholarshipStudent(@PathVariable Long scholarshipId,
                                                                             @RequestParam(defaultValue = "0") int pageNumber,
                                                                             @RequestParam(defaultValue = "10") int pageSize ){
        ScholarshipStudentResponse res = scholarshipService.getScholarshipStudent(scholarshipId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
