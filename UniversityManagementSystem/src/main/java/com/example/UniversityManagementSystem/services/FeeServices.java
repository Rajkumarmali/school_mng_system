package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.fee.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FeeServices {
    String createFeeType(Long collegeId, FeeTypeRequest dto);
    List<FeeTypeResponse> getAllFeeType(Long collegeId);
    FeeTypeResponse getFeeTypeById(Long feeTypeId);
    String updateFeeType(Long feeTypeId,FeeTypeRequest dto);
    String deleteFeeType(Long feeTypeId);
    String createFeeStructure(Long collegeId, FeeStructureRequest dto);
    Page<FeeStructureResponse> getAllFeeStructure(Long collegeId,int pageNumber,int pageSize);
    FeeStructureResponse getFeeStructureById(Long feeStructureId);
    String updateFeeStructure(Long feeStructureId,FeeStructureRequest dto);
    String deleteFeeStructure(Long feeStructureId);
    Page<FeeStudentResponse> getAllStudent(Long feeStructureId,int pageNumber,int pageSize);
    Page<FeeStudentResponse> getAllPaidStudent(Long feeStructureId,int pageNumber,int pageSize);
    Page<FeeStudentResponse> getAllUnPaidStudent(Long feeStructureId,int pageNumber,int pageSize);
}
