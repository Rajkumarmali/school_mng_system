package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.department.DepartmentRequest;
import com.example.UniversityManagementSystem.dto.department.DepartmentResponse;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.Department;
import com.example.UniversityManagementSystem.entity.Teacher;
import com.example.UniversityManagementSystem.repository.CollegeRepository;
import com.example.UniversityManagementSystem.repository.DepartmentRepository;
import com.example.UniversityManagementSystem.repository.TeacherRepository;
import com.example.UniversityManagementSystem.services.DepartmentServices;
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
import java.util.Set;

@Service
public class DepartmentServicesImp implements DepartmentServices {

    private final DepartmentRepository departmentRepository;
    private final CollegeRepository collegeRepository;
    private final TeacherRepository teacherRepository;

    public DepartmentServicesImp(DepartmentRepository departmentRepository,
                                 CollegeRepository collegeRepository,
                                 TeacherRepository teacherRepository) {
        this.departmentRepository = departmentRepository;
        this.collegeRepository = collegeRepository;
        this.teacherRepository = teacherRepository;
    }


    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "departments",allEntries = true)
    })
    public String createDepartment(Long collegeId, DepartmentRequest dto) {
        College college =null;
        if(collegeId!=null){
            college = collegeRepository.findById(collegeId).orElseThrow(()->{
                throw new IllegalArgumentException("College not found");
            });
        }
        String code="";
        if(college!=null){
            code=college.getShortName().toUpperCase()+"_";
        } else{
            code = "MDSU_";
        }
        code +=generateDepartmentCode(dto.getName());
        String originalCode = code;
        int count =1;
        while(departmentRepository.existsByCode(code)){
           code=originalCode+count++;
        }

        Teacher teacher = null;
        if(dto.getHodTeacherEmailOrEmplId()!=null){
           teacher=teacherRepository.findByEmailOrEmployeeId(dto.getHodTeacherEmailOrEmplId(),dto.getHodTeacherEmailOrEmplId());
        }
        Department department = new Department();
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());
        department.setCode(code);
        department.setCollege(college);
        department.setHodTeacher(teacher);
        department.setCreatedAt(LocalDateTime.now());
        departmentRepository.save(department);
        return "create department successfully";
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "departments",allEntries = true),
            @CacheEvict(cacheNames = "department",key = "#departmentId")
    })
    public String updateDepartment(Long departmentId, DepartmentRequest dto) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(()->{
            throw new IllegalArgumentException("Department not found");
        });
        Teacher teacher = null;
        if(dto.getHodTeacherEmailOrEmplId()!=null){
            teacher=teacherRepository.findByEmailOrEmployeeId(dto.getHodTeacherEmailOrEmplId(),dto.getHodTeacherEmailOrEmplId());
        };
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());
        department.setHodTeacher(teacher);
        department.setUpdatedAt(LocalDateTime.now());
        departmentRepository.save(department);
        return "Department update successfully";
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "departments",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<DepartmentResponse> getAllDepartment(Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Department> departments = departmentRepository.findByCollegeId(collegeId,pageable);
        Page<DepartmentResponse> responses = departments.map(dep->{
          DepartmentResponse res = new DepartmentResponse();
          res.setId(dep.getId());
          res.setName(dep.getName());
          res.setCode(dep.getCode());

          if(dep.getHodTeacher()!=null){
              res.setHodName(dep.getHodTeacher().getFirstName()+dep.getHodTeacher().getLastName());
              res.setHodEmail(dep.getHodTeacher().getEmail());
              res.setHodPhoneNumber(dep.getHodTeacher().getPhoneNumber());
          }
          return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "department",key = "#departmentId")
    public DepartmentResponse getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(()->{
            throw new IllegalArgumentException("Department not found");
        });
        DepartmentResponse response = new DepartmentResponse();
        response.setId(department.getId());
        response.setName(department.getName());
        response.setCode(department.getCode());
        response.setDescription(department.getDescription());
        if(department.getHodTeacher()!=null){
            response.setHodName(department.getHodTeacher().getFirstName()+" "+department.getHodTeacher().getLastName());
            response.setHodEmail(department.getHodTeacher().getEmail());
            response.setHodPhoneNumber(department.getHodTeacher().getPhoneNumber());
            response.setEmployeeId(department.getHodTeacher().getEmployeeId());
        }

        return response;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "departments",allEntries = true),
            @CacheEvict(cacheNames = "department",key = "#departmentId")
    })
    public String deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(()->{
            throw new IllegalArgumentException("Department not found");
        });
        departmentRepository.delete(department);
        return "Delete department successfully";
    }

    private static final Set<String> IGNORE_WORDS = Set.of(
            "of", "and", "the", "for", "in", "on"
    );

    private String generateDepartmentCode(String departmentName) {
        StringBuilder code = new StringBuilder();
        for (String word : departmentName.trim().split("\\s+")) {
            if (IGNORE_WORDS.contains(word.toLowerCase())) {
                continue;
            }
            code.append(Character.toUpperCase(word.charAt(0)));
        }
        return code.toString();
    }
}
