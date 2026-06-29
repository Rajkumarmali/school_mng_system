package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.dto.student.StudentRequest;
import com.example.UniversityManagementSystem.dto.student.StudentResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.repository.RolesRepository;
import com.example.UniversityManagementSystem.repository.StudentRepository;
import com.example.UniversityManagementSystem.repository.TenantRepository;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.AddressService;
import com.example.UniversityManagementSystem.services.ParentServices;
import com.example.UniversityManagementSystem.services.StudentServices;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudentServicesImp implements StudentServices {

    private StudentRepository studentRepository;
    private TenantRepository tenantRepository;
    private RolesRepository rolesRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    private AddressService addressService;
    private ParentServices parentServices;


    public StudentServicesImp(StudentRepository studentRepository, TenantRepository tenantRepository, RolesRepository rolesRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, AddressService addressService, ParentServices parentServices) {
        this.studentRepository = studentRepository;
        this.tenantRepository = tenantRepository;
        this.rolesRepository = rolesRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.addressService = addressService;
        this.parentServices = parentServices;
    }

    @Override
    public String createStudent(Long tenantId, StudentRequest dto) {

        College college = null;
        if (tenantId!=null){
           college = tenantRepository.findById(tenantId).orElseThrow(()->
                   new IllegalArgumentException("Tenant not found"));
        }

        Address savedAddress = addressService.createAddress(dto.getAddressRequest());
        User savedUser = createUser(dto.getEmail(), college,"STUDENT");
        Parent savedParent = parentServices.createParent(dto.getParentRequest());

        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setDob(dto.getDob());
        student.setGender(dto.getGender());
        student.setCast(dto.getCast());
        student.setAadhaarNumber(dto.getAadharNumber());
        student.setRegistrationNumber(savedUser.getId().toString());
        student.setAddress(savedAddress);
        student.setUser(savedUser);
        student.setTenant(college);
        student.setParent(savedParent);
        student.setCreatedAt(LocalDateTime.now());
        studentRepository.save(student);
        return "Student create successfully";
    }

    @Override
    public List<StudentResponse> getAllStudent(Long tenantId) {
        List<Student> studentList = studentRepository.findByTenantId(tenantId);
        List<StudentResponse> res = studentList.stream().map(student -> {

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
            studentResponse.setAddressResponse(addressResponse);
            studentResponse.setParentResponse(parentResponse);
            return studentResponse;
        }).toList();
        return res;
    }

    @Override
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
        studentResponse.setAadharNumber(student.getAadhaarNumber());
        studentResponse.setUsername(student.getUser().getUsername());
        studentResponse.setAddressResponse(addressResponse);
        studentResponse.setParentResponse(parentResponse);
        return studentResponse;
    }

    @Override
    public String updateStudent(Long studentId, StudentRequest dto) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));

        if(dto.getAddressRequest()!=null){
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
    public String deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not fount"));
        studentRepository.delete(student);
        return "Student delete successfully";
    }

    private User createUser(String email, College college, String rolesName){

        Roles roles =  rolesRepository.findByNameAndTenant(rolesName, college);
        User user = new User();

        user.setEmail(email);
        user.setUsername(email);
        user.setPassword(passwordEncoder.encode("Test@123"));
        user.setCollege(college);
        user.setRoles(List.of(roles));
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
}
