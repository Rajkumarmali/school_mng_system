package com.example.UniversityManagementSystem.controller;

import com.example.UniversityManagementSystem.config.JwtProvider;
import com.example.UniversityManagementSystem.dto.classes.ClassRequest;
import com.example.UniversityManagementSystem.dto.classes.ClassResponse;
import com.example.UniversityManagementSystem.dto.classes.ClassStudentRequest;
import com.example.UniversityManagementSystem.dto.classes.ClassStudentResponse;
import com.example.UniversityManagementSystem.services.ClassService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/class")
public class ClassController {

    private final JwtProvider jwtProvider;
    private final ClassService classService;

    public ClassController(JwtProvider jwtProvider, ClassService classService) {
        this.jwtProvider = jwtProvider;
        this.classService = classService;
    }

//    @PostMapping("/create")
//    public ResponseEntity<String> createClass(@RequestHeader("Authorization") String jwt,
//                                              @RequestBody ClassRequest dto){
//         Long userId= jwtProvider.getUserIdFromToken(jwt);
//         String res = classService.createClass(userId,dto);
//         return new ResponseEntity<>(res, HttpStatus.CREATED);
//    }
//    @PostMapping("/update/{id}")
//    public ResponseEntity<String> updateClass(@PathVariable Long id,@RequestBody ClassRequest dto){
//       String res = classService.updateClass(id,dto);
//       return new ResponseEntity<>(res,HttpStatus.OK);
//    }
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deleteClass(@PathVariable Long id){
//        String res = classService.deleteClass(id);
//        return new ResponseEntity<>(res,HttpStatus.OK);
//    }
//    @GetMapping("/get-allclasses")
//    public ResponseEntity<Page<ClassResponse>> getAllClasses(@RequestHeader("Authorization") String jwt,
//                                                             @RequestParam(defaultValue = "0") int pageNumber,
//                                                             @RequestParam(defaultValue = "10") int pageSize){
//        Long collegeId = jwtProvider.getCollegeIdFromToken(jwt);
//        Page<ClassResponse> res =  classService.getAllClass(collegeId,pageNumber,pageSize);
//        return new ResponseEntity<>(res,HttpStatus.OK);
//    }
//    @GetMapping("/get-alldepartments-classes")
//    public ResponseEntity<Page<ClassResponse>> getAllDepartmentsClasses(@RequestHeader("Authorization") String jwt,
//                                                                        @RequestParam(defaultValue = "0") int pageNumber,
//                                                                        @RequestParam(defaultValue = "10") int pageSize){
//        Long userId= jwtProvider.getUserIdFromToken(jwt);
//        Page<ClassResponse> res = classService.getAllClassByDepartment(userId,pageNumber,pageSize);
//        return new ResponseEntity<>(res,HttpStatus.OK);
//    }
//    @GetMapping("/get-byid/{id}")
//    public ResponseEntity<ClassResponse> getClassById(@PathVariable Long id){
//        ClassResponse res = classService.getClassById(id);
//        return new ResponseEntity<>(res,HttpStatus.OK);
//    }
//    @PostMapping("/add-studentinclass/{id}")
//    public ResponseEntity<String> addStudentInClass(@PathVariable Long id,@RequestBody List<ClassStudentRequest> dto){
//        String res = classService.addStudentInClass(id,dto);
//        return new ResponseEntity<>(res,HttpStatus.CREATED);
//    }
//    @DeleteMapping("/delete-studentfromclass/{classId}/{studentId}")
//    public ResponseEntity<String> deleteStudentFromClass(@PathVariable Long classId,@PathVariable Long studentId){
//        String res = classService.deleteStudentFromClass(classId,studentId);
//        return new ResponseEntity<>(res,HttpStatus.OK);
//    }
//    @GetMapping("/get-studentfromclass/{id}")
//    public ResponseEntity<Page<ClassStudentResponse>> getAllStudentFromClass(@PathVariable Long id,
//                                                                             @RequestParam(defaultValue = "0") int pageNumber,
//                                                                             @RequestParam(defaultValue = "10") int pageSize){
//         Page<ClassStudentResponse> res = classService.getAllStudentFromClass(id,pageNumber,pageSize);
//         return new ResponseEntity<>(res,HttpStatus.OK);
//    }
}
