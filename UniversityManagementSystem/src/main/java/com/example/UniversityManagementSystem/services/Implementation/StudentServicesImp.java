package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.address.AddressResponse;
import com.example.UniversityManagementSystem.dto.parent.ParentResponse;
import com.example.UniversityManagementSystem.dto.student.*;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.Address;
import com.example.UniversityManagementSystem.entity.College;
import com.example.UniversityManagementSystem.entity.Parent;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.University;
import com.example.UniversityManagementSystem.entity.type.AttendanceStatus;
import com.example.UniversityManagementSystem.entity.type.CourseDurationType;
import com.example.UniversityManagementSystem.entity.type.DocumentStatus;
import com.example.UniversityManagementSystem.entity.type.SectionStatus;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.AddressService;
import com.example.UniversityManagementSystem.services.AuthService;
import com.example.UniversityManagementSystem.services.ParentServices;
import com.example.UniversityManagementSystem.services.StudentServices;
import jakarta.transaction.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class StudentServicesImp implements StudentServices {

    private final StudentRepository studentRepository;
    private final CollegeRepository collegeRepository;
    private final AuthService authService;
    private final AddressService addressService;
    private final ParentServices parentServices;
    private final UniversityRepository universityRepository;
    private final DepartmentRepository departmentRepository;
    private final StudentDocumentRepository studentDocumentRepository;

    private final Logger logger = LoggerFactory.getLogger(StudentServicesImp.class);
    private final ModelMapper modelMapper = new ModelMapper();
    private final StudentSubjectRepository studentSubjectRepository;
    private final StudentAttendanceRepository studentAttendanceRepository;
    private final CourseRepository courseRepository;
    private final StudentAcademicRepository studentAcademicRepository;

    public StudentServicesImp(StudentRepository studentRepository, CollegeRepository collegeRepository, AuthService authService, AddressService addressService, ParentServices parentServices,
                              UniversityRepository universityRepository,
                              DepartmentRepository departmentRepository,
                              StudentDocumentRepository studentDocumentRepository,
                              StudentSubjectRepository studentSubjectRepository,
                              StudentAttendanceRepository studentAttendanceRepository,
                              CourseRepository courseRepository,
                              StudentAcademicRepository studentAcademicRepository) {
        this.studentRepository = studentRepository;
        this.collegeRepository = collegeRepository;
        this.authService = authService;
        this.addressService = addressService;
        this.parentServices = parentServices;
        this.universityRepository = universityRepository;
        this.departmentRepository = departmentRepository;
        this.studentDocumentRepository = studentDocumentRepository;
        this.studentSubjectRepository = studentSubjectRepository;
        this.studentAttendanceRepository = studentAttendanceRepository;
        this.courseRepository = courseRepository;
        this.studentAcademicRepository = studentAcademicRepository;
    }


    private void createStudentAcademic(String academicYear,Student student,String courseCode,String departmentCode){
        Course course = courseRepository.findByCourseCode(courseCode);
        Department department = departmentRepository.findByCode(departmentCode);

        StudentAcademic studentAcademic = new StudentAcademic();
        studentAcademic.setYear(1);
        if(Objects.equals(course.getCourseDurationType(), CourseDurationType.SEMESTER)){
            studentAcademic.setSemester(1);
        }
        studentAcademic.setAcademicYear(academicYear);
        studentAcademic.setIsCurrent(true);
        studentAcademic.setStudent(student);
        studentAcademic.setCourse(course);
        studentAcademic.setDepartment(department);
        studentAcademic.setCreatedAt(LocalDateTime.now());
        studentAcademicRepository.save(studentAcademic);

    }

    private int[] getOverallAttendance(Long userId) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findByStudentUserIdAndSectionSubjectSectionStatus(userId,SectionStatus.ACTIVE);
        int totalPresent = 0;
        int totalAbsent = 0;
        for(StudentSubject subject:studentSubjects){
            for(StudentAttendance studentAttendance:subject.getStudentAttendances()){
                if(studentAttendance.getStatus()==AttendanceStatus.PRESENT)
                    totalPresent++;
                else if(studentAttendance.getStatus()==AttendanceStatus.ABSENT)
                    totalAbsent++;
            }
        }
        return new int[]{totalPresent,totalAbsent};
    }

    @Transactional
    @Caching(evict = {
           @CacheEvict(cacheNames = "students",allEntries = true)
    })
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public String createStudent(Long collegeId,Long universityId, StudentRequest dto,MultipartFile image) {
       logger.info("Creating new student");
       try{
           College college = null;
           if (collegeId!=null){
               college = collegeRepository.findById(collegeId).orElseThrow(()->
                       new IllegalArgumentException("College not found"));
           }
           University university = universityRepository.findById(universityId).orElseThrow(()->{
               throw new IllegalArgumentException("University not found");
           });

           Address savedAddress = addressService.createAddress(dto.getAddressRequest());
           User savedUser = authService.createUser(dto.getEmail(), college,universityId,"STUDENT");
           Parent savedParent = parentServices.createParent(dto.getParentRequest());

           String registrationNumber = "";
           if(college!=null)
               registrationNumber=college.getShortName().toUpperCase()+"-STU-";
           else
               registrationNumber = university.getShortName().toUpperCase()+"-STU-";

           Student student = new Student();

           if(image!=null &&!image.isEmpty()){
               try{
                   String uploadDir="upload/student/";
                   String fileName= UUID.randomUUID()+"_"+image.getOriginalFilename();
                   Path path = Paths.get(uploadDir,fileName);
                   Files.createDirectories(path.getParent());
                   Files.copy(
                           image.getInputStream(),
                           path,
                           StandardCopyOption.REPLACE_EXISTING
                   );
                   student.setImage(uploadDir+fileName);
               } catch (Exception ex){
                   throw new RuntimeException(ex);
               }
           }

           student.setFirstName(dto.getFirstName());
           student.setLastName(dto.getLastName());
           student.setEmail(dto.getEmail());
           student.setPhoneNumber(dto.getPhoneNumber());
           student.setDob(dto.getDob());
           student.setGender(dto.getGender());
           student.setCast(dto.getCast());
           student.setAadhaarNumber(dto.getAadharNumber());
           student.setAddress(savedAddress);
           student.setUser(savedUser);
           student.setCollege(college);
           student.setParent(savedParent);
           student.setCreatedAt(LocalDateTime.now());
           Student savedStudent = studentRepository.save(student);

           createStudentAcademic(dto.getAcademicYear(),savedStudent,dto.getCourseCode(),dto.getDepartmentCode());

           registrationNumber += String.format("%03d",savedStudent.getId());
           savedStudent.setRegistrationNumber(registrationNumber);
           studentRepository.save(savedStudent);

           return "Student create successfully";
       } catch (Exception e) {
           logger.error("Failed to create new student ",e);
           throw new RuntimeException(e);
       }
    }

    @Override
    @Cacheable(cacheNames = "students",key = "{#collegeId,#pageNumber,#pageSize}")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<StudentResponse> getAllStudent(Long collegeId,int pageNumber,int pageSize) {
        logger.info("Fetching students | collegeId = {}",collegeId);
        try {
            Pageable pageable = PageRequest.of(pageNumber,pageSize);

            Page<Student> studentList = studentRepository.findByCollegeId(collegeId,pageable);
            Page<StudentResponse> response = studentList.map(student -> {

                StudentAcademic studentAcademic = student.getStudentAcademics().stream()
                        .filter(sa-> Boolean.TRUE.equals(sa.getIsCurrent()))
                        .findFirst()
                        .orElse(null);

                StudentResponse studentResponse = modelMapper.map(student,StudentResponse.class);
                AddressResponse addressResponse = modelMapper.map(student.getAddress(),AddressResponse.class);
                ParentResponse parentResponse = modelMapper.map(student.getParent(),ParentResponse.class);
                StudentAcademicResponse studentAcademicResponse = new StudentAcademicResponse();
                if(studentAcademic!=null)
                    studentAcademicResponse =  modelMapper.map(studentAcademic,StudentAcademicResponse.class);

                studentResponse.setAddressResponse(addressResponse);
                studentResponse.setParentResponse(parentResponse);
                studentResponse.setStudentAcademicResponse(studentAcademicResponse);
                return studentResponse;
            });
            logger.info("Successfully fetched students | collegeId = {} | returnedElements = {}",collegeId,response.getNumberOfElements());
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched students | collegeId = {}",collegeId);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Cacheable(cacheNames = "student",key = "#studentId")
    @PreAuthorize("hasRole('ADMIN')")
    public StudentResponse getStudentById(Long studentId) {
        logger.info("Fetching student by id | studentId = {}",studentId);
        try{
            Student student = studentRepository.findById(studentId).orElseThrow(()->
                    new IllegalArgumentException("Student not found"));
            StudentAcademic studentAcademic = student.getStudentAcademics().stream()
                    .filter(sa-> Boolean.TRUE.equals(sa.getIsCurrent()))
                    .findFirst()
                    .orElse(null);

            StudentResponse studentResponse = modelMapper.map(student,StudentResponse.class);
            AddressResponse addressResponse = modelMapper.map(student.getAddress(),AddressResponse.class);
            ParentResponse parentResponse = modelMapper.map(student.getParent(),ParentResponse.class);
            StudentAcademicResponse studentAcademicResponse = new StudentAcademicResponse();
            if(studentAcademic!=null)
                studentAcademicResponse = modelMapper.map(studentAcademic,StudentAcademicResponse.class);

            studentResponse.setUsername(student.getUser().getUsername());
            studentResponse.setAddressResponse(addressResponse);
            studentResponse.setParentResponse(parentResponse);
            studentResponse.setStudentAcademicResponse(studentAcademicResponse);

            logger.info("Successfully fetched student by id | studentId = {}",studentId);
            return studentResponse;
        } catch (Exception e) {
            logger.error("Failed to fetched student by id | studentId = {}",studentId,e);
            throw new RuntimeException(e);
        }
    }

    @Transactional
    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "student",key = "#studentId"),
            @CacheEvict(cacheNames = "students",allEntries = true)
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String updateStudent(Long studentId, StudentRequest dto) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));
        if(dto.getDepartmentCode()!=null){
            Department department = departmentRepository.findByCode(dto.getDepartmentCode());
            StudentAcademic studentAcademic = student.getStudentAcademics().stream()
                    .filter(sa-> Boolean.TRUE.equals(sa.getIsCurrent()))
                    .findFirst()
                    .orElse(null);
            if(studentAcademic!=null){
                studentAcademic.setDepartment(department);
                studentAcademic.setUpdatedAt(LocalDateTime.now());
                studentAcademicRepository.save(studentAcademic);
            }
            return "Department update successfully";
        }
        else if(dto.getAddressRequest()!=null){
            return addressService.updateAddress(student.getAddress().getId(),dto.getAddressRequest());
        } else if(dto.getParentRequest()!=null){
            return parentServices.updateParent(student.getParent().getId(),dto.getParentRequest());
        }else{
            student.setFirstName(dto.getFirstName());
            student.setLastName(dto.getLastName());
            student.setEmail(dto.getEmail());
            student.setPhoneNumber(dto.getPhoneNumber());
            student.setDob(dto.getDob());
            student.setGender(dto.getGender());
            student.setCast(dto.getCast());
            student.setAadhaarNumber(dto.getAadharNumber());
            student.getUser().setEmail(dto.getEmail());
            student.setUpdatedAt(LocalDateTime.now());
            studentRepository.save(student);
        }
        return "Student update successfully";
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "student",key = "#studentId"),
            @CacheEvict(cacheNames = "students",allEntries = true)
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not fount"));
        studentRepository.delete(student);
        return "Student delete successfully";
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "student",key = "#studentId"),
            @CacheEvict(cacheNames = "students",allEntries = true)
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String UpdateImage(Long studentId, MultipartFile image) {
        Student student = studentRepository.findById(studentId).orElseThrow(()->{
           throw new IllegalArgumentException("Student not found");
        });
        try{
            String uploadDir="upload/student/";
            String fileName= UUID.randomUUID()+"_"+image.getOriginalFilename();
            Path path = Paths.get(uploadDir,fileName);
            Files.createDirectories(path.getParent());
            Files.copy(
                    image.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );

            if(student.getImage()!=null){
                Files.deleteIfExists(Paths.get(student.getImage()));
            }
            student.setImage(uploadDir+fileName);
            studentRepository.save(student);
            return "Update image successfully";
        } catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }


    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentDocuments",allEntries = true),
    })
    public String uploadDocument(Long studentId, DocumentRequest dto, MultipartFile file) {
        try{
            Student student = studentRepository.findById(studentId).orElseThrow(()->
                    new IllegalArgumentException("Student not found"));

            String uploadDir = "upload/student/document/"+studentId;
            File folder  = new File(uploadDir);
            if(!folder.exists()){
                folder.mkdirs();
            }

            String fileName = UUID.randomUUID()+"_"+file.getOriginalFilename();
            Path path = Paths.get(uploadDir,fileName);
            Files.copy(
                    file.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING);

            StudentDocument studentDocument = new StudentDocument();
            studentDocument.setDocumentName(dto.getDocumentName());
            studentDocument.setFileName(fileName);
            studentDocument.setDocumentType(dto.getDocumentType());
            studentDocument.setFilePath(path.toString());
            studentDocument.setFileSize(file.getSize());
            studentDocument.setStatus(DocumentStatus.PENDING);
            studentDocument.setStudent(student);
            studentDocument.setCreatedAt(LocalDateTime.now());
            studentDocumentRepository.save(studentDocument);

            return "Document upload successfully";
        } catch (IOException e){
            throw new RuntimeException("Failed to upload document",e);
        }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentDocuments",allEntries = true),
            @CacheEvict(cacheNames = "studentDocument",key = "#documentId"),
    })
    public String updateDocument(Long documentId, DocumentRequest dto, MultipartFile file) {
        try{
              StudentDocument studentDocument = studentDocumentRepository.findById(documentId).orElseThrow(()->
                      new IllegalArgumentException("Document not found"));

              if (file!=null){
                  Path oldPath=Paths.get(studentDocument.getFilePath());
                  if(Files.exists(oldPath)){
                      Files.delete(oldPath);
                  }
                  String uploadDir = "upload/student/document/"+studentDocument.getStudent().getId();
                  File folder = new File(uploadDir);
                  if(!folder.exists()){
                      folder.mkdirs();
                  }
                  String fileName = UUID.randomUUID()+"_"+file.getOriginalFilename();
                  Path newPath  = Paths.get(uploadDir,fileName);
                  Files.copy(file.getInputStream(),
                          newPath,
                          StandardCopyOption.REPLACE_EXISTING);
                  studentDocument.setFileName(fileName);
                  studentDocument.setFilePath(newPath.toString());
                  studentDocument.setFileSize(file.getSize());
              }
              studentDocument.setStatus(DocumentStatus.PENDING);
              studentDocument.setDocumentType(dto.getDocumentType());
              studentDocument.setDocumentName(dto.getDocumentName());
              studentDocument.setUpdatedAt(LocalDateTime.now());
              studentDocumentRepository.save(studentDocument);

              return  "Update document successfully";
        }  catch (Exception e){
            throw new RuntimeException("Failed to update document",e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentDocuments",allEntries = true),
            @CacheEvict(cacheNames = "studentDocument",key = "#documentId"),
    })
    public String updateDocumentStatus(Long documentId, String status) {
        StudentDocument document = studentDocumentRepository.findById(documentId).orElseThrow(()->
                new IllegalArgumentException("Document not found"));
       System.out.println(status);
        document.setStatus(DocumentStatus.valueOf(status));
        studentDocumentRepository.save(document);
        return "Status update successfully";
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentDocuments",allEntries = true),
            @CacheEvict(cacheNames = "studentDocument",key = "#documentId"),
    })
    public String deleteDocument(Long documentId) {
        StudentDocument studentDocument = studentDocumentRepository.findById(documentId).orElseThrow(()->
                new IllegalArgumentException("Document not found"));
        try{
            Path path = Paths.get(studentDocument.getFilePath());
            if(Files.exists(path)){
                Files.delete(path);
            }
            studentDocumentRepository.delete(studentDocument);
            return "Delete successfully";
        } catch (Exception e){
            throw new RuntimeException("Failed to upload document",e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @Cacheable(cacheNames = "studentDocuments",key = "#studentId")
    public List<DocumentResponse> getStudentDocument(Long studentId) {
        List<StudentDocument> documents = studentDocumentRepository.findByStudentId(studentId);
        List<DocumentResponse> responses  = documents.stream().map(document->{
            DocumentResponse res = new DocumentResponse();
             res.setId(document.getId());
             res.setDocumentName(document.getDocumentName());
             res.setDocumentType(document.getDocumentType());
             res.setStatus(document.getStatus());
            return res;
        }).toList();
        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "studentDocument",key = "#documentId")
    public DocumentResponse getStudentDocumentById(Long documentId) {
        StudentDocument document = studentDocumentRepository.findById(documentId).orElseThrow(()->
                new IllegalArgumentException("Document not found"));

        DocumentResponse response = new DocumentResponse();
        response.setId(document.getId());
        response.setDocumentName(document.getDocumentName());
        response.setDocumentType(document.getDocumentType());
        response.setStatus(document.getStatus());
        response.setFilePath(document.getFilePath());
        return response;
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "studentSubjects",key = "{#userId,#pageNumber,#pageSize}")
    public StudentSubjectResponse getStudentSubjects(Long userId, int pageNumber, int pageSize) {
        logger.info("Fetching StudentSubjects | userId = {}",userId);
        try {
            Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<StudentSubject> studentSubjects = studentSubjectRepository.findByStudentUserIdAndSectionSubjectSectionStatus(userId, SectionStatus.ACTIVE,pageable);

            StudentSubjectResponse response = new StudentSubjectResponse();

            Page<SubjectResponse> subjectResponses = studentSubjects.map(studentSubject -> {
               SubjectResponse res = modelMapper.map(studentSubject.getSectionSubject().getSubject(),SubjectResponse.class);

               res.setTotalPresent(studentSubject.getStudentAttendances()
                       .stream()
                       .filter(studentAttendance -> studentAttendance.getStatus()== AttendanceStatus.PRESENT)
                       .toList().size());
               res.setTotalAbsent(studentSubject.getStudentAttendances()
                       .stream()
                       .filter(studentAttendance -> studentAttendance.getStatus()== AttendanceStatus.ABSENT)
                       .toList().size());

               res.setStudentSubjectId(studentSubject.getId());
               return res;
            });
            response.setSubjectResponses(subjectResponses);
            response.setTotalPresent(getOverallAttendance(userId)[0]);
            response.setTotalAbsent(getOverallAttendance(userId)[1]);
            logger.info("Successfully fetched student subjects | userId = {} | returnedElement = {}",userId,response.getSubjectResponses().getNumberOfElements());
            return response;
        } catch (Exception e) {
            logger.error("Failed fetched Student subjects | userId = {}",userId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "StudentAttendances",key = "{#studentSubjectId,#pageNumber,#pageSize}")
    public Page<StudentAttendanceResponse> getStudentAttendanceByStudentSubjectId(Long studentSubjectId, int pageNumber, int pageSize) {
        logger.info("Fetching student attendances | studentSubjectId = {}",studentSubjectId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"date"));
            Page<StudentAttendance> studentAttendances = studentAttendanceRepository.findByStudentSubjectId(studentSubjectId,pageable);

            Page<StudentAttendanceResponse> responses = studentAttendances.map(attendance->{
               return modelMapper.map(attendance,StudentAttendanceResponse.class);
            });
            logger.info("Fetching student attendance | studentSubjectId = {} | returnedElements = {}",studentSubjectId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e){
          logger.error("Failed to fetched student attendances | studentSubjectId = {}",studentSubjectId,e);
          throw e;
        }
    }

}
