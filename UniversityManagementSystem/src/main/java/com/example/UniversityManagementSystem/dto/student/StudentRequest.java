package com.example.UniversityManagementSystem.dto.student;

import com.example.UniversityManagementSystem.dto.address.AddressRequest;
import com.example.UniversityManagementSystem.dto.parent.ParentRequest;
import com.example.UniversityManagementSystem.entity.Address;
import com.example.UniversityManagementSystem.entity.type.Cast;
import com.example.UniversityManagementSystem.entity.type.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class StudentRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDate dob;
    private Gender gender;
    private Cast cast;
    private String aadharNumber;
    private String academicYear;
    private String departmentCode;
    private String courseCode;
    private AddressRequest addressRequest;
    private ParentRequest parentRequest;


}
