package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.scholarship.*;
import com.example.UniversityManagementSystem.entity.type.ScholarshipStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ScholarshipService {
     String create(Long collegeId,ScholarshipRequest dto);
     String update(Long scholarshipId,ScholarshipRequest dto);
     Page<ScholarshipResponse> getScholarships(Long collegeId,int pageNumber,int pageSize);
     String assignScholarshipToStudent(Long scholarshipId, List<ScholarshipStudentRequest> dto);
     String removeStudentFromScholarship(Long studentId,Long scholarshipId);
     StudentScholarshipResponse getStudentScholarship(Long studentId,int pageNumber,int pageSize);
     ScholarshipStudentResponse getScholarshipStudent(Long scholarshipId,int pageNumber,int pageSize);
}
