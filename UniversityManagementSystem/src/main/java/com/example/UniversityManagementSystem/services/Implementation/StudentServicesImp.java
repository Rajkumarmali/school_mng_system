package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.dto.student.StudentRequest;
import com.example.UniversityManagementSystem.dto.student.StudentResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.Address;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.Parent;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.University;
import com.example.UniversityManagementSystem.repository.CollegeRepository;
import com.example.UniversityManagementSystem.repository.DepartmentRepository;
import com.example.UniversityManagementSystem.repository.StudentRepository;
import com.example.UniversityManagementSystem.repository.UniversityRepository;
import com.example.UniversityManagementSystem.services.AddressService;
import com.example.UniversityManagementSystem.services.AuthService;
import com.example.UniversityManagementSystem.services.ParentServices;
import com.example.UniversityManagementSystem.services.StudentServices;
import jakarta.transaction.Transactional;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class StudentServicesImp implements StudentServices {

    private final StudentRepository studentRepository;
    private final CollegeRepository collegeRepository;
    private final AuthService authService;
    private final AddressService addressService;
    private final ParentServices parentServices;
    private final UniversityRepository universityRepository;
    private final DepartmentRepository departmentRepository;


    public StudentServicesImp(StudentRepository studentRepository, CollegeRepository collegeRepository, AuthService authService, AddressService addressService, ParentServices parentServices,
                              UniversityRepository universityRepository,
                              DepartmentRepository departmentRepository) {
        this.studentRepository = studentRepository;
        this.collegeRepository = collegeRepository;
        this.authService = authService;
        this.addressService = addressService;
        this.parentServices = parentServices;
        this.universityRepository = universityRepository;
        this.departmentRepository = departmentRepository;
    }

    @Transactional
    @Caching(evict = {
           @CacheEvict(cacheNames = "students",allEntries = true)
    })
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public String createStudent(Long collegeId,Long universityId, StudentRequest dto,MultipartFile image) {

        College college = null;
        if (collegeId!=null){
           college = collegeRepository.findById(collegeId).orElseThrow(()->
                   new IllegalArgumentException("College not found"));
        }
        University university = universityRepository.findById(universityId).orElseThrow(()->{
           throw new IllegalArgumentException("University not found");
        });

        Department department = departmentRepository.findByCode(dto.getDepartmentCode());

        Address savedAddress = addressService.createAddress(dto.getAddressRequest());
        User savedUser = authService.createUser(dto.getEmail(), college,universityId,"STUDENT");
        Parent savedParent = parentServices.createParent(dto.getParentRequest());

        String registrationNumber = "";
        if(college!=null)
            registrationNumber=college.getShortName().toUpperCase()+"-STU-";
        else
            registrationNumber = university.getShortName().toUpperCase()+"-STU-";

        Student student = new Student();

        if(image!=null &&!image.isEmpty()){
            try{
               String uploadDir="upload/student/";
               String fileName= UUID.randomUUID()+"_"+image.getOriginalFilename();
               Path path = Paths.get(uploadDir,fileName);
               Files.createDirectories(path.getParent());
               Files.copy(
                       image.getInputStream(),
                       path,
                       StandardCopyOption.REPLACE_EXISTING
               );
               student.setImage(uploadDir+fileName);
            } catch (Exception ex){
                throw new RuntimeException(ex);
            }
        }

        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setDob(dto.getDob());
        student.setGender(dto.getGender());
        student.setCast(dto.getCast());
        student.setAadhaarNumber(dto.getAadharNumber());
        student.setAddress(savedAddress);
        student.setUser(savedUser);
        student.setCollege(college);
        student.setParent(savedParent);
        if(department!=null){
            student.setDepartment(department);
        }
        student.setCreatedAt(LocalDateTime.now());
        Student savedStudent = studentRepository.save(student);

        registrationNumber += String.format("%03d",savedStudent.getId());
        savedStudent.setRegistrationNumber(registrationNumber);
        studentRepository.save(savedStudent);

        return "Student create successfully";
    }

    @Override
    @Cacheable(cacheNames = "students",key = "{#collegeId,#pageNumber,#pageSize}")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<StudentResponse> getAllStudent(Long collegeId,int pageNumber,int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Page<Student> studentList = studentRepository.findByCollegeId(collegeId,pageable);
        Page<StudentResponse> response = studentList.map(student -> {

            Address address = student.getAddress();
            Parent parent = student.getParent();

            StudentResponse studentResponse = new StudentResponse();
            AddressResponse addressResponse = new AddressResponse();
            ParentResponse parentResponse = new ParentResponse();

            addressResponse.setAddress(address.getAddress());
            addressResponse.setCity(address.getCity());
            addressResponse.setDistrict(address.getDistrict());
            addressResponse.setState(address.getState());
            addressResponse.setCountry(address.getCountry());
            addressResponse.setPincode(address.getPincode());

            parentResponse.setFatherName(parent.getFatherName());
            parentResponse.setFatherNumber(parent.getFatherNumber());
            parentResponse.setFatherOccupation(parent.getFatherOccupation());
            parentResponse.setMotherName(parent.getMotherName());
            parentResponse.setMotherNumber(parent.getMotherNumber());
            parentResponse.setMotherOccupation(parent.getMotherOccupation());

            studentResponse.setId(student.getId());
            studentResponse.setFirstName(student.getFirstName());
            studentResponse.setLastName(student.getLastName());
            studentResponse.setEmail(student.getEmail());
            studentResponse.setPhoneNumber(student.getPhoneNumber());
            studentResponse.setDob(student.getDob());
            studentResponse.setGender(student.getGender());
            studentResponse.setRegistrationNumber(student.getRegistrationNumber());
            studentResponse.setCast(student.getCast());
            studentResponse.setAadharNumber(student.getAadhaarNumber());
            if(student.getDepartment()!=null){
                studentResponse.setDepartmentCode(student.getDepartment().getCode());
            }
            studentResponse.setAddressResponse(addressResponse);
            studentResponse.setParentResponse(parentResponse);
            return studentResponse;
        });
        return response;
    }

    @Override
    @Cacheable(cacheNames = "student",key = "#studentId")
    @PreAuthorize("hasRole('ADMIN')")
    public StudentResponse getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));

        Address address = student.getAddress();
        Parent parent = student.getParent();

        StudentResponse studentResponse = new StudentResponse();
        AddressResponse addressResponse = new AddressResponse();
        ParentResponse parentResponse = new ParentResponse();

        addressResponse.setAddress(address.getAddress());
        addressResponse.setCity(address.getCity());
        addressResponse.setDistrict(address.getDistrict());
        addressResponse.setState(address.getState());
        addressResponse.setCountry(address.getCountry());
        addressResponse.setPincode(address.getPincode());

        parentResponse.setFatherName(parent.getFatherName());
        parentResponse.setFatherNumber(parent.getFatherNumber());
        parentResponse.setFatherOccupation(parent.getFatherOccupation());
        parentResponse.setMotherName(parent.getMotherName());
        parentResponse.setMotherNumber(parent.getMotherNumber());
        parentResponse.setMotherOccupation(parent.getMotherOccupation());

        studentResponse.setId(student.getId());
        studentResponse.setFirstName(student.getFirstName());
        studentResponse.setLastName(student.getLastName());
        studentResponse.setEmail(student.getEmail());
        studentResponse.setPhoneNumber(student.getPhoneNumber());
        studentResponse.setDob(student.getDob());
        studentResponse.setGender(student.getGender());
        studentResponse.setRegistrationNumber(student.getRegistrationNumber());
        studentResponse.setCast(student.getCast());
        studentResponse.setImage(student.getImage());
        studentResponse.setAadharNumber(student.getAadhaarNumber());
        studentResponse.setUsername(student.getUser().getUsername());
        if(student.getDepartment()!=null){
            studentResponse.setDepartmentCode(student.getDepartment().getCode());
            studentResponse.setDepartmentName(student.getDepartment().getName());
        }
        studentResponse.setAddressResponse(addressResponse);
        studentResponse.setParentResponse(parentResponse);
        return studentResponse;
    }

    @Transactional
    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "student",key = "#studentId"),
            @CacheEvict(cacheNames = "students",allEntries = true)
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String updateStudent(Long studentId, StudentRequest dto) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));
        if(dto.getDepartmentCode()!=null){
            Department department = departmentRepository.findByCode(dto.getDepartmentCode());
            student.setDepartment(department);
            student.setUpdatedAt(LocalDateTime.now());
            studentRepository.save(student);
            return "Department update successfully";
        }
        else if(dto.getAddressRequest()!=null){
            return addressService.updateAddress(student.getAddress().getId(),dto.getAddressRequest());
        } else if(dto.getParentRequest()!=null){
            return parentServices.updateParent(student.getParent().getId(),dto.getParentRequest());
        }else{
            student.setFirstName(dto.getFirstName());
            student.setLastName(dto.getLastName());
            student.setEmail(dto.getEmail());
            student.setPhoneNumber(dto.getPhoneNumber());
            student.setDob(dto.getDob());
            student.setGender(dto.getGender());
            student.setCast(dto.getCast());
            student.setAadhaarNumber(dto.getAadharNumber());
            student.getUser().setEmail(dto.getEmail());
            student.setUpdatedAt(LocalDateTime.now());
            studentRepository.save(student);
        }
        return "Student update successfully";
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "student",key = "#studentId"),
            @CacheEvict(cacheNames = "students",allEntries = true)
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not fount"));
        studentRepository.delete(student);
        return "Student delete successfully";
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "student",key = "#studentId"),
            @CacheEvict(cacheNames = "students",allEntries = true)
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String UpdateImage(Long studentId, MultipartFile image) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->{
           throw new IllegalArgumentException("Student not found");
        });
        try{
            String uploadDir="upload/student/";
            String fileName= UUID.randomUUID()+"_"+image.getOriginalFilename();
            Path path = Paths.get(uploadDir,fileName);
            Files.createDirectories(path.getParent());
            Files.copy(
                    image.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );

            if(student.getImage()!=null){
                Files.deleteIfExists(Paths.get(student.getImage()));
            }
            student.setImage(uploadDir+fileName);
            studentRepository.save(student);
            return "Update image successfully";
        } catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }

}
