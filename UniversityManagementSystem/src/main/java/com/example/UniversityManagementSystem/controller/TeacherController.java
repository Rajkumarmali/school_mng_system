package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.teacher.TeacherRequest;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;
import com.example.UniversityManagementSystem.entity.Teacher;
import com.example.UniversityManagementSystem.services.TeacherServices;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    private final TeacherServices teacherServices;
    private final JwtProvider jwtProvider;

    public TeacherController(TeacherServices teacherServices, JwtProvider jwtProvider) {
        this.teacherServices = teacherServices;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping(value = "/create-teacher",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createTeacher(@RequestHeader("Authorization") String jwt,
                                                @RequestPart(value = "image",required = false) MultipartFile image,
                                                @RequestPart("teacher") TeacherRequest dto){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        Long universityId= jwtProvider.getUniversityIdFromToken(jwt);
        String res = teacherServices.createTeacher(collegeId,universityId,dto,image);
        return new ResponseEntity<String>(res, HttpStatus.CREATED);
    }

    @GetMapping("/get-allteachers")
    public ResponseEntity<Page<TeacherResponse>> getAllTeacher(@RequestHeader("Authorization") String jwt,
                                                               @RequestParam(defaultValue = "0") int pageNumber,
                                                               @RequestParam(defaultValue = "10") int pageSize){
        Long collegeId= jwtProvider.getCollegeIdFromToken(jwt);
        Page<TeacherResponse> res = teacherServices.getAllTeacher(collegeId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
    @PostMapping("/update-teacher/{id}")
    public ResponseEntity<String> updateTeacher(@PathVariable Long id,@RequestBody TeacherRequest dto){
        String res = teacherServices.updateTeacher(id,dto);
        return new ResponseEntity<String>(res,HttpStatus.OK);
    }
    @DeleteMapping("/delete-teacher/{id}")
    public ResponseEntity<String> deleteTeacher(@PathVariable Long id){
        String res = teacherServices.deleteTeacher(id);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get-teacherbyid/{id}")
    public ResponseEntity<TeacherResponse> getTeacherById(@PathVariable Long id){
        TeacherResponse res = teacherServices.getTeacherById(id);
        return  new ResponseEntity<TeacherResponse>(res,HttpStatus.OK);
    }

    @PostMapping(value = "/update-image/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateImage(@PathVariable Long id,
                                              @RequestPart(value = "image",required = false) MultipartFile image){
        String res = teacherServices.updateImage(id,image);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }


}
