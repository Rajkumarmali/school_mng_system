package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.student.DocumentRequest;
import com.example.UniversityManagementSystem.dto.student.DocumentResponse;
import com.example.UniversityManagementSystem.dto.student.StudentRequest;
import com.example.UniversityManagementSystem.dto.student.StudentResponse;
import com.example.UniversityManagementSystem.services.StudentServices;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentServices studentServices;
    private final JwtProvider jwtProvider;

    public StudentController(StudentServices studentServices, JwtProvider jwtProvider) {
        this.studentServices = studentServices;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping(value = "/create-student",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createStudent(@RequestHeader("Authorization") String jwt,
                                                @RequestPart("student") StudentRequest dto,
                                                @RequestPart(value = "image",required = false)MultipartFile image){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        Long universityId = jwtProvider.getUniversityIdFromToken(jwt);
        String res = studentServices.createStudent(collegeId,universityId,dto,image);
        return new ResponseEntity<String>(res, HttpStatus.CREATED);
    }

    @GetMapping("/get-allstudent")
    public ResponseEntity<Page<StudentResponse>> getAllStudent(@RequestHeader("Authorization") String jwt,
                                                               @RequestParam(defaultValue = "0") int pageNumber,
                                                               @RequestParam(defaultValue = "10") int pageSize){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        Page<StudentResponse> res = studentServices.getAllStudent(collegeId,pageNumber,pageSize);
        return new ResponseEntity<Page<StudentResponse>>(res, HttpStatus.OK);
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

    @PostMapping(value = "/update-image/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateImage(@PathVariable Long id,
                                              @RequestPart("image") MultipartFile image){
         String res = studentServices.UpdateImage(id,image);
         return new ResponseEntity<String>(res,HttpStatus.OK);
    }

    @PostMapping(value = "/upload/document/{studentId}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadDocument(@PathVariable Long studentId,
                                                 @RequestPart("document") DocumentRequest dto,
                                                 @RequestPart("file") MultipartFile file){
        String res = studentServices.uploadDocument(studentId,dto,file);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @PostMapping(value = "/update/document/{documentId}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateDocument(@PathVariable Long documentId,
                                                 @RequestPart("document") DocumentRequest dto,
                                                 @RequestPart("file") MultipartFile file){
        String res = studentServices.updateDocument(documentId,dto,file);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/document/{documentId}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long documentId){
        String res = studentServices.deleteDocument(documentId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/alldocuments/{studentId}")
    public ResponseEntity<List<DocumentResponse>> getAllDocumentByStudentId(@PathVariable Long studentId){
        List<DocumentResponse> res = studentServices.getStudentDocument(studentId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/documents/{documentId}")
    public ResponseEntity<DocumentResponse> getDocumentById(@PathVariable Long documentId){
      DocumentResponse res = studentServices.getStudentDocumentById(documentId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
