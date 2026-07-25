package com.example.UniversityManagementSystem.entity;

import com.example.UniversityManagementSystem.entity.type.Cast;
import com.example.UniversityManagementSystem.entity.type.Gender;
import com.example.UniversityManagementSystem.entity.type.SubjectType;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String enrollmentNumber;
    private String rollNumber;

    private String firstName;
    private String lastName;
    private String email;
    private String registrationNumber;
    private String phoneNumber;
    private LocalDate dob;
    private String image;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated
    private Cast cast;

    private String aadhaarNumber;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Address address;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private College college;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Parent parent;

    @ManyToOne()
    private Department department;

    @ManyToMany(mappedBy = "students")
    private List<Class> classes=new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<StudentFee> studentFees=new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<StudentDocument> studentDocument = new ArrayList<>();

    @ManyToMany(mappedBy = "students")
    private List<Scholarship> scholarships = new ArrayList<>() ;

    @OneToMany(mappedBy = "student")
    private List<StudentSubject> studentSubjects = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Student(Long id, String firstName, String lastName, String email, String registrationNumber,
                   String phoneNumber, LocalDate dob, String image, Gender gender, Cast cast, String aadhaarNumber,
                   Address address, User user, College college, Parent parent, Department department, List<Class> classes, LocalDateTime createdAt,
                   LocalDateTime updatedAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.registrationNumber = registrationNumber;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.image = image;
        this.gender = gender;
        this.cast = cast;
        this.aadhaarNumber = aadhaarNumber;
        this.address = address;
        this.user = user;
        this.college = college;
        this.parent = parent;
        this.department = department;
        this.classes = classes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Student() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Cast getCast() {
        return cast;
    }

    public void setCast(Cast cast) {
        this.cast = cast;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public College getCollege() {
        return college;
    }

    public void setCollege(College college) {
        this.college = college;
    }

    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Class> getClasses() {
        return classes;
    }

    public void setClasses(List<Class> classes) {
        this.classes = classes;
    }

    public List<StudentFee> getStudentFees() {
        return studentFees;
    }

    public void setStudentFees(List<StudentFee> studentFees) {
        this.studentFees = studentFees;
    }

    public String getEnrollmentNumber() {
        return enrollmentNumber;
    }

    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public List<StudentDocument> getStudentDocument() {
        return studentDocument;
    }

    public void setStudentDocument(List<StudentDocument> studentDocument) {
        this.studentDocument = studentDocument;
    }

    public List<Scholarship> getScholarships() {
        return scholarships;
    }

    public void setScholarships(List<Scholarship> scholarships) {
        this.scholarships = scholarships;
    }

    public List<StudentSubject> getStudentSubjects() {
        return studentSubjects;
    }

    public void setStudentSubjects(List<StudentSubject> studentSubjects) {
        this.studentSubjects = studentSubjects;
    }
}
