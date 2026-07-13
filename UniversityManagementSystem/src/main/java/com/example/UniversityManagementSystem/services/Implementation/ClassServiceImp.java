package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.classes.*;
import com.example.UniversityManagementSystem.entity.Class;
import com.example.UniversityManagementSystem.entity.Department;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.Teacher;
import com.example.UniversityManagementSystem.entity.type.ClassStatus;
import com.example.UniversityManagementSystem.repository.ClassRepository;
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

    private final ClassRepository classRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    public ClassServiceImp(ClassRepository classRepository, TeacherRepository teacherRepository,
                           StudentRepository studentRepository) {
        this.classRepository = classRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "classes",allEntries = true)
    })
    @PreAuthorize("hasRole('HOD')")
    public String createClass(Long userId,ClassRequest dto) {

        Teacher hod = teacherRepository.findByUserId(userId);
        Department department = hod.getDepartmentHod();

        Class clas = new Class();
        clas.setName(dto.getName());
        clas.setAcedamicYear(dto.getAcademicYear());
        clas.setSemester(dto.getSemester());
        clas.setClassStatus(ClassStatus.ACTIVE);
        if(dto.getEmployeeEmailOrEmployeeId()!=null){
            Teacher teacher = teacherRepository.
                    findByEmailOrEmployeeId(dto.getEmployeeEmailOrEmployeeId(),dto.getEmployeeEmailOrEmployeeId());
            clas.setClassTeacher(teacher);
        }
        if(department!=null){
            clas.setDepartment(department);
        }
        clas.setCreatedAt(LocalDateTime.now());
        classRepository.save(clas);
        clas.setClassCode(String.format("CLS%04d", clas.getId()));
        classRepository.save(clas);
        return "Create class successfully";
    }

    @Override
    @PreAuthorize("hasRole('HOD')")
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "classes",allEntries = true),
            @CacheEvict(cacheNames = "class",key = "#classId")
    })
    public String updateClass(Long classId,ClassRequest dto) {
        Class clas  = classRepository.findById(classId).orElseThrow(()->
                new IllegalArgumentException("Class not found"));
        if(dto.getEmployeeEmailOrEmployeeId()!=null){
            Teacher teacher = teacherRepository
                    .findByEmailOrEmployeeId(dto.getEmployeeEmailOrEmployeeId(),dto.getEmployeeEmailOrEmployeeId());

            clas.setClassTeacher(teacher);
            clas.setUpdatedAt(LocalDateTime.now());
            classRepository.save(clas);
            return "class Teacher update successfully";
        }
        clas.setClassStatus(dto.getClassStatus());
        clas.setName(dto.getName());
        clas.setAcedamicYear(dto.getAcademicYear());
        clas.setSemester(dto.getSemester());
        clas.setUpdatedAt(LocalDateTime.now());
        clas.setUpdatedAt(LocalDateTime.now());
        classRepository.save(clas);
        return "class update successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "classes",allEntries = true),
            @CacheEvict(cacheNames = "class",key = "#classId")
    })
    public String deleteClass(Long classId) {
        Class clas = classRepository.findById(classId).orElseThrow(()->
                new IllegalArgumentException("Class not found"));
        if(clas.getClassTeacher()!=null){
            clas.getClassTeacher().setClassTeacher(null);
            clas.setClassTeacher(null);
        }
        classRepository.delete(clas);
        return "Class delete successfully";
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "classes",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<ClassResponse> getAllClass(Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Class> classes = classRepository.findByDepartmentCollegeId(collegeId,pageable);
        Page<ClassResponse> responses = classes.map(clas->{
            ClassResponse res = new ClassResponse();
            if(clas.getClassTeacher()!=null){
                Teacher teacher = clas.getClassTeacher();
                ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
                classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
                res.setClassTeacherResponse(classTeacherResponse);
            }
            res.setClassStatus(clas.getClassStatus());
            res.setId(clas.getId());
            res.setName(clas.getName());
            res.setAcademicYear(clas.getAcedamicYear());
            res.setSemester(clas.getSemester());
            res.setClassCode(clas.getClassCode());
            res.setDepartmentCode(clas.getDepartment().getCode());
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasRole('HOD')")
    @Cacheable(cacheNames = "classes",key = "{#userId,#pageNumber,#pageSize}")
    public Page<ClassResponse> getAllClassByDepartment(Long userId, int pageNumber, int pageSize) {

        Teacher hod = teacherRepository.findByUserId(userId);
        Department department = hod.getDepartmentHod();

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Class> classes= classRepository.findByDepartment(department,pageable);
        Page<ClassResponse> responses = classes.map(clas->{
           ClassResponse res = new ClassResponse();

           if(clas.getClassTeacher()!=null){
               Teacher teacher = clas.getClassTeacher();
               ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
               classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
               res.setClassTeacherResponse(classTeacherResponse);
           }
           res.setClassStatus(clas.getClassStatus());
            res.setId(clas.getId());
            res.setName(clas.getName());
            res.setAcademicYear(clas.getAcedamicYear());
            res.setSemester(clas.getSemester());
            res.setClassCode(clas.getClassCode());
            res.setDepartmentCode(clas.getDepartment().getCode());
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "class",key = "#classId")
    public ClassResponse getClassById(Long classId) {

        Class clas = classRepository.findById(classId).orElseThrow(()->
                new IllegalArgumentException("Class not found"));
        ClassResponse response = new ClassResponse();

        if(clas.getClassTeacher()!=null){
            Teacher teacher = clas.getClassTeacher();
            ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
            classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
            classTeacherResponse.setEmail(teacher.getEmail());
            classTeacherResponse.setPhoneNumber(teacher.getPhoneNumber());
            classTeacherResponse.setEmployeeId(teacher.getEmployeeId());
            response.setClassTeacherResponse(classTeacherResponse);
        }
        response.setTotalStudents(clas.getStudents().size());
        response.setClassStatus(clas.getClassStatus());
        response.setId(clas.getId());
        response.setName(clas.getName());
        response.setAcademicYear(clas.getAcedamicYear());
        response.setSemester(clas.getSemester());
        response.setClassCode(clas.getClassCode());
        response.setDepartmentName(clas.getDepartment().getName());
        response.setDepartmentCode(clas.getDepartment().getCode());
        return response;
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('HOD')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "classStudents",allEntries = true),
            @CacheEvict(cacheNames = "class",key = "#classId")
    })
    public String addStudentInClass(Long classId, List<ClassStudentRequest> dto) {
        Class clas= classRepository.findById(classId).orElseThrow(()->
                new IllegalArgumentException("Class not found"));

        for(ClassStudentRequest s:dto){
            Student stu = studentRepository.findByRegistrationNumber(s.getRegistrationNumber());
            System.out.println(stu.getFirstName());
            if (!clas.getStudents().contains(stu)) {
             clas.getStudents().add(stu);
            }
        }
        classRepository.save(clas);
        return "Student added successfully in the class";
    }

    @Override
    @PreAuthorize("hasRole('HOD')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "classStudents",allEntries = true),
            @CacheEvict(cacheNames = "class",key = "#classId")
    })
    public String deleteStudentFromClass(Long classId, Long studentId) {
        Class clas = classRepository.findById(classId).orElseThrow(()->
                new IllegalArgumentException("Class not found"));
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));
        clas.getStudents().remove(student);
        student.getClasses().remove(clas);
        classRepository.save(clas);
        return "Student delete from the class";
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "classStudents",key = "{#classId,#pageNumber,#pageSize}")
    public Page<ClassStudentResponse> getAllStudentFromClass(Long classId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Class clas = classRepository.findById(classId).orElseThrow(()->
                new IllegalArgumentException("Class not found"));

        Page<Student> students = studentRepository.findByClasses(clas,pageable);
        Page<ClassStudentResponse> responses = students.map(s->{
           ClassStudentResponse res = new ClassStudentResponse();
           res.setId(s.getId());
           res.setFirstName(s.getFirstName());
           res.setLastName(s.getLastName());
           res.setRegistrationNumber(s.getRegistrationNumber());
           res.setPhoneNumber(s.getPhoneNumber());
           res.setEmail(s.getEmail());
           return res;
        });
        return responses;
    }
}
