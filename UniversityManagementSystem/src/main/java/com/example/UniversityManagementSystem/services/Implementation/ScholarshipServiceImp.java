package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.scholarship.*;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.Scholarship;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.type.ScholarshipStatus;
import com.example.UniversityManagementSystem.repository.CollegeRepository;
import com.example.UniversityManagementSystem.repository.ScholarshipRepository;
import com.example.UniversityManagementSystem.repository.StudentRepository;
import com.example.UniversityManagementSystem.services.ScholarshipService;
import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScholarshipServiceImp implements ScholarshipService {

    private final CollegeRepository collegeRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final StudentRepository studentRepository;

    public ScholarshipServiceImp(CollegeRepository collegeRepository,
                                 ScholarshipRepository scholarshipRepository,
                                 StudentRepository studentRepository) {
        this.collegeRepository = collegeRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "scholarships",allEntries = true),
    })
    public String create(Long collegeId, ScholarshipRequest dto) {
        College college = null;
        if(collegeId!=null)
         college = collegeRepository.findById(collegeId).orElseThrow(()->
                new IllegalArgumentException("College not found"));

        Scholarship scholarship = new Scholarship();
        scholarship.setName(dto.getName());
        scholarship.setDescription(dto.getDescription());
        scholarship.setScholarshipPercent(dto.getScholarshipPercent());
        scholarship.setStatus(ScholarshipStatus.ACTIVE);
        scholarship.setCollege(college);
        Scholarship savedScholarship = scholarshipRepository.save(scholarship);
        String code = "SH-"+savedScholarship.getId();
        scholarship.setCode(code);
        scholarship.setCreatedAt(LocalDateTime.now());
        scholarshipRepository.save(scholarship);
        return "scholarship create successfully";
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "scholarships",allEntries = true),
            @CacheEvict(cacheNames = "studentScholarships",allEntries = true),
            @CacheEvict(cacheNames = "scholarshipStudents",allEntries = true),
    })
    public String update(Long scholarshipId, ScholarshipRequest dto) {
        Scholarship scholarship = scholarshipRepository.findById(scholarshipId).orElseThrow(()->
                new IllegalArgumentException("Scholarship not found"));
        scholarship.setName(dto.getName());
        scholarship.setDescription(dto.getDescription());
        scholarship.setScholarshipPercent(dto.getScholarshipPercent());
        scholarship.setStatus(dto.getStatus());
        scholarship.setUpdatedAt(LocalDateTime.now());
        scholarshipRepository.save(scholarship);
        return "Scholarship update successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "scholarships",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<ScholarshipResponse> getScholarships(Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"createdAt"));

        Page<Scholarship> scholarships = scholarshipRepository.findByCollegeId(collegeId,pageable);
        Page<ScholarshipResponse> responses = scholarships.map(scholarship -> {
            ScholarshipResponse res = new ScholarshipResponse();
            res.setId(scholarship.getId());
            res.setCode(scholarship.getCode());
            res.setName(scholarship.getName());
            res.setStatus(scholarship.getStatus());
            res.setTotalStudent(scholarship.getStudents().size());
            res.setScholarshipPercent(scholarship.getScholarshipPercent());
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentScholarships",allEntries = true),
            @CacheEvict(cacheNames = "scholarshipStudents",allEntries = true),
            @CacheEvict(cacheNames = "scholarships",allEntries = true),
    })
    public String assignScholarshipToStudent(Long scholarshipId, List<ScholarshipStudentRequest> dto) {
        Scholarship scholarship = scholarshipRepository.findById(scholarshipId).orElseThrow(()->
                new IllegalArgumentException("Scholarship not found"));
        for(ScholarshipStudentRequest s:dto){
            Student student = studentRepository.findByRegistrationNumber(s.getRegistrationNumber());
            if(student==null){
                continue;
            }
            double totalScholarshipPercent = student.getScholarships().stream()
                    .filter(sf->sf.getStatus()==ScholarshipStatus.ACTIVE)
                    .mapToDouble(Scholarship::getScholarshipPercent)
                    .sum()+scholarship.getScholarshipPercent();
            if(totalScholarshipPercent>=100){
                continue;
            }
            if(!scholarship.getStudents().contains(student))
                scholarship.getStudents().add(student);
        }
        scholarshipRepository.save(scholarship);
        return "assign scholarship to student";
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentScholarships",allEntries = true),
            @CacheEvict(cacheNames = "scholarshipStudents",allEntries = true),
            @CacheEvict(cacheNames = "scholarships",allEntries = true),
    })
    public String removeStudentFromScholarship(Long studentId, Long scholarshipId) {
        Scholarship scholarship = scholarshipRepository.findById(scholarshipId).orElseThrow(()->
                new IllegalArgumentException("Scholarship not found"));
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));
        scholarship.getStudents().remove(student);
        scholarshipRepository.save(scholarship);
        return "remove student from scholarship";
    }


    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "studentScholarships",key = "{#studentId,#pageNumber,#pageSize}")
    public StudentScholarshipResponse getStudentScholarship(Long studentId, int pageNumber, int pageSize) {

        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student are not found"));

        Pageable pageable= PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"CreatedAt"));
        Page<Scholarship> scholarships = scholarshipRepository.findByStudents(student,pageable);

        StudentScholarshipResponse response = new StudentScholarshipResponse();

        StudentResponse studentResponse = new StudentResponse();
        studentResponse.setId(student.getId());
        studentResponse.setRegistrationNumber(student.getRegistrationNumber());
        studentResponse.setName(student.getFirstName()+" "+student.getLastName());
        studentResponse.setEmail(student.getEmail());
        studentResponse.setPhoneNumber(student.getPhoneNumber());

        Page<ScholarshipResponse> scholarshipResponses = scholarships.map(scholarship -> {
            ScholarshipResponse res = new ScholarshipResponse();
            res.setId(scholarship.getId());
            res.setName(scholarship.getName());
            res.setCode(scholarship.getCode());
            res.setStatus(scholarship.getStatus());
            res.setScholarshipPercent(scholarship.getScholarshipPercent());
            return res;
        });

        response.setStudentResponse(studentResponse);
        response.setScholarshipResponses(scholarshipResponses);

        return response;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "scholarshipStudents",key = "{#scholarshipId,#pageNumber,#pageSize}")
    public ScholarshipStudentResponse getScholarshipStudent(Long scholarshipId, int pageNumber, int pageSize) {
        Scholarship scholarship = scholarshipRepository.findById(scholarshipId).orElseThrow(()->
                new IllegalArgumentException("Scholarship not found"));

        Pageable pageable= PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"CreatedAt"));
        Page<Student> students = studentRepository.findByScholarships(scholarship,pageable);

        ScholarshipStudentResponse response = new ScholarshipStudentResponse();

        ScholarshipResponse scholarshipResponse = new ScholarshipResponse();
        scholarshipResponse.setId(scholarship.getId());
        scholarshipResponse.setName(scholarship.getName());
        scholarshipResponse.setCode(scholarship.getCode());
        scholarshipResponse.setStatus(scholarship.getStatus());
        scholarshipResponse.setDescription(scholarship.getDescription());
        scholarshipResponse.setScholarshipPercent(scholarship.getScholarshipPercent());

        Page<StudentResponse> studentResponse = students.map(student -> {
           StudentResponse res = new StudentResponse();
           res.setId(student.getId());
           res.setName(student.getFirstName()+" "+student.getLastName());
           res.setRegistrationNumber(student.getRegistrationNumber());
           res.setEmail(student.getEmail());
           res.setPhoneNumber(student.getPhoneNumber());
           return res;
        });

        response.setScholarshipResponse(scholarshipResponse);
        response.setStudentResponses(studentResponse);

        return response;
    }
}
