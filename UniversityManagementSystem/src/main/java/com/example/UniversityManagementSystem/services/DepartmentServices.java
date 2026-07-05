package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.department.*;
import org.springframework.data.domain.Page;

public interface DepartmentServices {
    String createDepartment(Long collegeId,DepartmentRequest dto);
    String updateDepartment(Long departmentId,DepartmentRequest dto);
    Page<DepartmentResponse> getAllDepartment(Long collegeId,int pageNumber,int pageSize);
    DepartmentResponse getDepartmentById(Long departmentId);
    String deleteDepartment(Long departmentId);
    Page<DepartmentTeacherResponse> getDepartmentsTeacher(Long departmentId,int pageNumber,int pageSize);
    Page<DepartmentStudentsResponse> getDepartmentsStudents(Long departmentId,int pageNumber,int pageSize);
    Page<DepartmentClassResponse> getDepartmentsClasses(Long departmentId,int pageNumber,int pageSize);
}
