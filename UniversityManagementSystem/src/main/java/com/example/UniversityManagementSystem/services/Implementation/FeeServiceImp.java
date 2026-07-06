package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.fee.FeeTypeRequest;
import com.example.UniversityManagementSystem.dto.fee.FeeTypeResponse;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.FeeType;
import com.example.UniversityManagementSystem.repository.CollegeRepository;
import com.example.UniversityManagementSystem.repository.FeeTypeRepository;
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

    public FeeServiceImp(CollegeRepository collegeRepository,
                         FeeTypeRepository feeTypeRepository) {
        this.collegeRepository = collegeRepository;
        this.feeTypeRepository = feeTypeRepository;
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
}
