package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.teacher.TeacherRequest;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;


public interface TeacherServices {
     String createTeacher(Long collegeId, Long universityId, TeacherRequest dto, MultipartFile image);
     Page<TeacherResponse> getAllTeacher(Long collegeId,int pageNumber,int pageSize);
     String updateTeacher(Long teacherId,TeacherRequest dto);
     String deleteTeacher(Long teacherId);
     TeacherResponse getTeacherById(Long teacherId);
     String updateImage(Long teacherId,MultipartFile image);
}
