package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.dto.university.StudentAcademicResponse;
import com.example.UniversityManagementSystem.dto.university.StudentResponse;
import com.example.UniversityManagementSystem.dto.university.UniversityResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.repository.StudentRepository;
import com.example.UniversityManagementSystem.repository.UniversityRepository;
import com.example.UniversityManagementSystem.services.UniversityService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UniversityServicesImp implements UniversityService {

    private final UniversityRepository universityRepository;
    private final StudentRepository studentRepository;

    private final Logger logger = LoggerFactory.getLogger(UniversityServicesImp.class);
    private final ModelMapper modelMapper = new ModelMapper();

    public UniversityServicesImp(UniversityRepository universityRepository,
                                 StudentRepository studentRepository) {
        this.universityRepository = universityRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    @Cacheable(cacheNames = "university",key = "'university'")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public UniversityResponse getUniversityOveriew() {
        List<University> universitys = universityRepository.findAll();
        University university = universitys.get(0);
        Address address = university.getAddress();

        AddressResponse addressResponse = new AddressResponse();
        addressResponse.setId(address.getId());
        addressResponse.setAddress(address.getAddress());
        addressResponse.setCity(address.getCity());
        addressResponse.setDistrict(address.getDistrict());
        addressResponse.setState(address.getState());
        addressResponse.setCountry(address.getCountry());
        addressResponse.setPincode(address.getPincode());

        UniversityResponse response = new UniversityResponse();
        response.setId(university.getId());
        response.setEmail(university.getEmail());
        response.setName(university.getName());
        response.setPhoneNumber(university.getPhoneNumber());
        response.setShortName(university.getShortName());
        response.setUniversityCode(university.getUniversityCode());
        response.setAddressResponse(addressResponse);

        return response;
    }

    @Override
    @Cacheable(cacheNames = "universityStudents",key = "{#pageNumber,#pageSize}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public Page<StudentResponse> getStudents(int pageNumber, int pageSize) {
        logger.info("Fetching university Students");
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"CreatedAt"));
            Page<Student> students = studentRepository.findByCollegeIdAndRollNumberNotNull(null,pageable);
            Page<StudentResponse> responses =  students.map(stu -> {
                StudentAcademic studentAcademic = stu.getStudentAcademics().stream()
                        .filter(sa->Boolean.TRUE.equals(sa.getIsCurrent()))
                        .findFirst()
                        .orElse(null);
                StudentAcademicResponse studentAcademicResponse = new StudentAcademicResponse();

                StudentResponse res = modelMapper.map(stu,StudentResponse.class);
                if(studentAcademic!=null)
                    studentAcademicResponse = modelMapper.map(studentAcademic,StudentAcademicResponse.class);

                res.setStudentAcademicResponse(studentAcademicResponse);
                return res;
            });
            logger.info("Successfully fetched university students | returnedElements = {}",responses.getNumberOfElements());
            return responses;
        } catch (Exception e) {
            logger.error("Failed to fetched university students",e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Cacheable(cacheNames = "universityAdmissionStudents",key = "{#pageNumber,#pageSize}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public Page<StudentResponse> getAdmissionStudent(int pageNumber, int pageSize) {
        logger.info("Fetching university Admission student");
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"CreatedAt"));
            Page<Student> students = studentRepository.findByCollegeIdAndRollNumberNull(null,pageable);
            Page<StudentResponse> responses =  students.map(stu -> {
                StudentAcademic studentAcademic = stu.getStudentAcademics().stream()
                        .filter(sa->Boolean.TRUE.equals(sa.getIsCurrent()))
                        .findFirst()
                        .orElse(null);
                StudentAcademicResponse studentAcademicResponse = new StudentAcademicResponse();

                StudentResponse res = modelMapper.map(stu,StudentResponse.class);
                if(studentAcademic!=null)
                    studentAcademicResponse = modelMapper.map(studentAcademic,StudentAcademicResponse.class);

                res.setStudentAcademicResponse(studentAcademicResponse);
                return res;
            });
            logger.info("Successfully fetched university admission students | returnedElements = {}",responses.getNumberOfElements());
            return responses;
        } catch (Exception e) {
            logger.error("Failed to fetched university admission students");
            throw new RuntimeException(e);
        }
    }

    @Override
    @Cacheable(cacheNames = "universityStudent",key = "#studentId")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public StudentResponse getStudentById(Long studentId) {
        logger.info("Fetching universityStudent by Id | studentId = {}",studentId);
        try{
            Student student = studentRepository.findById(studentId).orElseThrow(()->{
                logger.error("Student not fount | studentId = {}",studentId);
                throw new IllegalArgumentException("Student not found");
            });

            StudentAcademic studentAcademic = student.getStudentAcademics().stream()
                    .filter(sa->Boolean.TRUE.equals(sa.getIsCurrent()))
                    .findFirst()
                    .orElse(null);
            StudentAcademicResponse studentAcademicResponse = new StudentAcademicResponse();

            StudentResponse response =modelMapper.map(student,StudentResponse.class);
            AddressResponse addressResponse =modelMapper.map(student.getAddress(),AddressResponse.class);
            ParentResponse parentResponse =modelMapper.map(student.getParent(),ParentResponse.class);
            if(studentAcademic!=null)
                studentAcademicResponse = modelMapper.map(studentAcademic,StudentAcademicResponse.class);


            response.setAddressResponse(addressResponse);
            response.setParentResponse(parentResponse);
            response.setStudentAcademicResponse(studentAcademicResponse);

            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched university student by id | studentId = {}",studentId);
            throw new RuntimeException(e);
        }
    }
}
