package com.example.UniversityManagementSystem.dto.fee;

import com.example.UniversityManagementSystem.entity.type.Gender;

import java.io.Serializable;

public class StudentResponse implements Serializable {
    private Long id;
    private String name;
    private String email;
    private String registrationNumber;
    private String phoneNumber;
    private Gender gender;
    private String className;
    private String classCode;
    private String departmentName;
    private String departmentCode;
    private String fatherName;
    private String motherName;
    private String fatherNumber;
    private String motherNumber;
    private Double totalFee;
    private Double totalPaidFee;
    private Double totalPendingFee;


    public StudentResponse() {
    }

    public StudentResponse(Long id, String name, String email, String registrationNumber, String phoneNumber,
                           Gender gender, String className, String classCode, String departmentName, String departmentCode,
                           String fatherName, String motherName, String fatherNumber, String motherNumber,
                           Double totalFee, Double totalPaidFee, Double totalPendingFee) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.registrationNumber = registrationNumber;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.className = className;
        this.classCode = classCode;
        this.departmentName = departmentName;
        this.departmentCode = departmentCode;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.fatherNumber = fatherNumber;
        this.motherNumber = motherNumber;
        this.totalFee = totalFee;
        this.totalPaidFee = totalPaidFee;
        this.totalPendingFee = totalPendingFee;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Double getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(Double totalFee) {
        this.totalFee = totalFee;
    }

    public Double getTotalPaidFee() {
        return totalPaidFee;
    }

    public void setTotalPaidFee(Double totalPaidFee) {
        this.totalPaidFee = totalPaidFee;
    }

    public Double getTotalPendingFee() {
        return totalPendingFee;
    }

    public void setTotalPendingFee(Double totalPendingFee) {
        this.totalPendingFee = totalPendingFee;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getFatherNumber() {
        return fatherNumber;
    }

    public void setFatherNumber(String fatherNumber) {
        this.fatherNumber = fatherNumber;
    }

    public String getMotherNumber() {
        return motherNumber;
    }

    public void setMotherNumber(String motherNumber) {
        this.motherNumber = motherNumber;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }
}
