package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.college.CollegeRequest;
import com.example.UniversityManagementSystem.dto.college.CollegeResponse;
import com.example.UniversityManagementSystem.entity.College;

import java.util.List;

public interface CollegeServices {
    College createCollege(CollegeRequest dto,Long universityId);
    String updateCollege(CollegeRequest dto, Long id);
    List<CollegeResponse> getAllCollege();
    CollegeResponse getCollegeById(Long id);
    String deleteCollege(Long id);
}
