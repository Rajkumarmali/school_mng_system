package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.tenant.TenantRequest;
import com.example.UniversityManagementSystem.dto.tenant.TenantResponse;
import com.example.UniversityManagementSystem.entity.Roles;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.repository.RolesRepository;
import com.example.UniversityManagementSystem.repository.TenantRepository;
import com.example.UniversityManagementSystem.services.AuthService;
import com.example.UniversityManagementSystem.services.TenantServices;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TenantServicesImp implements TenantServices {

    private TenantRepository tenantRepository;
    private AuthService authService;
    private RolesRepository rolesRepository;

    public TenantServicesImp(TenantRepository tenantRepository, AuthService authService, RolesRepository rolesRepository) {
        this.tenantRepository = tenantRepository;
        this.authService = authService;
        this.rolesRepository = rolesRepository;
    }

    @Transactional
    @Override
    public College createTenant(TenantRequest dto) {
        College college = new College();
        college.setName(dto.getTenantName());
        college.setCreatedAt(LocalDateTime.now());

        College savedTenent =  tenantRepository.save(college);

        Roles roles = new Roles();
        roles.setName("ADMIN");
        roles.setTenant(savedTenent);
        roles.setCreatedAt(LocalDateTime.now());

        rolesRepository.save(roles);

//        authService.createUser(dto.getEmail(),savedTenent,"ADMIN");

        return savedTenent;
    }

    @Override
    public TenantResponse updateTenant(TenantRequest dto, Long id) {
        College college = tenantRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Tenant not found"));
        college.setName(dto.getTenantName());
        college.setUpdatedAt(LocalDateTime.now());
        College updateCollege = tenantRepository.save(college);

        TenantResponse res= new TenantResponse();
        res.setTenantName(updateCollege.getName());
        res.setId(updateCollege.getId());

        return res;
    }

    @Override
    public List<TenantResponse> getAllTenant() {
        List<College> colleges = tenantRepository.findAll();

        List<TenantResponse> res = colleges.stream().map(tenant -> {
            TenantResponse response = new TenantResponse();
            response.setId(tenant.getId());
            response.setTenantName(tenant.getName());
            return response;
        }).toList();

        return res;
    }

    @Override
    public TenantResponse getTenantById(Long id) {
        College college = tenantRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Tenant not found"));
        TenantResponse res = new TenantResponse(college.getId(), college.getName());
        return res;
    }

}
