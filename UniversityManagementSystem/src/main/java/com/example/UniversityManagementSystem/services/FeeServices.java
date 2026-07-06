package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.fee.FeeTypeRequest;
import com.example.UniversityManagementSystem.dto.fee.FeeTypeResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FeeServices {
    String createFeeType(Long collegeId, FeeTypeRequest dto);
    List<FeeTypeResponse> getAllFeeType(Long collegeId);
    FeeTypeResponse getFeeTypeById(Long feeTypeId);
    String updateFeeType(Long feeTypeId,FeeTypeRequest dto);
    String deleteFeeType(Long feeTypeId);
}
