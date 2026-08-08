package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.dto.university.StudentResponse;
import com.example.UniversityManagementSystem.dto.university.UniversityResponse;
import com.example.UniversityManagementSystem.entity.Address;
import com.example.UniversityManagementSystem.entity.Parent;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.University;
import com.example.UniversityManagementSystem.repository.StudentRepository;
import com.example.UniversityManagementSystem.repository.UniversityRepository;
import com.example.UniversityManagementSystem.services.UniversityService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UniversityServicesImp implements UniversityService {

    private final UniversityRepository universityRepository;
    private final StudentRepository studentRepository;

    public UniversityServicesImp(UniversityRepository universityRepository,
                                 StudentRepository studentRepository) {
        this.universityRepository = universityRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    @Cacheable(cacheNames = "university",key = "'university'")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public UniversityResponse getUniversityOveriew() {
        List<University> universitys = universityRepository.findAll();
        University university = universitys.get(0);
        Address address = university.getAddress();

        AddressResponse addressResponse = new AddressResponse();
        addressResponse.setId(address.getId());
        addressResponse.setAddress(address.getAddress());
        addressResponse.setCity(address.getCity());
        addressResponse.setDistrict(address.getDistrict());
        addressResponse.setState(address.getState());
        addressResponse.setCountry(address.getCountry());
        addressResponse.setPincode(address.getPincode());

        UniversityResponse response = new UniversityResponse();
        response.setId(university.getId());
        response.setEmail(university.getEmail());
        response.setName(university.getName());
        response.setPhoneNumber(university.getPhoneNumber());
        response.setShortName(university.getShortName());
        response.setUniversityCode(university.getUniversityCode());
        response.setAddressResponse(addressResponse);

        return response;
    }

    @Override
    @Cacheable(cacheNames = "universityStudents",key = "{#pageNumber,#pageSize}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public Page<StudentResponse> getStudents(int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"CreatedAt"));
        Page<Student> students = studentRepository.findByCollegeIdAndRollNumberNotNull(null,pageable);
        Page<StudentResponse> responses =  students.map(stu -> {
            StudentResponse res = new StudentResponse();
            res.setId(stu.getId());
            res.setName(stu.getFirstName()+" "+stu.getLastName());
            res.setEmail(stu.getEmail());
            res.setPhoneNumber(stu.getPhoneNumber());
            res.setGender(stu.getGender());
            if(stu.getDepartment()!=null)
                res.setCourse(stu.getDepartment().getCourse().getCourseCode());
            res.setEnrollmentNumber(stu.getEnrollmentNumber());
            res.setRollNumber(stu.getRollNumber());
            return res;
        });
        return responses;
    }

    @Override
    @Cacheable(cacheNames = "universityAdmissionStudents",key = "{#pageNumber,#pageSize}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public Page<StudentResponse> getAdmissionStudent(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"CreatedAt"));
        Page<Student> students = studentRepository.findByCollegeIdAndRollNumberNull(null,pageable);
        Page<StudentResponse> responses =  students.map(stu -> {
            StudentResponse res = new StudentResponse();
            res.setId(stu.getId());
            res.setName(stu.getFirstName()+" "+stu.getLastName());
            res.setEmail(stu.getEmail());
            res.setPhoneNumber(stu.getPhoneNumber());
            res.setGender(stu.getGender());
            if(stu.getDepartment()!=null)
                res.setCourse(stu.getDepartment().getCourse().getCourseCode());
            res.setEnrollmentNumber(stu.getEnrollmentNumber());
            res.setRollNumber(stu.getRollNumber());
            return res;
        });
        return responses;
    }

    @Override
    @Cacheable(cacheNames = "universityStudent",key = "#studentId")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public StudentResponse getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));

        Address address = student.getAddress();
        Parent parent = student.getParent();

        StudentResponse response = new StudentResponse();
        AddressResponse addressResponse = new AddressResponse();
        ParentResponse parentResponse = new ParentResponse();

        addressResponse.setId(address.getId());
        addressResponse.setAddress(address.getAddress());
        addressResponse.setCity(address.getCity());
        addressResponse.setDistrict(address.getDistrict());
        addressResponse.setState(address.getState());
        addressResponse.setCountry(address.getCountry());
        addressResponse.setPincode(address.getPincode());

        parentResponse.setId(parent.getId());
        parentResponse.setFatherName(parent.getFatherName());
        parentResponse.setFatherNumber(parent.getFatherNumber());
        parentResponse.setFatherOccupation(parent.getFatherOccupation());
        parentResponse.setMotherName(parent.getMotherName());
        parentResponse.setMotherNumber(parent.getMotherNumber());
        parentResponse.setMotherOccupation(parent.getMotherOccupation());

        response.setId(student.getId());
        response.setName(student.getFirstName()+" "+student.getLastName());
        response.setEnrollmentNumber(student.getEnrollmentNumber());
        response.setRollNumber(student.getRollNumber());
        response.setEmail(student.getEmail());
        response.setPhoneNumber(student.getPhoneNumber());
        response.setDob(student.getDob());
        response.setGender(student.getGender());
        response.setCast(student.getCast());
        response.setAadhaarNumber(student.getAadhaarNumber());
        response.setImage(student.getImage());
        if(student.getDepartment()!=null) {
            response.setDepartment(student.getDepartment().getName() + " (" + student.getDepartment().getCode() + " )");
            response.setCourse(student.getDepartment().getCourse().getName()+" ("+student.getDepartment().getCourse().getCourseCode()+" )");
        }
        response.setAddressResponse(addressResponse);
        response.setParentResponse(parentResponse);

        return response;
    }
}
