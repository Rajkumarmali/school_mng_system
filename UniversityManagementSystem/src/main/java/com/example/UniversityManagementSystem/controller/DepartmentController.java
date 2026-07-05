package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.department.*;
import com.example.UniversityManagementSystem.services.DepartmentServices;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    private final JwtProvider jwtProvider;
    private final DepartmentServices departmentServices;

    public DepartmentController(JwtProvider jwtProvider, DepartmentServices departmentServices) {
        this.jwtProvider = jwtProvider;
        this.departmentServices = departmentServices;
    }

    @PostMapping("/create-department")
    public ResponseEntity<String> createDepartment(@RequestHeader("Authorization") String jwt,
                                                   @RequestBody DepartmentRequest dto){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        String res = departmentServices.createDepartment(collegeId,dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/update-department/{id}")
    public ResponseEntity<String> updateDepartment(@PathVariable Long id,@RequestBody DepartmentRequest dto){
        String res = departmentServices.updateDepartment(id,dto);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/getall-department")
    public ResponseEntity<Page<DepartmentResponse>> getAllDepartment(@RequestHeader("Authorization") String jwt,
                                                                     @RequestParam(defaultValue = "0") int pageNumber,
                                                                     @RequestParam(defaultValue = "10") int pageSize){
             Long collegeId= jwtProvider.getCollegeIdFromToken(jwt);
             Page<DepartmentResponse> res = departmentServices.getAllDepartment(collegeId,pageNumber,pageSize);
             return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get-departmentbyid/{id}")
    public ResponseEntity<DepartmentResponse> getDepartmentById(@PathVariable Long id){
        DepartmentResponse res = departmentServices.getDepartmentById(id);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @DeleteMapping("/delete-department/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id){
        String res = departmentServices.deleteDepartment(id);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("get-departments-teacher/{id}")
    public ResponseEntity<Page<DepartmentTeacherResponse>> getDepartmentTeacher(@PathVariable Long id,
                                                                          @RequestParam(defaultValue = "0") int pageNumber,
                                                                          @RequestParam(defaultValue = "10") int pageSize){
         Page<DepartmentTeacherResponse> res = departmentServices.getDepartmentsTeacher(id,pageNumber,pageSize);
         return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("get-departments-student/{id}")
    public ResponseEntity<Page<DepartmentStudentsResponse>> getDepartmentStudent(@PathVariable Long id,
                                                                                 @RequestParam(defaultValue = "0") int pageNumber,
                                                                                 @RequestParam(defaultValue = "10") int pageSize){
        Page<DepartmentStudentsResponse> res = departmentServices.getDepartmentsStudents(id,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("get-departments-class/{id}")
    public ResponseEntity<Page<DepartmentClassResponse>> getDepartmentClasses(@PathVariable Long id,
                                                                              @RequestParam(defaultValue = "0") int pageNumber,
                                                                              @RequestParam(defaultValue = "10") int pageSize){
        Page<DepartmentClassResponse> res = departmentServices.getDepartmentsClasses(id,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
