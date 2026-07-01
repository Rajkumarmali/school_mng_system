package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.department.DepartmentRequest;
import com.example.UniversityManagementSystem.dto.department.DepartmentResponse;
import org.springframework.data.domain.Page;

public interface DepartmentServices {
    String createDepartment(Long collegeId,DepartmentRequest dto);
    String updateDepartment(Long departmentId,DepartmentRequest dto);
    Page<DepartmentResponse> getAllDepartment(Long collegeId,int pageNumber,int pageSize);
    DepartmentResponse getDepartmentById(Long departmentId);
    String deleteDepartment(Long departmentId);
}
