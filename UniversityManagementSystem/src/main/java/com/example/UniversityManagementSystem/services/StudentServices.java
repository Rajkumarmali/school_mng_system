package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.student.DocumentRequest;
import com.example.UniversityManagementSystem.dto.student.DocumentResponse;
import com.example.UniversityManagementSystem.dto.student.StudentRequest;
import com.example.UniversityManagementSystem.dto.student.StudentResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentServices {
    String createStudent(Long collegeId, Long universityId,StudentRequest dto, MultipartFile image);
    Page<StudentResponse> getAllStudent(Long collegeId,int pageNumber,int pageSize);
    StudentResponse getStudentById(Long studentId);
    String updateStudent(Long studentId,StudentRequest dto);
    String deleteStudent(Long studentId);
    String UpdateImage(Long studentId,MultipartFile image);
    String uploadDocument(Long studentId, DocumentRequest dto,MultipartFile file);
    String updateDocument(Long documentId,DocumentRequest dto,MultipartFile file);
    String deleteDocument(Long documentId);
    List<DocumentResponse> getStudentDocument(Long studentId);
    DocumentResponse getStudentDocumentById(Long documentId);
}
