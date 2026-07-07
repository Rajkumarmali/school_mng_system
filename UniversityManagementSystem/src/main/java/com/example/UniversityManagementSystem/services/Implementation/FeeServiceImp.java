package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.fee.FeeStructureRequest;
import com.example.UniversityManagementSystem.dto.fee.FeeStructureResponse;
import com.example.UniversityManagementSystem.dto.fee.FeeTypeRequest;
import com.example.UniversityManagementSystem.dto.fee.FeeTypeResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.Class;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.FeeServices;
import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeeServiceImp implements FeeServices {

    private final CollegeRepository collegeRepository;
    private final FeeTypeRepository feeTypeRepository;
    private final ClassRepository classRepository;
    private final DepartmentRepository departmentRepository;
    private final FeeStructureRepository feeStructureRepository;

    public FeeServiceImp(CollegeRepository collegeRepository,
                         FeeTypeRepository feeTypeRepository,
                         ClassRepository classRepository,
                         DepartmentRepository departmentRepository,
                         FeeStructureRepository feeStructureRepository) {
        this.collegeRepository = collegeRepository;
        this.feeTypeRepository = feeTypeRepository;
        this.classRepository = classRepository;
        this.departmentRepository = departmentRepository;
        this.feeStructureRepository = feeStructureRepository;
    }

    @Transactional
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
         @CacheEvict(cacheNames = "feeTypes",allEntries = true)
    })
    @Override
    public String createFeeType(Long collegeId, FeeTypeRequest dto) {
        College college = null;

        if (collegeId!=null) {
            college = collegeRepository.findById(collegeId).orElseThrow(() ->
                    new IllegalArgumentException("College not found"));
        }
        FeeType feeType = new FeeType();
        feeType.setName(dto.getName());
        feeType.setDescription(dto.getDescription());
        feeType.setCollege(college);
        feeType.setCreatedAt(LocalDateTime.now());
        feeTypeRepository.save(feeType);
        return "Create fee type successfully";
    }

    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeTypes",  key = "#collegeId == null ? 'UNKNOWN' : #collegeId")
    @Override
    public List<FeeTypeResponse> getAllFeeType(Long collegeId) {

        List<FeeType> feeTypes = feeTypeRepository.findByCollegeId(collegeId);

        List<FeeTypeResponse> responses = feeTypes.stream().map(fee->{
            FeeTypeResponse res = new FeeTypeResponse();
            res.setId(fee.getId());
            res.setName(fee.getName());
            res.setDescription(fee.getDescription());
            return res;
        }).toList();

        return responses;
    }

    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Cacheable(cacheNames = "feeType",key = "#feeTypeId")
    @Override
    public FeeTypeResponse getFeeTypeById(Long feeTypeId) {
        FeeType feeType = feeTypeRepository.findById(feeTypeId).orElseThrow(()->
                new IllegalArgumentException("Fee type not found"));
        FeeTypeResponse response = new FeeTypeResponse();
        response.setId(feeType.getId());
        response.setId(feeType.getId());
        response.setName(feeType.getName());
        response.setDescription(feeType.getDescription());
        return response;
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeTypes",allEntries = true),
            @CacheEvict(cacheNames = "feeType",key = "#feeTypeId")
    })
    public String updateFeeType(Long feeTypeId, FeeTypeRequest dto) {
        FeeType feeType = feeTypeRepository.findById(feeTypeId).orElseThrow(()->
                new IllegalArgumentException("Fee type not found"));
        feeType.setName(dto.getName());
        feeType.setDescription(dto.getDescription());
        feeType.setUpdatedAt(LocalDateTime.now());
        feeTypeRepository.save(feeType);
        return "Fee type update successfully";
    }

    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeTypes",allEntries = true),
            @CacheEvict(cacheNames = "feeType",key = "#feeTypeId")
    })
    public String deleteFeeType(Long feeTypeId) {
        FeeType feeType = feeTypeRepository.findById(feeTypeId).orElseThrow(()->
                new IllegalArgumentException("Fee type not found"));
        feeTypeRepository.delete(feeType);
        return "Fee Type delete successfully";
    }

    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeStructures",allEntries = true)
    })
    public String createFeeStructure(Long collegeId, FeeStructureRequest dto) {
        College college = null;
        if(collegeId!=null){
            college = collegeRepository.findById(collegeId).orElseThrow(()->
                    new IllegalArgumentException("College not found"));
        }

        Class clas = classRepository.findByClassCode(dto.getClassCode());
        Department department = departmentRepository.findByCode(dto.getDepartmentCode());
        FeeType feeType = feeTypeRepository.findById(dto.getFeeTypeId()).orElseThrow(()->
                new IllegalArgumentException("Fee Type not found"));

        FeeStructure feeStructure = new FeeStructure();

        feeStructure.setAmount(dto.getAmount());
        feeStructure.setAcademicYear(dto.getAcademicYear());
        feeStructure.setDescription(dto.getDescription());
        feeStructure.setCollege(college);
        feeStructure.setAClass(clas);
        feeStructure.setDepartment(department);
        feeStructure.setFeeType(feeType);
        feeStructure.setCreatedAt(LocalDateTime.now());

        feeStructureRepository.save(feeStructure);

        return "Fee Structure create successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeStructures",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<FeeStructureResponse> getAllFeeStructure(Long collegeId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<FeeStructure> feeStructures = feeStructureRepository.findByCollegeId(collegeId,pageable);
        Page<FeeStructureResponse> responses = feeStructures.map(fee->{
           FeeStructureResponse res = new FeeStructureResponse();
           res.setId(fee.getId());
           res.setAmount(fee.getAmount());
           res.setAcademicYear(fee.getAcademicYear());
           res.setDescription(fee.getDescription());
           if(fee.getFeeType()!=null)
               res.setFeeTypeName(fee.getFeeType().getName());
           if(fee.getAClass()!=null)
            res.setClassCode(fee.getAClass().getClassCode());
           if(fee.getDepartment()!=null)
            res.setDepartmentCode(fee.getDepartment().getCode());
           return res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeStructure",key = "#feeStructureId")
    public FeeStructureResponse getFeeStructureById(Long feeStructureId) {
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));

        FeeStructureResponse response = new FeeStructureResponse();
        response.setId(feeStructure.getId());
        response.setAmount(feeStructure.getAmount());
        response.setAcademicYear(feeStructure.getAcademicYear());
        response.setDescription(feeStructure.getDescription());
        if(feeStructure.getFeeType()!=null)
            response.setFeeTypeName(feeStructure.getFeeType().getName());
        if(feeStructure.getAClass()!=null) {
            response.setClassCode(feeStructure.getAClass().getClassCode());
            response.setClassName(feeStructure.getAClass().getName());
        }
        if(feeStructure.getDepartment()!=null){
         response.setDepartmentCode(feeStructure.getDepartment().getCode());
         response.setDepartmentName(feeStructure.getDepartment().getName());
        }
        return response;
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeStructures",allEntries = true),
            @CacheEvict(cacheNames = "feeStructure",key = "#feeStructureId")
    })
    public String updateFeeStructure(Long feeStructureId, FeeStructureRequest dto) {
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));
        feeStructure.setAmount(dto.getAmount());
        feeStructure.setDescription(dto.getDescription());
        feeStructure.setAcademicYear(dto.getAcademicYear());
        feeStructure.setUpdatedAt(LocalDateTime.now());

        feeStructureRepository.save(feeStructure);

        return "Fee Structure update successfully";
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeStructures",allEntries = true),
            @CacheEvict(cacheNames = "feeStructure",key = "#feeStructureId")
    })
    public String deleteFeeStructure(Long feeStructureId) {
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));
        feeStructureRepository.delete(feeStructure);
        return "Fee Structure delete successfully";
    }
}
