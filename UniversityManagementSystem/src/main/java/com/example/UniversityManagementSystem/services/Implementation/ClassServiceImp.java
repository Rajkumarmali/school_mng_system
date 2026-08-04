package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.classes.*;
import com.example.UniversityManagementSystem.entity.Section;
import com.example.UniversityManagementSystem.entity.Department;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.Teacher;
import com.example.UniversityManagementSystem.entity.type.SectionStatus;
import com.example.UniversityManagementSystem.repository.SectionRepository;
import com.example.UniversityManagementSystem.repository.StudentRepository;
import com.example.UniversityManagementSystem.repository.TeacherRepository;
import com.example.UniversityManagementSystem.services.ClassService;
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
public class ClassServiceImp implements ClassService {

    private final SectionRepository sectionRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    public ClassServiceImp(SectionRepository sectionRepository, TeacherRepository teacherRepository,
                           StudentRepository studentRepository) {
        this.sectionRepository = sectionRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

//    @Override
//    @Transactional
//    @Caching(evict = {
//            @CacheEvict(cacheNames = "classes",allEntries = true)
//    })
//    @PreAuthorize("hasRole('HOD')")
//    public String createClass(Long userId,ClassRequest dto) {
//
//        Teacher hod = teacherRepository.findByUserId(userId);
//        Department department = hod.getDepartmentHod();
//
//        Section clas = new Section();
//        clas.setName(dto.getName());
//        clas.setAcademicYear(dto.getAcademicYear());
//        clas.setSemester(dto.getSemester());
//        clas.setClassStatus(SectionStatus.ACTIVE);
//        if(dto.getEmployeeEmailOrEmployeeId()!=null){
//            Teacher teacher = teacherRepository.
//                    findByEmailOrEmployeeId(dto.getEmployeeEmailOrEmployeeId(),dto.getEmployeeEmailOrEmployeeId());
//            clas.setClassTeacher(teacher);
//        }
//        if(department!=null){
//            clas.setDepartment(department);
//        }
//        clas.setCreatedAt(LocalDateTime.now());
//        sectionRepository.save(clas);
//        clas.setSectionCode(String.format("CLS%04d", clas.getId()));
//        sectionRepository.save(clas);
//        return "Create class successfully";
//    }
//
//    @Override
//    @PreAuthorize("hasRole('HOD')")
//    @Transactional
//    @Caching(evict = {
//            @CacheEvict(cacheNames = "classes",allEntries = true),
//            @CacheEvict(cacheNames = "class",key = "#classId")
//    })
//    public String updateClass(Long classId,ClassRequest dto) {
//        Section clas  = sectionRepository.findById(classId).orElseThrow(()->
//                new IllegalArgumentException("Class not found"));
//        if(dto.getEmployeeEmailOrEmployeeId()!=null){
//            Teacher teacher = teacherRepository
//                    .findByEmailOrEmployeeId(dto.getEmployeeEmailOrEmployeeId(),dto.getEmployeeEmailOrEmployeeId());
//
//            clas.setClassTeacher(teacher);
//            clas.setUpdatedAt(LocalDateTime.now());
//            sectionRepository.save(clas);
//            return "class Teacher update successfully";
//        }
//        clas.setClassStatus(dto.getClassStatus());
//        clas.setName(dto.getName());
//        clas.setAcademicYear(dto.getAcademicYear());
//        clas.setSemester(dto.getSemester());
//        clas.setUpdatedAt(LocalDateTime.now());
//        clas.setUpdatedAt(LocalDateTime.now());
//        sectionRepository.save(clas);
//        return "class update successfully";
//    }
//
//    @Override
//    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
//    @Transactional
//    @Caching(evict = {
//            @CacheEvict(cacheNames = "classes",allEntries = true),
//            @CacheEvict(cacheNames = "class",key = "#classId")
//    })
//    public String deleteClass(Long classId) {
//        Section clas = sectionRepository.findById(classId).orElseThrow(()->
//                new IllegalArgumentException("Class not found"));
//        if(clas.getClassTeacher()!=null){
//            clas.getClassTeacher().setClassTeacher(null);
//            clas.setClassTeacher(null);
//        }
//        sectionRepository.delete(clas);
//        return "Class delete successfully";
//    }
//
//    @Override
//    @PreAuthorize("hasRole('ADMIN')")
//    @Cacheable(cacheNames = "classes",key = "{#collegeId,#pageNumber,#pageSize}")
//    public Page<ClassResponse> getAllClass(Long collegeId, int pageNumber, int pageSize) {
//        Pageable pageable = PageRequest.of(pageNumber,pageSize);
//        Page<Section> classes = sectionRepository.findByDepartmentCollegeId(collegeId,pageable);
//        Page<ClassResponse> responses = classes.map(clas->{
//            ClassResponse res = new ClassResponse();
//            if(clas.getClassTeacher()!=null){
//                Teacher teacher = clas.getClassTeacher();
//                ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
//                classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
//                res.setClassTeacherResponse(classTeacherResponse);
//            }
//            res.setClassStatus(clas.getClassStatus());
//            res.setId(clas.getId());
//            res.setName(clas.getName());
//            res.setAcademicYear(clas.getAcademicYear());
//            res.setSemester(clas.getSemester());
//            res.setSectionCode(clas.getSectionCode());
//            res.setDepartmentCode(clas.getDepartment().getCode());
//            return res;
//        });
//        return responses;
//    }
//
//    @Override
//    @PreAuthorize("hasRole('HOD')")
//    @Cacheable(cacheNames = "classes",key = "{#userId,#pageNumber,#pageSize}")
//    public Page<ClassResponse> getAllClassByDepartment(Long userId, int pageNumber, int pageSize) {
//
//        Teacher hod = teacherRepository.findByUserId(userId);
//        Department department = hod.getDepartmentHod();
//
//        Pageable pageable = PageRequest.of(pageNumber,pageSize);
//        Page<Section> classes= sectionRepository.findByDepartment(department,pageable);
//        Page<ClassResponse> responses = classes.map(clas->{
//           ClassResponse res = new ClassResponse();
//
//           if(clas.getClassTeacher()!=null){
//               Teacher teacher = clas.getClassTeacher();
//               ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
//               classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
//               res.setClassTeacherResponse(classTeacherResponse);
//           }
//           res.setClassStatus(clas.getClassStatus());
//            res.setId(clas.getId());
//            res.setName(clas.getName());
//            res.setAcademicYear(clas.getAcademicYear());
//            res.setSemester(clas.getSemester());
//            res.setSectionCode(clas.getSectionCode());
//            res.setDepartmentCode(clas.getDepartment().getCode());
//            return res;
//        });
//        return responses;
//    }
//
//    @Override
//    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
//    @Cacheable(cacheNames = "class",key = "#classId")
//    public ClassResponse getClassById(Long classId) {
//
//        Section clas = sectionRepository.findById(classId).orElseThrow(()->
//                new IllegalArgumentException("Class not found"));
//        ClassResponse response = new ClassResponse();
//
//        if(clas.getClassTeacher()!=null){
//            Teacher teacher = clas.getClassTeacher();
//            ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
//            classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
//            classTeacherResponse.setEmail(teacher.getEmail());
//            classTeacherResponse.setPhoneNumber(teacher.getPhoneNumber());
//            classTeacherResponse.setEmployeeId(teacher.getEmployeeId());
//            response.setClassTeacherResponse(classTeacherResponse);
//        }
//        response.setTotalStudents(clas.getStudents().size());
//        response.setClassStatus(clas.getClassStatus());
//        response.setId(clas.getId());
//        response.setName(clas.getName());
//        response.setAcademicYear(clas.getAcademicYear());
//        response.setSemester(clas.getSemester());
//        response.setSectionCode(clas.getSectionCode());
//        response.setDepartmentName(clas.getDepartment().getName());
//        response.setDepartmentCode(clas.getDepartment().getCode());
//        return response;
//    }
//
//    @Override
//    @Transactional
//    @PreAuthorize("hasRole('HOD')")
//    @Caching(evict = {
//            @CacheEvict(cacheNames = "classStudents",allEntries = true),
//            @CacheEvict(cacheNames = "class",key = "#classId")
//    })
//    public String addStudentInClass(Long classId, List<ClassStudentRequest> dto) {
//        Section clas= sectionRepository.findById(classId).orElseThrow(()->
//                new IllegalArgumentException("Class not found"));
//
//        for(ClassStudentRequest s:dto){
//            Student stu = studentRepository.findByRegistrationNumber(s.getRegistrationNumber());
//            System.out.println(stu.getFirstName());
//            if (!clas.getStudents().contains(stu)) {
//             clas.getStudents().add(stu);
//            }
//        }
//        sectionRepository.save(clas);
//        return "Student added successfully in the class";
//    }
//
//    @Override
//    @PreAuthorize("hasRole('HOD')")
//    @Caching(evict = {
//            @CacheEvict(cacheNames = "classStudents",allEntries = true),
//            @CacheEvict(cacheNames = "class",key = "#classId")
//    })
//    public String deleteStudentFromClass(Long classId, Long studentId) {
//        Section clas = sectionRepository.findById(classId).orElseThrow(()->
//                new IllegalArgumentException("Class not found"));
//        Student student = studentRepository.findById(studentId).orElseThrow(()->
//                new IllegalArgumentException("Student not found"));
//        clas.getStudents().remove(student);
//        student.getClasses().remove(clas);
//        sectionRepository.save(clas);
//        return "Student delete from the class";
//    }
//
//    @Override
//    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
//    @Cacheable(cacheNames = "classStudents",key = "{#classId,#pageNumber,#pageSize}")
//    public Page<ClassStudentResponse> getAllStudentFromClass(Long classId, int pageNumber, int pageSize) {
//        Pageable pageable = PageRequest.of(pageNumber,pageSize);
//
//        Section clas = sectionRepository.findById(classId).orElseThrow(()->
//                new IllegalArgumentException("Class not found"));
//
//        Page<Student> students = studentRepository.findByClasses(clas,pageable);
//        Page<ClassStudentResponse> responses = students.map(s->{
//           ClassStudentResponse res = new ClassStudentResponse();
//           res.setId(s.getId());
//           res.setFirstName(s.getFirstName());
//           res.setLastName(s.getLastName());
//           res.setRegistrationNumber(s.getRegistrationNumber());
//           res.setPhoneNumber(s.getPhoneNumber());
//           res.setEmail(s.getEmail());
//           return res;
//        });
//        return responses;
//    }
}
