package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.dto.subject.SubjectRequest;
import com.example.UniversityManagementSystem.dto.subject.SubjectResponse;
import com.example.UniversityManagementSystem.services.SubjectService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping("/create/{courseId}")
    public ResponseEntity<String> createSubject(@PathVariable Long courseId,
                                                @RequestBody SubjectRequest dto){
        String res = subjectService.createSubject(courseId, dto);
        return  new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/update/{subjectId}")
    public ResponseEntity<String> updateSubject(@PathVariable Long subjectId,
                                                @RequestBody SubjectRequest dto){
        String res = subjectService.updateSubject(subjectId, dto);
        return  new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get/{courseId}")
    public ResponseEntity<Page<SubjectResponse>> getAllSubject(@PathVariable Long courseId,
                                                               @RequestParam(defaultValue = "0") int pageNumber,
                                                               @RequestParam(defaultValue = "10") int pageSize){
        Page<SubjectResponse> res  = subjectService.getAllSubject(courseId,pageNumber,pageSize);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get/byid/{subjectId}")
    public ResponseEntity<SubjectResponse> getSubjectById(@PathVariable Long subjectId){
        SubjectResponse res= subjectService.getSubjectById(subjectId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
