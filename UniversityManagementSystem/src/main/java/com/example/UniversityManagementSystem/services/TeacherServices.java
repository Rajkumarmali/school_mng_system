package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.teacher.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;


public interface TeacherServices {
     String createTeacher(Long collegeId, Long universityId, TeacherRequest dto, MultipartFile image);
     Page<TeacherResponse> getAllTeacher(Long collegeId,int pageNumber,int pageSize);
     String updateTeacher(Long teacherId,TeacherRequest dto);
     String deleteTeacher(Long teacherId);
     TeacherResponse getTeacherById(Long teacherId);
     String updateImage(Long teacherId,MultipartFile image);
     Page<TeacherClassResponse> getTeacherClasses(Long userId, int pageNumber, int pageSize);
     TeacherClassResponse getTeacherClassBySectionSubjectId(Long sectionSubjectId);
     Page<StudentSubjectResponse> getStudentsFromStudentSubjectBySectionSubjectId(Long sectionSubjectId, int pageNumber, int pageSize, LocalDate date);
     StudentSubjectResponse getStudentFromStudentSubjectByStudentSubjectId(Long studentSubjectId);
     String markStudentAttendance(Long studentSubjectId,StudentAttendanceRequest dto);
}
