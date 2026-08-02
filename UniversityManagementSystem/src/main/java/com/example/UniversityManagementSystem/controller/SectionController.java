package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.section.*;
import com.example.UniversityManagementSystem.services.SectionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/section")
public class SectionController {

    private final JwtProvider jwtProvider;
    private final SectionService sectionService;

    public SectionController(JwtProvider jwtProvider, SectionService sectionService) {
        this.jwtProvider = jwtProvider;
        this.sectionService = sectionService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createSection(@RequestHeader("Authorization") String jwt,
                                                @RequestBody SectionRequest dto){
         Long userId= jwtProvider.getUserIdFromToken(jwt);
         String res = sectionService.createSection(userId,dto);
         return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/update/{sectionId}")
    public ResponseEntity<String> updateSection(@PathVariable Long sectionId,@RequestBody SectionRequest dto){
       String res = sectionService.updateSection(sectionId,dto);
       return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{sectionId}")
    public ResponseEntity<String> deleteClass(@PathVariable Long sectionId){
        String res = sectionService.deleteSection(sectionId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<Page<SectionResponse>> getAllSections(@RequestHeader("Authorization") String jwt,
                                                               @RequestParam(defaultValue = "0") int pageNumber,
                                                               @RequestParam(defaultValue = "10") int pageSize){
        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
        Page<SectionResponse> res =  sectionService.getAllSection(collegeId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/department/sections")
    public ResponseEntity<Page<SectionResponse>> getAllDepartmentsSection(@RequestHeader("Authorization") String jwt,
                                                                        @RequestParam(defaultValue = "0") int pageNumber,
                                                                        @RequestParam(defaultValue = "10") int pageSize){
        Long userId= jwtProvider.getUserIdFromToken(jwt);
        Page<SectionResponse> res = sectionService.getAllSectionByDepartment(userId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get-byid/{sectionId}")
    public ResponseEntity<SectionResponse> getClassById(@PathVariable Long sectionId){
        SectionResponse res = sectionService.getSectionById(sectionId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/add/student/{sectionId}")
    public ResponseEntity<String> addStudentInClass(@PathVariable Long sectionId,
                                                    @RequestBody List<SectionStudentRequest> dto){
        String res = sectionService.addStudentInSection(sectionId,dto);
        return new ResponseEntity<>(res,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/student/{sectionId}/{studentId}")
    public ResponseEntity<String> deleteStudentFromClass(@PathVariable Long sectionId,
                                                         @PathVariable Long studentId){
        String res = sectionService.deleteStudentFromSection(sectionId,studentId);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/student/{sectionId}")
    public ResponseEntity<Page<SectionStudentResponse>> getAllStudentFromClass(@PathVariable Long sectionId,
                                                                               @RequestParam(defaultValue = "0") int pageNumber,
                                                                               @RequestParam(defaultValue = "10") int pageSize){
         Page<SectionStudentResponse> res = sectionService.getAllStudentFromSection(sectionId,pageNumber,pageSize);
         return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/add/subject/{sectionId}")
    public ResponseEntity<String> addSubjectInSection(@PathVariable Long sectionId,
                                                      @RequestBody SectionSubjectRequest dto){
        String res = sectionService.addSubjectInSection(sectionId,dto);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/subjects/{sectionId}")
    public ResponseEntity<Page<SectionSubjectResponse>> getSectionSubjects(@PathVariable Long sectionId,
                                                                           @RequestParam(defaultValue = "0") int pageNumber,
                                                                           @RequestParam(defaultValue = "10") int pageSize){
        Page<SectionSubjectResponse> res = sectionService.getAllSectionSubject(sectionId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

   @GetMapping("/get/subject/bysectionsubjectid/{sectionSubjectId}")
   public ResponseEntity<SectionSubjectResponse> getSectionSubjectById(@PathVariable Long sectionSubjectId){
        SectionSubjectResponse res = sectionService.getSectionSubjectById(sectionSubjectId);
        return new ResponseEntity<>(res,HttpStatus.OK);
   }

    @PostMapping("/update/subject-teacher/{sectionSubjectId}")
    public ResponseEntity<String> updateSectionSubjectTeacher(@PathVariable Long sectionSubjectId,
                                                              @RequestBody SectionSubjectRequest dto){
        String res = sectionService.updateSubjectTeacher(sectionSubjectId,dto);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/add/student/in/sectionSubject/{sectionSubjectId}")
    public ResponseEntity<String> addStudentInSectionSubject(@PathVariable Long sectionSubjectId,
                                                             @RequestBody List<SectionStudentRequest> dto){
        String res = sectionService.addStudentInSectionSubject(sectionSubjectId,dto);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/get/section/subject/student/{sectionSubjectId}")
    public ResponseEntity<Page<SectionStudentResponse>> getAllStudentFromSectionSubject(@PathVariable Long sectionSubjectId,
                                                                                        @RequestParam(defaultValue = "0") int pageNumber,
                                                                                        @RequestParam(defaultValue = "10") int pageSize){
        Page<SectionStudentResponse> res = sectionService.getAllStudentFromSectionSubject(sectionSubjectId,pageNumber,pageSize);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
