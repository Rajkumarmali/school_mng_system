package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressRequest;
import com.example.UniversityManagementSystem.entity.Address;
import com.example.UniversityManagementSystem.repository.AddressRepository;
import com.example.UniversityManagementSystem.services.AddressService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AddressServicesImp implements AddressService {

    private AddressRepository addressRepository;

    public AddressServicesImp(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Address createAddress(AddressRequest dto) {
        Address address = new Address();
        address.setAddress(dto.getAddress());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setDistrict(dto.getDistrict());
        address.setCountry(dto.getCountry());
        address.setPincode(dto.getPincode());
        address.setCreatedAt(LocalDateTime.now());
        return addressRepository.save(address);
    }

    @Override
    public String updateAddress(Long addressId, AddressRequest dto) {
        Address address = addressRepository.findById(addressId).orElseThrow(()->
                new IllegalArgumentException("Address not found"));
        address.setAddress(dto.getAddress());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setDistrict(dto.getDistrict());
        address.setCountry(dto.getCountry());
        address.setPincode(dto.getPincode());
        address.setUpdatedAt(LocalDateTime.now());
        addressRepository.save(address);
        return "Update address successfully";
    }
}
