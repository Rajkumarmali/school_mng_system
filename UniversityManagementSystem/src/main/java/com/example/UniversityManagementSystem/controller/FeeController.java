package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.fee.FeeStructureRequest;
import com.example.UniversityManagementSystem.dto.fee.FeeStructureResponse;
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

    @PostMapping("/create-feestructure")
    public ResponseEntity<String> createFeeStructure(@RequestHeader("Authorization") String jwt,
                                                     @RequestBody FeeStructureRequest dto){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        String res = feeServices.createFeeStructure(collegeId,dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @GetMapping("/get-all-feestructure")
    public ResponseEntity<Page<FeeStructureResponse>> getAllFeeStructure(@RequestHeader("Authorization") String jwt,
                                                                         @RequestParam(defaultValue = "0") int pageNumber,
                                                                         @RequestParam(defaultValue = "10") int pageSize){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        Page<FeeStructureResponse> res = feeServices.getAllFeeStructure(collegeId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get-feestructurebyid/{id}")
    public ResponseEntity<FeeStructureResponse> getFeeStructureById(@PathVariable Long id){
        FeeStructureResponse res = feeServices.getFeeStructureById(id);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/update-feestructure/{id}")
    public ResponseEntity<String> updateFeeStructure(@PathVariable Long id,@RequestBody FeeStructureRequest dto){
        String res = feeServices.updateFeeStructure(id,dto);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @DeleteMapping("/get-deletefeestructure/{id}")
    public ResponseEntity<String> deleteFeeStructure(@PathVariable Long id){
        String res = feeServices.deleteFeeStructure(id);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
