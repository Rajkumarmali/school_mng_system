package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.course.CourseDepartmentResponse;
import com.example.UniversityManagementSystem.dto.course.CourseRequest;
import com.example.UniversityManagementSystem.dto.course.CourseResponse;
import com.example.UniversityManagementSystem.dto.course.CourseStudentResponse;
import com.example.UniversityManagementSystem.services.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/course")
public class CourseController {

    private final JwtProvider jwtProvider;
    private final CourseService courseService;

    public CourseController(JwtProvider jwtProvider, CourseService courseService) {
        this.jwtProvider = jwtProvider;
        this.courseService = courseService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCoures(@RequestBody CourseRequest dto){
        String res= courseService.createCourse(dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/update/{courseId}")
    public ResponseEntity<String> updateCourse(@PathVariable Long courseId,
                                               @RequestBody CourseRequest dto){
        String res = courseService.updateCourse(courseId,dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping("/get/allcourse")
    public ResponseEntity<Page<CourseResponse>> getAllCourse(@RequestParam(defaultValue = "0") int pageNumber,
                                                             @RequestParam(defaultValue = "10") int pageSize){
        Page<CourseResponse> res = courseService.getAllCourse(pageNumber,pageSize);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get/bycollege")
    public ResponseEntity<Page<CourseResponse>> getByCollege(@RequestHeader("Authorization") String jwt,
                                                              @RequestParam(defaultValue = "0") int pageNumber,
                                                             @RequestParam(defaultValue = "10") int pageSize){

        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        Page<CourseResponse> res = courseService.getCourseByCollege(collegeId,pageNumber,pageSize);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get/coursebyid/{courseId}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable Long courseId){
        CourseResponse res = courseService.getCourseById(courseId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get/all/department/{courseId}")
    public ResponseEntity<Page<CourseDepartmentResponse>> getAllDepartmentByCourseId(@PathVariable Long courseId,
                                                                               @RequestParam(defaultValue = "0") int pageNumber,
                                                                               @RequestParam(defaultValue = "10") int pageSize){
        Page<CourseDepartmentResponse> res = courseService.getDepartmentsByCourseId(courseId,pageNumber,pageSize);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get/all/student/{courseId}")
    public ResponseEntity<Page<CourseStudentResponse>> getAllStudentByCourseId(@PathVariable Long courseId,
                                                                               @RequestParam(defaultValue = "0") int pageNumber,
                                                                               @RequestParam(defaultValue = "10") int pageSize){
        Page<CourseStudentResponse> res = courseService.getStudentByCourseId(courseId,pageNumber,pageSize);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
