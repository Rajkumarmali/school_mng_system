package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.dto.student.StudentResponse;
import com.example.UniversityManagementSystem.dto.teacher.TeacherResponse;
import com.example.UniversityManagementSystem.dto.user.UpdateUserRequest;
import com.example.UniversityManagementSystem.dto.user.UserResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.UserServices;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServicesImp implements UserServices {

    private final UserRepository userRepository;

    public UserServicesImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Cacheable(cacheNames = "user",key = "#userId")
    public UserResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("User not found"));
        UserResponse response = new UserResponse();
        List<String> userRoles = user.getRoles()
                .stream()
                .map(Roles::getName)
                .collect(Collectors.toList());

        if(user.getTeacher()!=null){
            Teacher teacher = user.getTeacher();

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

            teacherResponse.setFirstName(teacher.getFirstName());
            teacherResponse.setLastName(teacher.getLastName());
            teacherResponse.setGender(teacher.getGender());
            teacherResponse.setEmployeeId(teacher.getEmployeeId());
            teacherResponse.setEmail(teacher.getEmail());
            teacherResponse.setPhoneNumber(teacher.getPhoneNumber());
            teacherResponse.setDob(teacher.getDob());
            teacherResponse.setCast(teacher.getCast());
            teacherResponse.setAadharNumber(teacher.getAadharNumber());
            teacherResponse.setPanNumber(teacher.getPanNumber());
            teacherResponse.setAddressResponse(addressResponse);
            teacherResponse.setParentResponse(parentResponse);
            response.setTeacherResponse(teacherResponse);
        } else if(user.getStudent()!=null){
            Student student = user.getStudent();
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
            response.setStudentResponse(studentResponse);
        }
        response.setUserImage(user.getUserProfile());
        response.setUserRoles(userRoles);
        response.setId(user.getId());
        response.setUserName(user.getUsername());
        response.setEmail(user.getEmail());
        return response;
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "user",key = "#userId"),
            @CacheEvict(cacheNames = "users",allEntries = true)
    })
    public UserResponse updateUser(Long userId, UpdateUserRequest dto) {
        User user = userRepository.findById(userId).orElseThrow(()-> new IllegalArgumentException("User not found"));

        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUserName());
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);

        UserResponse res = new UserResponse();

        res.setId(updatedUser.getId());
        res.setEmail(updatedUser.getEmail());
        res.setUserName(updatedUser.getUsername());
        return res;
    }

    @Override
    @Cacheable(cacheNames = "users",key="{#collegeId,#pageNumber,#pageSize}")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserResponse> getAllUsers(Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Page<User> users = userRepository.findByCollegeId(collegeId,pageable);
        Page<UserResponse> res = users.map(user->{
            UserResponse response = new UserResponse();
            response.setId(user.getId());
            response.setEmail(user.getEmail());
            response.setUserName(user.getUsername());
            return response;
        });

        return res;
    }

    @Caching(evict = {
            @CacheEvict(cacheNames = "users",allEntries = true),
            @CacheEvict(cacheNames = "user",key = "#userId")
    })
    @Override
    public String updateUserImage(Long userId, MultipartFile image) {
        try{
            User user = userRepository.findById(userId).orElseThrow(()->{
                throw new IllegalArgumentException("User not found");
            });
            String uploadDir = "upload/user/";
            String fileName = UUID.randomUUID()+"_"+image.getOriginalFilename();
            Path path = Paths.get(uploadDir,fileName);
            Files.createDirectories(path.getParent());
            Files.copy(
                    image.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );
            if(user.getUserProfile()!=null){
                Files.deleteIfExists(Paths.get(user.getUserProfile()));
            }
            user.setUserProfile(uploadDir+fileName);
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
            return "Image update successfully";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
