package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.college.CollegeRequest;
import com.example.UniversityManagementSystem.dto.college.CollegeResponse;
import com.example.UniversityManagementSystem.entity.College;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CollegeServices {
    College createCollege(CollegeRequest dto,Long universityId);
    String updateCollege(CollegeRequest dto, Long id);
    Page<CollegeResponse> getAllCollege(int pageNumber,int pageSize);
    CollegeResponse getCollegeById(Long id);
    String deleteCollege(Long id);
}
