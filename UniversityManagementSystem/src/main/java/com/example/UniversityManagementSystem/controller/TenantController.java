package com.example.UniversityManagementSystem.controller;


import com.example.UniversityManagementSystem.dto.tenant.TenantRequest;
import com.example.UniversityManagementSystem.dto.tenant.TenantResponse;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.services.TenantServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenant")
public class TenantController {

    private TenantServices tenantServices;

    public TenantController(TenantServices tenantServices) {
        this.tenantServices = tenantServices;
    }

    @PostMapping("/create-tenant")
    public ResponseEntity<College> createTenant(@RequestBody TenantRequest dto){
        College college =  tenantServices.createTenant(dto);
        return new ResponseEntity<College>(college, HttpStatus.CREATED);
    }

    @PostMapping("/update-tenant/{id}")
    public ResponseEntity<TenantResponse> updateTenant(@RequestBody TenantRequest dto, @PathVariable Long id){
        TenantResponse res = tenantServices.updateTenant(dto,id);
        return new ResponseEntity<TenantResponse>(res,HttpStatus.OK);
    }

    @GetMapping("/get-tenants")
    public ResponseEntity<List<TenantResponse>> getTenants(){
        List<TenantResponse> res = tenantServices.getAllTenant();
        return new ResponseEntity<List<TenantResponse>>(res,HttpStatus.OK);
    }

    @GetMapping("/get-tenant/{id}")
    public ResponseEntity<TenantResponse> getTenantById(@PathVariable Long id){
        TenantResponse res = tenantServices.getTenantById(id);
        return new ResponseEntity<TenantResponse>(res,HttpStatus.OK);
    }

}
