package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.section.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SectionService {
    String createSection(Long userId, SectionRequest dto);
    String updateSection(Long sectionId,SectionRequest dto);
    String deleteSection(Long sectionId);
    Page<SectionResponse> getAllSection(Long collegeId, int pageNumber, int pageSize);
    Page<SectionResponse> getAllSectionByDepartment(Long userId, int pageNumber, int pageSize);
    SectionResponse getSectionById(Long sectionId);
    String addStudentInSection(Long sectionId, List<SectionStudentRequest> dto);
    String deleteStudentFromSection(Long sectionId,Long studentId);
    Page<SectionStudentResponse> getAllStudentFromSection(Long sectionId, int pageNumber, int pageSize);
    String addSubjectInSection(Long sectionId, SectionSubjectRequest dto);
    Page<SectionSubjectResponse>  getAllSectionSubject(Long sectionId,int pageNumber,int pageSize);
    SectionSubjectResponse getSectionSubjectById(Long sectionSubjectId);
    String updateSubjectTeacher(Long sectionSubjectId, SectionSubjectRequest dto);
    String addStudentInSectionSubject(Long sectionSubjectId, List<SectionStudentRequest> dto);
    Page<SectionStudentResponse> getAllStudentFromSectionSubject(Long sectionSubjectId,int pageNumber,int pageSize);
}
