package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.fee.FeeTypeRequest;
import com.example.UniversityManagementSystem.dto.fee.FeeTypeResponse;
import com.example.UniversityManagementSystem.services.FeeServices;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fee")
public class FeeController {

    private final FeeServices feeServices;
    private final JwtProvider jwtProvider;

    public FeeController(FeeServices feeServices, JwtProvider jwtProvider) {
        this.feeServices = feeServices;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createFeeType(@RequestHeader("Authorization") String jwt,
                                                @RequestBody FeeTypeRequest dto){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        String res = feeServices.createFeeType(collegeId,dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
    @GetMapping("/get-all")
    public ResponseEntity<List<FeeTypeResponse>> getAllFeeType(@RequestHeader("Authorization") String jwt){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        List<FeeTypeResponse> res= feeServices.getAllFeeType(collegeId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get-byid/{id}")
    public ResponseEntity<FeeTypeResponse> getFeeTypeById(@PathVariable Long id){
        FeeTypeResponse res= feeServices.getFeeTypeById(id);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<String> updateFeeType(@PathVariable Long id,
                                                @RequestBody FeeTypeRequest dto){
        String res = feeServices.updateFeeType(id,dto);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFeeType(@PathVariable Long id){
        String res = feeServices.deleteFeeType(id);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
