package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.course.CourseDepartmentResponse;
import com.example.UniversityManagementSystem.dto.course.CourseRequest;
import com.example.UniversityManagementSystem.dto.course.CourseResponse;
import com.example.UniversityManagementSystem.dto.course.CourseStudentResponse;
import org.springframework.data.domain.Page;

public interface CourseService {
    String createCourse(Long collegeId,CourseRequest dto);
    String updateCourse(Long courseId,CourseRequest dto);
    Page<CourseResponse> getAllCourse(Long collegeId,int pageNumber,int pageSize);
    CourseResponse getCourseById(Long courseId);
    Page<CourseDepartmentResponse> getDepartmentsByCourseId(Long courseId,int pageNumber,int pageSize);
    Page<CourseStudentResponse> getStudentByCourseId(Long courseId,int pageNumber,int pageSize);
}
