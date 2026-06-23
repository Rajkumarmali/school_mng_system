package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.student.StudentRequest;
import com.example.UniversityManagementSystem.dto.student.StudentResponse;
import com.example.UniversityManagementSystem.services.StudentServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private StudentServices studentServices;
    private JwtProvider jwtProvider;

    public StudentController(StudentServices studentServices, JwtProvider jwtProvider) {
        this.studentServices = studentServices;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/create-student")
    public ResponseEntity<String> createStudent(@RequestHeader("Authorization") String jwt,@RequestBody StudentRequest dto){
        Long tenantId = jwtProvider.getTenantIdFromToken(jwt);
        String res = studentServices.createStudent(tenantId,dto);
        return new ResponseEntity<String>(res, HttpStatus.CREATED);
    }

    @GetMapping("/get-allstudent")
    public ResponseEntity<List<StudentResponse>> getAllStudent(@RequestHeader("Authorization") String jwt){
        Long tenantId = jwtProvider.getTenantIdFromToken(jwt);
        List<StudentResponse> res = studentServices.getAllStudent(tenantId);
        return new ResponseEntity<List<StudentResponse>>(res, HttpStatus.OK);
    }

    @GetMapping("/get-studentbyid/{id}")
    public ResponseEntity<StudentResponse> getStudentByID(@PathVariable Long id){
        StudentResponse res = studentServices.getStudentById(id);
        return new ResponseEntity<StudentResponse>(res, HttpStatus.CREATED);
    }

    @PostMapping("/update-student/{id}")
    public ResponseEntity<String> createStudent(@PathVariable Long id,@RequestBody  StudentRequest dto){
        String res = studentServices.updateStudent(id,dto);
        return new ResponseEntity<String>(res, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-student/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id){
        String res = studentServices.deleteStudent(id);
        return new ResponseEntity<String>(res, HttpStatus.CREATED);
    }
}
