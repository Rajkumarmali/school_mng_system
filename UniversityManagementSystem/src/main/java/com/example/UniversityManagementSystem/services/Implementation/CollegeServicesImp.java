package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.college.CollegeRequest;
import com.example.UniversityManagementSystem.dto.college.CollegeResponse;
import com.example.UniversityManagementSystem.dto.college.CollegeStudentResponse;
import com.example.UniversityManagementSystem.dto.college.StudentAcademicResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.type.RolesName;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.AddressService;
import com.example.UniversityManagementSystem.services.AuthService;
import com.example.UniversityManagementSystem.services.CollegeServices;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
public class CollegeServicesImp implements CollegeServices {

    private final CollegeRepository collegeRepository;
    private final AuthService authService;
    private final RolesRepository rolesRepository;
    private final UniversityRepository universityRepository;
    private final AddressService addressService;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    private final Logger logger = LoggerFactory.getLogger(CollegeServicesImp.class);
    private final ModelMapper modelMapper = new ModelMapper();

    public CollegeServicesImp(CollegeRepository collegeRepository, AuthService authService, RolesRepository rolesRepository, UniversityRepository universityRepository, AddressService addressService,
                              UserRepository userRepository,
                              StudentRepository studentRepository,
                              CourseRepository courseRepository) {
        this.collegeRepository = collegeRepository;
        this.authService = authService;
        this.rolesRepository = rolesRepository;
        this.universityRepository = universityRepository;
        this.addressService = addressService;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }


    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "colleges",allEntries = true)}
    )
    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
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
    @Caching(evict = {
            @CacheEvict(value = "college",key = "#id"),
            @CacheEvict(value = "colleges",allEntries = true)
    })
    @PreAuthorize("hasRole('SUPER_ADMIN')")
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

    @Cacheable(cacheNames = "colleges",key = "{#pageNumber,#pageSize}")
    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public Page<CollegeResponse> getAllCollege(int pageNumber,int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Page<College> colleges = collegeRepository.findAll(pageable);

        Page<CollegeResponse> res = colleges.map(college -> {

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
        });

        return res;
    }

    @Cacheable(cacheNames = "college",key = "#id")
    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public CollegeResponse getCollegeById(Long id) {
        College college = collegeRepository.findById(id).orElseThrow(()->new IllegalArgumentException("College not found"));

        CollegeResponse response = new CollegeResponse();
        Address address = college.getAddress();

        AddressResponse addressResponse = new AddressResponse();

        addressResponse.setAddress(address.getAddress());
        addressResponse.setCity(address.getCity());
        addressResponse.setDistrict(address.getDistrict());
        addressResponse.setState(address.getState());
        addressResponse.setCountry(address.getCountry());
        addressResponse.setPincode(address.getPincode());

        Integer totalStudent = college.getStudents()
                .stream()
                .filter(sf->sf.getRollNumber()!=null)
                .toList().size();

        Integer totalFaculty = college.getTeachers().size();
        Integer totalDepartment = college.getDepartments().size();
        Integer totalCourse = college.getCourses().size();

        response.setId(college.getId());
        response.setName(college.getName());
        response.setShortName(college.getShortName());
        response.setCollegeCode(college.getCollegeCode());
        response.setEmail(college.getEmail());
        response.setPhoneNumber(college.getPhoneNumber());
        response.setTotalStudent(totalStudent);
        response.setTotalFaculty(totalFaculty);
        response.setTotalDepartment(totalDepartment);
        response.setTotalCourse(totalCourse);
        response.setAddressResponse(addressResponse);

        return response;
    }

    @Caching(evict = {
            @CacheEvict(value = "college",key = "#id"),
            @CacheEvict(value = "colleges",allEntries = true)
    })
    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public String deleteCollege(Long id) {
        College college = collegeRepository.findById(id).orElseThrow(()->
          new IllegalArgumentException("College not found")
        );
        collegeRepository.delete(college);
        return "College delete successfully";
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "collegeCourses",allEntries = true)
    })
    public String assignCourseToCollege(Long collegeId, String courseCode) {
        College college = collegeRepository.findById(collegeId).orElseThrow(()->
                new IllegalArgumentException("College not found"));
        Course course = courseRepository.findByCourseCode(courseCode);
        if(course==null){
            throw new IllegalArgumentException("Course not found");
        }
        if (college.getCourses().contains(course)) {
            return "Course is already assigned to this college";
        }
        college.getCourses().add(course);
        collegeRepository.save(college);
        return "Course assigned to college successfully";
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "collegeStudents",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<CollegeStudentResponse> getCollegeStudent(Long collegeId, int pageNumber, int pageSize) {
        logger.info("Fetching college students | collegeId = {}",collegeId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<Student> students = studentRepository.findByCollegeIdAndRollNumberNotNull(collegeId,pageable);

            Page<CollegeStudentResponse> response = students.map(stu->{
                StudentAcademic studentAcademic = stu.getStudentAcademics().stream()
                        .filter(sa->Boolean.TRUE.equals(sa.getIsCurrent()))
                        .findFirst()
                        .orElse(null);
                StudentAcademicResponse studentAcademicResponse = new StudentAcademicResponse();

                CollegeStudentResponse res = modelMapper.map(stu,CollegeStudentResponse.class);
                if(studentAcademic!=null){
                    studentAcademicResponse = modelMapper.map(studentAcademic,StudentAcademicResponse.class);
                }
                res.setStudentAcademicResponse(studentAcademicResponse);
                return res;
            });

            logger.info("Successfully fetched college student | collegeId = {} | returnedElements = {}",collegeId,response.getNumberOfElements());
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched college Students | collegeId = {}",collegeId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "collegeAdmission",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<CollegeStudentResponse> getCollegeAdmission(Long collegeId, int pageNumber, int pageSize) {
      logger.info("Fetching college admission students | collegeId = {}",collegeId);
      try{
          Pageable pageable = PageRequest.of(pageNumber,pageSize);
          Page<Student> students = studentRepository.findByCollegeIdAndRollNumberNull(collegeId,pageable);

          Page<CollegeStudentResponse> response = students.map(stu->{
              StudentAcademic studentAcademic = stu.getStudentAcademics().stream()
                      .filter(sa->Boolean.TRUE.equals(sa.getIsCurrent()))
                      .findFirst()
                      .orElse(null);
              StudentAcademicResponse studentAcademicResponse = new StudentAcademicResponse();

              CollegeStudentResponse res = modelMapper.map(stu,CollegeStudentResponse.class);
              if(studentAcademic!=null){
                  studentAcademicResponse = modelMapper.map(studentAcademic,StudentAcademicResponse.class);
              }
              res.setStudentAcademicResponse(studentAcademicResponse);
              return res;
          });
          logger.info("Successfully fetched college admission student | collegeId = {} | returnedElements = {}",collegeId,response.getNumberOfElements());
          return response;
      } catch (Exception e) {
          logger.error("Failed to fetched college admission students | collegeId = {}",collegeId,e);
          throw new RuntimeException(e);
      }
    }


    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "collegeStudent",key = "#studentId")
    public CollegeStudentResponse getStudentById(Long studentId) {
        logger.info("Fetching student by id ");
        try{
            Student student = studentRepository.findById(studentId).orElseThrow(()->
                    new IllegalArgumentException("Student not found"));

            StudentAcademic studentAcademic = student.getStudentAcademics().stream()
                    .filter(sa->Boolean.TRUE.equals(sa.getIsCurrent()))
                    .findFirst()
                    .orElse(null);
            StudentAcademicResponse studentAcademicResponse = new StudentAcademicResponse();

            CollegeStudentResponse response = modelMapper.map(student,CollegeStudentResponse.class);
            AddressResponse addressResponse = modelMapper.map(student.getAddress(),AddressResponse.class);
            ParentResponse parentResponse = modelMapper.map(student.getParent(),ParentResponse.class);
            if(studentAcademic!=null){
                studentAcademicResponse = modelMapper.map(studentAcademic,StudentAcademicResponse.class);
            }

            response.setAddressResponse(addressResponse);
            response.setParentResponse(parentResponse);
            response.setStudentAcademicResponse(studentAcademicResponse);

            logger.info("Successfully fetched student by id | studentId = {}",studentId);
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched studen by id | studentId = {}",studentId,e);
            throw new RuntimeException(e);
        }

    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "collegeStudent",key = "#studentId"),
            @CacheEvict(cacheNames = "collegeStudents",allEntries = true),
            @CacheEvict(cacheNames = "collegeAdmission",allEntries = true),
            @CacheEvict(cacheNames = "college",allEntries = true),
            @CacheEvict(cacheNames = "universityStudent",key = "#studentId"),
            @CacheEvict(cacheNames = "universityStudents",allEntries = true),
            @CacheEvict(cacheNames = "universityAdmissionStudents",allEntries = true),
            @CacheEvict(cacheNames = "university",allEntries = true),
    })
    public String generateEnrollmentNumberAndRollNumber(Long studentId) {

        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));

        String year = String.valueOf(LocalDate.now().getYear());
        String enrollmentNumber = year+"MDSU"+studentId;
        String rollNumber = year+studentId;

        student.setEnrollmentNumber(enrollmentNumber);
        student.setRollNumber(rollNumber);
        studentRepository.save(student);

        return "EnrollmentNumber and rollNumber generate successfully";
    }

}
