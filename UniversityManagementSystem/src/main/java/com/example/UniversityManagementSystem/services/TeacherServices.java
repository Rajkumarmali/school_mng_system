package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.teacher.TeacherRequest;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;

import java.util.List;

public interface TeacherServices {
    public String createTeacher(Long tenantId,TeacherRequest dto);
    public List<TeacherResponse> getAllTeacher(Long tenantId);
    public String updateTeacher(Long teacherId,TeacherRequest dto);
    public String deleteTeacher(Long teacherId);
    public TeacherResponse getTeacherById(Long teacherId);
}
