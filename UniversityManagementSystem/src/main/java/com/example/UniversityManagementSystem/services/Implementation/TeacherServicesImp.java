package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.dto.teacher.BankRequest;
import com.example.UniversityManagementSystem.dto.teacher.BankResponse;
import com.example.UniversityManagementSystem.dto.teacher.TeacherRequest;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.Address;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.Parent;
import com.example.UniversityManagementSystem.entity.University;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.*;
import com.example.UniversityManagementSystem.services.AddressService;
import com.example.UniversityManagementSystem.services.ParentServices;
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
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class TeacherServicesImp implements TeacherServices {

    private final AuthService authService;
    private final AddressService addressService;
    private final CollegeRepository collegeRepository;
    private final ParentServices parentServices;

    private final TeacherRepository teacherRepository;
    private final UniversityRepository universityRepository;
    private final DepartmentRepository departmentRepository;
    private final BankDetailsRepository bankDetailsRepository;

    public TeacherServicesImp(AuthService authService, AddressService addressService, CollegeRepository collegeRepository, ParentServices parentServices, TeacherRepository teacherRepository,
                              UniversityRepository universityRepository,
                              DepartmentRepository departmentRepository,
                              BankDetailsRepository bankDetailsRepository) {
        this.authService = authService;
        this.addressService = addressService;
        this.collegeRepository = collegeRepository;
        this.parentServices = parentServices;
        this.teacherRepository = teacherRepository;
        this.universityRepository = universityRepository;
        this.departmentRepository = departmentRepository;
        this.bankDetailsRepository = bankDetailsRepository;
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "teachers",allEntries = true)
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String createTeacher(Long collegeId, Long universityId, TeacherRequest dto, MultipartFile image) {
        College college =null;
        if(collegeId!=null){
            college =  collegeRepository.findById(collegeId).orElseThrow(()->
                    new IllegalArgumentException("College not found"));
        }

        University university = universityRepository.findById(universityId).orElseThrow(()->{
               throw new IllegalArgumentException("University not found");
        });

        Department department = departmentRepository.findByCode(dto.getDepartmentCode());

        User savedUser = authService.createUser(dto.getEmail(),college,universityId, "TEACHER");

        Address savedAddress = addressService.createAddress(dto.getAddressRequest());
        Parent savedParent = parentServices.createParent(dto.getParentRequest());

        String employeeId = "";
        if(college!=null){
            employeeId= college.getShortName().toUpperCase()+"-"+"EMP-";
        } else{
            employeeId = university.getShortName().toUpperCase()+"-"+"EMP-";
        }

        Teacher teacher = new Teacher();

        if(image!=null && !image.isEmpty()){
            try{
                String uploadDir= "upload/teacher/";
                String fileName = UUID.randomUUID()+"_"+image.getOriginalFilename();
                Path path = Paths.get(uploadDir,fileName);
                Files.createDirectories(path.getParent());
                Files.copy(
                        image.getInputStream(),
                        path,
                        StandardCopyOption.REPLACE_EXISTING
                );
                teacher.setImage(uploadDir+fileName);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        if(dto.getBankRequest()!=null){
            BankRequest bankRequest = dto.getBankRequest();
            BankDetails bankDetail = new BankDetails();

            bankDetail.setAccountHolderName(bankRequest.getAccountHolderName());
            bankDetail.setAccountNumber(bankRequest.getAccountNumber());
            bankDetail.setIfscCode(bankRequest.getIfscCode());
            bankDetail.setBankName(bankRequest.getBankName());
            bankDetail.setBankBranch(bankRequest.getBankBranch());
            bankDetail.setAccountType(bankRequest.getAccountType());
            bankDetail.setCreatedAt(LocalDateTime.now());
            BankDetails savedBankDetails = bankDetailsRepository.save(bankDetail);

            teacher.setBankDetails(savedBankDetails);
        }

        teacher.setFirstName(dto.getFirstName());
        teacher.setLastName(dto.getLastName());
        teacher.setEmail(dto.getEmail());
        teacher.setPhoneNumber(dto.getPhoneNumber());
        teacher.setDob(dto.getDob());
        teacher.setGender(dto.getGender());
        teacher.setCast(dto.getCast());
        teacher.setAadharNumber(dto.getAadharNumber());
        teacher.setPanNumber(dto.getPanNumber());
        teacher.setAddress(savedAddress);
        teacher.setUser(savedUser);
        teacher.setCollege(college);
        teacher.setParent(savedParent);
        teacher.setCreatedAt(LocalDateTime.now());
        if(department!=null){
            teacher.setDepartment(department);
        }

        Teacher savedTeacher = teacherRepository.save(teacher);

        employeeId = employeeId+String.format("%03d", savedTeacher.getId());
        savedTeacher.setEmployeeId(employeeId);
        teacherRepository.save(savedTeacher);

        return "Create teacher successfully";
    }

    @Override
    @Cacheable(cacheNames = "teachers", key = "{#collegeId,#pageNumber,#pageSize}")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<TeacherResponse> getAllTeacher(Long collegeId,int pageNumber,int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"createdAt"));

        Page<Teacher> teacherList = teacherRepository.findByCollegeId(collegeId,pageable);
        Page<TeacherResponse> responses = teacherList.map(teacher -> {

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
            if(teacher.getDepartment()!=null){
                teacherResponse.setDepartmentCode(teacher.getDepartment().getCode());
            }
            teacherResponse.setAadharNumber(teacher.getAadharNumber());
            teacherResponse.setPanNumber(teacher.getPanNumber());
            teacherResponse.setAddressResponse(addressResponse);
            teacherResponse.setParentResponse(parentResponse);

          return teacherResponse;
        });
        return responses;
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "teachers",allEntries = true),
            @CacheEvict(cacheNames = "teacher",key = "#teacherId")
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String updateTeacher(Long teacherId,TeacherRequest dto) {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(()->
                new IllegalArgumentException("Teacher not found"));
        if(dto.getDepartmentCode()!=null){
          Department department = departmentRepository.findByCode(dto.getDepartmentCode());
          if(department!=null) {
              teacher.setDepartment(department);
              teacher.setUpdatedAt(LocalDateTime.now());
              teacherRepository.save(teacher);
              return "Department update successfully";
          } else{
              return "Department not found";
          }
        }
        else if(dto.getAddressRequest()!=null){
            return addressService.updateAddress(teacher.getAddress().getId(),dto.getAddressRequest());
        } else if(dto.getParentRequest()!=null){
            return parentServices.updateParent(teacher.getParent().getId(),dto.getParentRequest());
        } else if(dto.getBankRequest()!=null){
            BankDetails bankDetail = teacher.getBankDetails();
            BankRequest bankRequest = dto.getBankRequest();

            bankDetail.setAccountHolderName(bankRequest.getAccountHolderName());
            bankDetail.setAccountNumber(bankRequest.getAccountNumber());
            bankDetail.setIfscCode(bankRequest.getIfscCode());
            bankDetail.setBankName(bankRequest.getBankName());
            bankDetail.setBankBranch(bankRequest.getBankBranch());
            bankDetail.setAccountType(bankRequest.getAccountType());
            bankDetail.setUpdatedAt(LocalDateTime.now());
            bankDetailsRepository.save(bankDetail);
            return "Bank details update successfully";
        }
        else{
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
    @Caching(evict = {
            @CacheEvict(cacheNames = "teachers",allEntries = true),
            @CacheEvict(cacheNames = "teacher",key = "#teacherId")
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTeacher(Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(()->
                new IllegalArgumentException("Teacher not found"));
        teacherRepository.delete(teacher);
        return "Teacher delete successfully";
    }

    @Override
    @Cacheable(cacheNames = "teacher",key = "#teacherId")
    @PreAuthorize("hasRole('ADMIN')")
    public TeacherResponse getTeacherById(Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(()->
                new IllegalArgumentException("Teacher not found"));

        TeacherResponse teacherResponse = new TeacherResponse();
        AddressResponse addressResponse = new AddressResponse();
        ParentResponse parentResponse = new ParentResponse();
        BankResponse bankResponse = new BankResponse();

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
        teacherResponse.setImage(teacher.getImage());
        teacherResponse.setAadharNumber(teacher.getAadharNumber());
        teacherResponse.setPanNumber(teacher.getPanNumber());
        if(teacher.getDepartment()!=null){
            teacherResponse.setDepartmentCode(teacher.getDepartment().getCode());
            teacherResponse.setDepartmentName(teacher.getDepartment().getName());
        }
        teacherResponse.setAddressResponse(addressResponse);
        teacherResponse.setParentResponse(parentResponse);
        if(teacher.getBankDetails()!=null){
           BankDetails bankDetails = teacher.getBankDetails();
           bankResponse.setId(bankDetails.getId());
           bankResponse.setAccountHolderName(bankDetails.getAccountHolderName());
           bankResponse.setAccountNumber(bankDetails.getAccountNumber());
           bankResponse.setIfscCode(bankDetails.getIfscCode());
           bankResponse.setBankName(bankDetails.getBankName());
           bankResponse.setBankBranch(bankDetails.getBankBranch());
           bankResponse.setAccountType(bankDetails.getAccountType());
           teacherResponse.setBankResponse(bankResponse);
        }
        return teacherResponse;
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "teachers",allEntries = true),
            @CacheEvict(cacheNames = "teacher",key = "#teacherId")
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String updateImage(Long teacherId, MultipartFile image) {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(()->{
            throw new IllegalArgumentException("Teacher not found");
        });
        try{
            String uploadDir= "upload/teacher/";
            String fileName = UUID.randomUUID()+"_"+image.getOriginalFilename();
            Path path = Paths.get(uploadDir,fileName);
            Files.createDirectories(path.getParent());
            Files.copy(
                    image.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );
            if(teacher.getImage()!=null){
                Files.deleteIfExists(Paths.get(teacher.getImage()));
            }
            teacher.setImage(uploadDir+fileName);
            teacher.setUpdatedAt(LocalDateTime.now());
            teacherRepository.save(teacher);
            return "Update image";
        } catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }

}
