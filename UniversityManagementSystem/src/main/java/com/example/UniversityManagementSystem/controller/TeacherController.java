package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.teacher.TeacherRequest;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;
import com.example.UniversityManagementSystem.entity.Teacher;
import com.example.UniversityManagementSystem.services.TeacherServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    private TeacherServices teacherServices;
    private JwtProvider jwtProvider;

    public TeacherController(TeacherServices teacherServices, JwtProvider jwtProvider) {
        this.teacherServices = teacherServices;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/create-teacher")
    public ResponseEntity<String> createTeacher(@RequestHeader("Authorization") String jwt, @RequestBody TeacherRequest dto){
        Long tenantId = jwtProvider.getCollegeIdFromToken(jwt);
        String res = teacherServices.createTeacher(tenantId,dto);
        return new ResponseEntity<String>(res, HttpStatus.CREATED);
    }

    @GetMapping("/get-allteachers")
    public ResponseEntity<List<TeacherResponse>> getAllTeachere(@RequestHeader("Authorization") String jwt){
        Long tenantId= jwtProvider.getCollegeIdFromToken(jwt);
        List<TeacherResponse> res = teacherServices.getAllTeacher(tenantId);
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


}
