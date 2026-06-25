package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.teacher.TeacherRequest;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TeacherServices {
     String createTeacher(Long collegeId,Long universityId,TeacherRequest dto);
     Page<TeacherResponse> getAllTeacher(Long collegeId,int pageNumber,int pageSize);
     String updateTeacher(Long teacherId,TeacherRequest dto);
     String deleteTeacher(Long teacherId);
     TeacherResponse getTeacherById(Long teacherId);
}
