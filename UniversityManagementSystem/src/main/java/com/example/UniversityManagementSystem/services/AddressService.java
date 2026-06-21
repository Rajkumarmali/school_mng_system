package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.address.AddressRequest;
import com.example.UniversityManagementSystem.entity.Address;

public interface AddressService {
    public Address createAddress(AddressRequest addressRequest);
    public String updateAddress(Long addressId,AddressRequest dto);
}
