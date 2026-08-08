package com.example.UniversityManagementSystem.controller;


import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.college.CollegeRequest;
import com.example.UniversityManagementSystem.dto.college.CollegeResponse;
import com.example.UniversityManagementSystem.dto.college.CollegeStudentResponse;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.services.CollegeServices;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/college")
public class CollegeController {

    private final CollegeServices collegeServices;
    private final JwtProvider jwtProvider;

    public CollegeController(CollegeServices collegeServices, JwtProvider jwtProvider) {
        this.collegeServices = collegeServices;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/create-college")
    public ResponseEntity<College> createCollege(@RequestHeader("Authorization") String jwt,
                                                 @RequestBody CollegeRequest dto){
        Long universityId= jwtProvider.getUniversityIdFromToken(jwt);
        College college =  collegeServices.createCollege(dto,universityId);
        return new ResponseEntity<College>(college, HttpStatus.CREATED);
    }

    @PostMapping("/update-college/{id}")
    public ResponseEntity<String> updateCollege(@RequestBody CollegeRequest dto, @PathVariable Long id){
        String res = collegeServices.updateCollege(dto,id);
        return new ResponseEntity<String>(res,HttpStatus.OK);
    }

    @GetMapping("/get-college")
    public ResponseEntity<Page<CollegeResponse>> getCollege(@RequestParam(defaultValue = "0") int pageNumber,
                                                            @RequestParam(defaultValue = "5") int pageSize){
        Page<CollegeResponse> res = collegeServices.getAllCollege(pageNumber,pageSize);
        return new ResponseEntity<Page<CollegeResponse>>(res,HttpStatus.OK);
    }

    @GetMapping("/get-college/{id}")
    public ResponseEntity<CollegeResponse> getCollegeById(@PathVariable Long id){
        CollegeResponse res = collegeServices.getCollegeById(id);
        return new ResponseEntity<CollegeResponse>(res,HttpStatus.OK);
    }

    @DeleteMapping("/delete-college/{id}")
    public ResponseEntity<String> deleteCollege(@PathVariable Long id){
        String res = collegeServices.deleteCollege(id);
        return new ResponseEntity<String>(res,HttpStatus.OK);
    }

    @PostMapping("/assign/course/{collegeId}")
    public ResponseEntity<String> assignCourseToCollege(@PathVariable Long collegeId,
                                                        @RequestBody String courseCode){
        String res = collegeServices.assignCourseToCollege(collegeId,courseCode);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @GetMapping("get/college/students/{collegeId}")
    public ResponseEntity<Page<CollegeStudentResponse>> getCollegesStudents(@PathVariable Long collegeId,
                                                                            @RequestParam(defaultValue = "0") int pageNumber,
                                                                            @RequestParam(defaultValue = "10") int pageSize){
        Page<CollegeStudentResponse> res = collegeServices.getCollegeStudent(collegeId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("get/college/admission/{collegeId}")
    public ResponseEntity<Page<CollegeStudentResponse>> getCollegeAdmission(@PathVariable Long collegeId,
                                                                            @RequestParam(defaultValue = "0") int pageNumber,
                                                                            @RequestParam(defaultValue = "10") int pageSize){
        Page<CollegeStudentResponse> res = collegeServices.getCollegeAdmission(collegeId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/studentbyid/{studentId}")
    public ResponseEntity<CollegeStudentResponse> getCollegeStudentById(@PathVariable Long studentId){
        CollegeStudentResponse res = collegeServices.getStudentById(studentId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/generate/enrollmentandroll/{studentId}")
    public ResponseEntity<String> generateEnrollmentAndRollNumber(@PathVariable Long studentId){
        String res = collegeServices.generateEnrollmentNumberAndRollNumber(studentId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
