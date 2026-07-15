package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.fee.*;
import com.razorpay.RazorpayException;
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
    Page<StudentFeeResponse> getFeeStructureAllStudent(Long feeStructureId, int pageNumber, int pageSize);
    Page<StudentFeeResponse> getAllPaidStudent(Long feeStructureId, int pageNumber, int pageSize);
    Page<StudentFeeResponse> getAllUnPaidStudent(Long feeStructureId, int pageNumber, int pageSize);
    StudentFeeResponse getStudentFeeById(Long studentFeeId);
    Page<StudentFeeResponse> getStudentFeeByStudentI(Long studentId,int pageNumber, int pageSize);
    Page<StudentResponse> getStudents(Long collegeId,int pageNumber,int pageSize);
    StudentResponse getStudentById(Long studentId);
    Page<StudentFeeResponse> getPayments(Long collegeId,int pageNumber,int pageSize);
    StudentFeeResponse getPaymentById(Long paymentId);
    String payFeeByCash(Long studentFeeId);
    Page<StudentFeeResponse> getPaidStudentFeeByStudent(Long userId,int pageNumber,int pageSize);
    Page<StudentFeeResponse> getUnpaidStudentFeeByStudent(Long userId,int pageNumber,int pageSize);
    StudentResponse getFeeOverviewForStudent(Long userId);
    PaymentLinkResponse payFeeByRazorPay(Long studentFeeId) throws RazorpayException;
    String redirect(String paymentId,Long studentFeeId);
}
