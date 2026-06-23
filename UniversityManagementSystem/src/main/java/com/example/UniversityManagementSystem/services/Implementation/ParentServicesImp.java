package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.parent.ParentRequest;
import com.example.UniversityManagementSystem.entity.Parent;
import com.example.UniversityManagementSystem.repository.ParentRepository;
import com.example.UniversityManagementSystem.services.ParentServices;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ParentServicesImp implements ParentServices {

    private ParentRepository parentRepository;

    public ParentServicesImp(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    @Override
    public Parent createParent(ParentRequest dto) {
        Parent parent = new Parent();
        parent.setFatherName(dto.getFatherName());
        parent.setFatherNumber(dto.getFatherNumber());
        parent.setFatherOccupation(dto.getFatherOccupation());
        parent.setMotherName(dto.getMotherName());
        parent.setMotherNumber(dto.getMotherNumber());
        parent.setMotherOccupation(dto.getMotherOccupation());
        parent.setCreatedAt(LocalDateTime.now());
        return parentRepository.save(parent);
    }

    @Override
    public String updateParent(Long parentId,ParentRequest dto) {
        Parent parent = parentRepository.findById(parentId).orElseThrow(()->
                new IllegalArgumentException("Parents not found"));
        parent.setFatherName(dto.getFatherName());
        parent.setFatherNumber(dto.getFatherNumber());
        parent.setFatherOccupation(dto.getFatherOccupation());
        parent.setMotherName(dto.getMotherName());
        parent.setMotherNumber(dto.getMotherNumber());
        parent.setMotherOccupation(dto.getMotherOccupation());
        parent.setUpdatedAt(LocalDateTime.now());
        parentRepository.save(parent);
        return "Update parents successfully";
    }
}
