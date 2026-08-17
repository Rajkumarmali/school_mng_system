package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.university.StudentResponse;
import com.example.UniversityManagementSystem.dto.university.UniversityResponse;
import org.springframework.data.domain.Page;

public interface UniversityService {
  UniversityResponse getUniversityOveriew();
  Page<StudentResponse> getStudents(int pageNumber,int pageSize);
  Page<StudentResponse> getAdmissionStudent(int pageNumber,int pageSize);
  StudentResponse getStudentById(Long studentId);
}
