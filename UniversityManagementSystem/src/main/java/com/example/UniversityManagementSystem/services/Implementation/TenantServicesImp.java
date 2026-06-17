package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.tenant.TenantRequest;
import com.example.UniversityManagementSystem.dto.tenant.TenantResponse;
import com.example.UniversityManagementSystem.entity.Roles;
import com.example.UniversityManagementSystem.entity.Tenant;
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
    public Tenant createTenant(TenantRequest dto) {
        Tenant tenant = new Tenant();
        tenant.setName(dto.getTenantName());
        tenant.setCreatedAt(LocalDateTime.now());

        Tenant savedTenent =  tenantRepository.save(tenant);

        Roles roles = new Roles();
        roles.setName("ADMIN");
        roles.setTenant(savedTenent);
        roles.setCreatedAt(LocalDateTime.now());

        rolesRepository.save(roles);

        authService.createUser(dto.getEmail(),savedTenent,"ADMIN");

        return savedTenent;
    }

    @Override
    public TenantResponse updateTenant(TenantRequest dto, Long id) {
        Tenant tenant = tenantRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Tenant not found"));
        tenant.setName(dto.getTenantName());
        tenant.setUpdatedAt(LocalDateTime.now());
        Tenant updateTenant= tenantRepository.save(tenant);

        TenantResponse res= new TenantResponse();
        res.setTenantName(updateTenant.getName());
        res.setId(updateTenant.getId());

        return res;
    }

    @Override
    public List<TenantResponse> getAllTenant() {
        List<Tenant> tenants = tenantRepository.findAll();

        List<TenantResponse> res = tenants.stream().map(tenant -> {
            TenantResponse response = new TenantResponse();
            response.setId(tenant.getId());
            response.setTenantName(tenant.getName());
            return response;
        }).toList();

        return res;
    }

}
