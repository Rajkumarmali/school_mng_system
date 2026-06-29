package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.dto.teacher.TeacherRequest;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.repository.RolesRepository;
import com.example.UniversityManagementSystem.repository.TeacherRepository;
import com.example.UniversityManagementSystem.repository.TenantRepository;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.*;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TeacherServicesImp implements TeacherServices {

    private AuthService authService;
    private AddressService addressService;
    private ParentServices parentServices;
    private TenantRepository tenantRepository;
    private UserRepository userRepository;
    private RolesRepository rolesRepository;
    private PasswordEncoder passwordEncoder;
    private TeacherRepository teacherRepository;

    public TeacherServicesImp(AuthService authService, AddressService addressService, ParentServices parentServices, TenantRepository tenantRepository, UserRepository userRepository, RolesRepository rolesRepository, PasswordEncoder passwordEncoder, TeacherRepository teacherRepository) {
        this.authService = authService;
        this.addressService = addressService;
        this.parentServices = parentServices;
        this.tenantRepository = tenantRepository;
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
        this.passwordEncoder = passwordEncoder;
        this.teacherRepository = teacherRepository;
    }

    @Override
    @Transactional
    public String createTeacher(Long tenantId,TeacherRequest dto) {
        College college =null;
        if(tenantId!=null){
            college =  tenantRepository.findById(tenantId).orElseThrow(()->
                    new IllegalArgumentException("Tenant not fount"));
        }

        User savedUser = createUser(dto.getEmail(), college,"TEACHER");
        Address savedAddress = addressService.createAddress(dto.getAddressRequest());
        Parent savedParent = parentServices.createParent(dto.getParentRequest());

        Teacher teacher = new Teacher();
        teacher.setFirstName(dto.getFirstName());
        teacher.setLastName(dto.getLastName());
        teacher.setEmail(dto.getEmail());
        teacher.setPhoneNumber(dto.getPhoneNumber());
        teacher.setDob(dto.getDob());
        teacher.setGender(dto.getGender());
        teacher.setCast(dto.getCast());
        teacher.setAadharNumber(dto.getAadharNumber());
        teacher.setPanNumber(dto.getPanNumber());
        teacher.setEmployeeId(savedUser.getId().toString());
        teacher.setAddress(savedAddress);
        teacher.setUser(savedUser);
        teacher.setTenant(college);
        teacher.setParent(savedParent);
        teacher.setCreatedAt(LocalDateTime.now());
        teacherRepository.save(teacher);
        return "Create teacher successfully";
    }

    @Override
    public List<TeacherResponse> getAllTeacher(Long tenantId) {
        List<Teacher> teacherList = teacherRepository.findByTenantId(tenantId);
        List<TeacherResponse> res = teacherList.stream().map(teacher -> {

            Address address = teacher.getAddress();
            Parent parent = teacher.getParent();

            TeacherResponse teacherResponse = new TeacherResponse();
            AddressResponse addressResponse = new AddressResponse();
            ParentResponse parentResponse = new ParentResponse();

            addressResponse.setAddress(address.getAddress());
            addressResponse.setCity(address.getCity());
            addressResponse.setDistrict(address.getDistrict());
            addressResponse.setState(address.getState());
            addressResponse.setCountry(address.getCountry());
            addressResponse.setPincode(address.getPincode());

            parentResponse.setFatherName(parent.getFatherName());
            parentResponse.setMotherName(parent.getMotherName());

            teacherResponse.setId(teacher.getId());;
            teacherResponse.setUserId(teacher.getUser().getId());
            teacherResponse.setFirstName(teacher.getFirstName());
            teacherResponse.setLastName(teacher.getLastName());
            teacherResponse.setEmail(teacher.getEmail());
            teacherResponse.setPhoneNumber(teacher.getPhoneNumber());
            teacherResponse.setDob(teacher.getDob());
            teacherResponse.setEmployeeId(teacher.getEmployeeId());
            teacherResponse.setGender(teacher.getGender());
            teacherResponse.setCast(teacher.getCast());
            teacherResponse.setAadharNumber(teacher.getAadharNumber());
            teacherResponse.setPanNumber(teacher.getPanNumber());
            teacherResponse.setAddressResponse(addressResponse);
            teacherResponse.setParentResponse(parentResponse);

          return teacherResponse;
        }).toList();
        return res;
    }

    @Override
    @Transactional
    public String updateTeacher(Long teacherId,TeacherRequest dto) {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(()->
                new IllegalArgumentException("Teacher not found"));

        if(dto.getAddressRequest()!=null){
            return addressService.updateAddress(teacher.getAddress().getId(),dto.getAddressRequest());
        } else if(dto.getParentRequest()!=null){
            return parentServices.updateParent(teacher.getParent().getId(),dto.getParentRequest());
        } else{
            teacher.setFirstName(dto.getFirstName());
            teacher.setLastName(dto.getLastName());
            teacher.setEmail(dto.getEmail());
            teacher.getUser().setEmail(dto.getEmail());
            teacher.getUser().setUpdatedAt(LocalDateTime.now());
            teacher.setPhoneNumber(dto.getPhoneNumber());
            teacher.setDob(dto.getDob());
            teacher.setGender(dto.getGender());
            teacher.setCast(dto.getCast());
            teacher.setAadharNumber(dto.getAadharNumber());
            teacher.setPanNumber(dto.getPanNumber());
            teacher.setUpdatedAt(LocalDateTime.now());
            teacherRepository.save(teacher);
        }
        return "Teacher update successfully";
    }

    @Override
    public String deleteTeacher(Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(()->
                new IllegalArgumentException("Teacher not found"));
        teacherRepository.delete(teacher);
        return "Teacher delete successfully";
    }

    @Override
    public TeacherResponse getTeacherById(Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(()->
                new IllegalArgumentException("Teacher not found"));

        TeacherResponse teacherResponse = new TeacherResponse();
        AddressResponse addressResponse = new AddressResponse();
        ParentResponse parentResponse = new ParentResponse();

        Address address = teacher.getAddress();
        Parent parent = teacher.getParent();

        addressResponse.setAddress(address.getAddress());
        addressResponse.setCity(address.getCity());
        addressResponse.setDistrict(address.getDistrict());
        addressResponse.setState(address.getState());
        addressResponse.setCountry(address.getCountry());
        addressResponse.setPincode(address.getPincode());

        parentResponse.setFatherName(parent.getFatherName());
        parentResponse.setMotherName(parent.getMotherName());

        teacherResponse.setId(teacher.getId());;
        teacherResponse.setUserId(teacher.getUser().getId());
        teacherResponse.setGender(teacher.getGender());
        teacherResponse.setEmployeeId(teacher.getEmployeeId());
        teacherResponse.setFirstName(teacher.getFirstName());
        teacherResponse.setLastName(teacher.getLastName());
        teacherResponse.setEmail(teacher.getEmail());
        teacherResponse.setPhoneNumber(teacher.getPhoneNumber());
        teacherResponse.setDob(teacher.getDob());
        teacherResponse.setGender(teacher.getGender());
        teacherResponse.setCast(teacher.getCast());
        teacherResponse.setAadharNumber(teacher.getAadharNumber());
        teacherResponse.setPanNumber(teacher.getPanNumber());
        teacherResponse.setAddressResponse(addressResponse);
        teacherResponse.setParentResponse(parentResponse);

        return teacherResponse;
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
