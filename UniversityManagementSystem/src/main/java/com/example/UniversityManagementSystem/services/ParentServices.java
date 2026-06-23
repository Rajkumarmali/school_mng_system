package com.example.UniversityManagementSystem.services;

import com.example.UniversityManagementSystem.dto.parent.ParentRequest;
import com.example.UniversityManagementSystem.entity.Parent;

public interface ParentServices {
    public Parent createParent(ParentRequest dto);
    public String updateParent(Long parentId,ParentRequest dto);
}
