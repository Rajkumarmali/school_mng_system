package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.student.StudentRequest;
import com.example.UniversityManagementSystem.dto.student.StudentResponse;

import java.util.List;

public interface StudentServices {
   public String createStudent(Long tenantId, StudentRequest dto);
   public List<StudentResponse> getAllStudent(Long tenantId);
   public StudentResponse getStudentById(Long studentId);
   public String updateStudent(Long studentId,StudentRequest dto);
   public String deleteStudent(Long studentId);
}
