package com.example.UniversityManagementSystem.repository;

import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.FeeStructure;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.StudentFee;
import com.example.UniversityManagementSystem.entity.type.StudentFeeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentFeeRepository extends JpaRepository<StudentFee, Long> { Page<StudentFee> findByFeeStructureId(Long feeStructureId, Pageable pageable);

    Page<StudentFee> findByFeeStructure(FeeStructure feeStructure, Pageable pageable);

    Page<StudentFee> findByFeeStructureAndStatus(FeeStructure feeStructure, StudentFeeStatus studentFeeStatus, Pageable pageable);

    Page<StudentFee> findByStudentId(Long studentId, Pageable pageable);

    Page<StudentFee> findByStudentAndStatus(Student student, StudentFeeStatus studentFeeStatus, Pageable pageable);

    List<StudentFee> findByFeeStructureCollege(College college);
}