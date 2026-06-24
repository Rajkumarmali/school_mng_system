package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.college.CollegeRequest;
import com.example.UniversityManagementSystem.dto.college.CollegeResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.type.RolesName;
import com.example.UniversityManagementSystem.repository.RolesRepository;
import com.example.UniversityManagementSystem.repository.CollegeRepository;
import com.example.UniversityManagementSystem.repository.UniversityRepository;
import com.example.UniversityManagementSystem.repository.UserRepository;
import com.example.UniversityManagementSystem.services.AddressService;
import com.example.UniversityManagementSystem.services.AuthService;
import com.example.UniversityManagementSystem.services.CollegeServices;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CollegeServicesImp implements CollegeServices {

    private final CollegeRepository collegeRepository;
    private final AuthService authService;
    private final RolesRepository rolesRepository;
    private final UniversityRepository universityRepository;
    private final AddressService addressService;
    private final UserRepository userRepository;

    public CollegeServicesImp(CollegeRepository collegeRepository, AuthService authService, RolesRepository rolesRepository, UniversityRepository universityRepository, AddressService addressService,
                              UserRepository userRepository) {
        this.collegeRepository = collegeRepository;
        this.authService = authService;
        this.rolesRepository = rolesRepository;
        this.universityRepository = universityRepository;
        this.addressService = addressService;
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public College createCollege(CollegeRequest dto,Long universityId) {

        College college = new College();

        University university = universityRepository.findById(universityId).orElseThrow(()->{
            throw  new IllegalArgumentException("University not found");
        });

        Address savedAddress = addressService.createAddress(dto.getAddressRequest());

        college.setName(dto.getName());
        college.setShortName(dto.getShortName());
        college.setEmail(dto.getEmail());
        college.setPhoneNumber(dto.getPhoneNumber());
        college.setUniversity(university);
        college.setAddress(savedAddress);
        college.setCreatedAt(LocalDateTime.now());

        College savedCollege =  collegeRepository.save(college);

        savedCollege.setCollegeCode(university.getShortName().toUpperCase() + "-" + String.format("%03d", savedCollege.getId()));

        savedCollege = collegeRepository.save(savedCollege);

        for (RolesName roleName : RolesName.values()) {
            Roles role = new Roles();
            role.setName(roleName.name());
            role.setCollege(savedCollege);
            role.setCreatedAt(LocalDateTime.now());
            rolesRepository.save(role);
        }

        authService.createUser(dto.getEmail(),savedCollege,universityId,"ADMIN");

        return savedCollege;
    }

    @Transactional
    @Override
    public String updateCollege(CollegeRequest dto, Long id) {
        College college = collegeRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("College not found"));

        if(dto.getAddressRequest()!=null){
          return addressService.updateAddress(college.getAddress().getId(),dto.getAddressRequest());
        }

        User user = userRepository.findByEmailAndCollege(college.getEmail(),college);

        user.setEmail(dto.getEmail());
        user.setUpdatedAt(LocalDateTime.now());

        college.setName(dto.getName());
        college.setShortName(dto.getShortName());
        college.setEmail(dto.getEmail());
        college.setPhoneNumber(dto.getPhoneNumber());
        college.setUpdatedAt(LocalDateTime.now());

        collegeRepository.save(college);

        return "College Update successfully";
    }

    @Override
    public List<CollegeResponse> getAllCollege() {
        List<College> colleges = collegeRepository.findAll();

        List<CollegeResponse> res = colleges.stream().map(college -> {

            Address address = college.getAddress();

            CollegeResponse response = new CollegeResponse();
            AddressResponse addressResponse = new AddressResponse();

            addressResponse.setDistrict(address.getAddress());
            addressResponse.setState(address.getState());
            addressResponse.setPincode(address.getPincode());

            response.setId(college.getId());
            response.setName(college.getName());
            response.setShortName(college.getShortName());
            response.setCollegeCode(college.getCollegeCode());
            response.setEmail(college.getEmail());
            response.setPhoneNumber(college.getPhoneNumber());
            response.setAddressResponse(addressResponse);

            return response;
        }).toList();

        return res;
    }

    @Override
    public CollegeResponse getCollegeById(Long id) {
        College college = collegeRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Tenant not found"));

        CollegeResponse response = new CollegeResponse();
        Address address = college.getAddress();

        AddressResponse addressResponse = new AddressResponse();

        addressResponse.setAddress(address.getAddress());
        addressResponse.setCity(address.getCity());
        addressResponse.setDistrict(address.getDistrict());
        addressResponse.setState(address.getState());
        addressResponse.setCountry(address.getCountry());
        addressResponse.setPincode(address.getPincode());

        response.setId(college.getId());
        response.setName(college.getName());
        response.setShortName(college.getShortName());
        response.setCollegeCode(college.getCollegeCode());
        response.setEmail(college.getEmail());
        response.setPhoneNumber(college.getPhoneNumber());
        response.setAddressResponse(addressResponse);

        return response;
    }

    @Override
    public String deleteCollege(Long id) {
        College college = collegeRepository.findById(id).orElseThrow(()->
          new IllegalArgumentException("College not found")
        );
        collegeRepository.delete(college);
        return "College delete successfully";
    }

}
