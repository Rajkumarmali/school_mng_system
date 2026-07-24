package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.fee.*;
import com.example.UniversityManagementSystem.dto.notification.NotificationRequest;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.Class;
import com.example.UniversityManagementSystem.entity.type.FeeStructureStatus;
import com.example.UniversityManagementSystem.entity.type.ScholarshipStatus;
import com.example.UniversityManagementSystem.entity.type.StudentFeeStatus;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.FeeServices;
import com.example.UniversityManagementSystem.services.NotificationService;
import com.razorpay.*;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeeServiceImp implements FeeServices {

    private final CollegeRepository collegeRepository;
    private final FeeTypeRepository feeTypeRepository;
    private final ClassRepository classRepository;
    private final DepartmentRepository departmentRepository;
    private final FeeStructureRepository feeStructureRepository;
    private final StudentFeeRepository studentFeeRepository;
    private final StudentRepository studentRepository;
    private final FeePaymentRepository feePaymentRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public FeeServiceImp(CollegeRepository collegeRepository,
                         FeeTypeRepository feeTypeRepository,
                         ClassRepository classRepository,
                         DepartmentRepository departmentRepository,
                         FeeStructureRepository feeStructureRepository,
                         StudentFeeRepository studentFeeRepository,
                         StudentRepository studentRepository,
                         FeePaymentRepository feePaymentRepository,
                         UserRepository userRepository, NotificationService notificationService) {
        this.collegeRepository = collegeRepository;
        this.feeTypeRepository = feeTypeRepository;
        this.classRepository = classRepository;
        this.departmentRepository = departmentRepository;
        this.feeStructureRepository = feeStructureRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.studentRepository = studentRepository;
        this.feePaymentRepository = feePaymentRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Value("${razorpay.api.key}")
    String apiKey;

    @Value("${razorpay.api.secret}")
    String apiSecret;

    @Caching(
            evict = {
                    @CacheEvict(cacheNames = "feeStructures",allEntries = true),
                    @CacheEvict(cacheNames = "feeOverviews",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructure",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructureAllStudents",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructurePaidStudents",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructureUnpaidStudents",allEntries = true),
                    @CacheEvict(cacheNames = "studentFees",allEntries = true),
            }
    )
    private void assignToAllClassStudent(String classCode,FeeStructure feeStructure){
        Class clas = classRepository.findByClassCode(classCode);
        if(clas==null){
            throw new IllegalArgumentException("Class not found");
        }
        feeStructure.setAClass(clas);

        List<Student> students = clas.getStudents();

        List<StudentFee> studentFees = new ArrayList<>();

        for(Student student:students){
            StudentFee studentFee = new StudentFee();

            Double amount = feeStructure.getAmount();
            if(feeStructure.getApplyScholarship()){
                double totalScholarship = student.getScholarships().stream()
                        .filter(sch->sch.getStatus()==ScholarshipStatus.ACTIVE)
                        .mapToDouble(Scholarship::getScholarshipPercent)
                        .sum();
                totalScholarship= Math.min(totalScholarship,100.0);
                amount = amount*(100.0-totalScholarship)/100.0;
                amount = Math.round(amount * 100.0) / 100.0;
            }

            NotificationRequest notificationRequest = new NotificationRequest();
            String message = "Dear "+student.getFirstName()+",\n\n"
                    +"A new fee has been assigned to your account.\n\n"
                    + "Fee Type : "+feeStructure.getFeeType().getName()+"\n"
                    +"Amount : "+String.format("%.2f", amount)+"\n"
                    +"Academic Year : "+feeStructure.getAcademicYear()+"\n"
                    +"Due Date : "+feeStructure.getDueDate().toLocalDate()
                    +"\n\nPlease pay the fee before the due date to avoid any late charges.";
            notificationRequest.setTitle("New Fee Assigned");
            notificationRequest.setMessage(message);
            notificationRequest.setUserEmail(student.getEmail());
            notificationService.createNotification(notificationRequest);

            studentFee.setStatus(StudentFeeStatus.PENDING);
            studentFee.setFeeStructure(feeStructure);
            studentFee.setStudent(student);
            studentFee.setAmount(amount);
            studentFee.setCreatedAt(LocalDateTime.now());
            studentFees.add(studentFee);
        }
        studentFeeRepository.saveAll(studentFees);
        feeStructureRepository.save(feeStructure);
    }

    @Transactional
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeTypes",allEntries = true)
    })
    public String createFeeType(Long collegeId, FeeTypeRequest dto) {
        College college = null;

        if (collegeId!=null) {
            college = collegeRepository.findById(collegeId).orElseThrow(() ->
                    new IllegalArgumentException("College not found"));
        }
        FeeType feeType = new FeeType();
        feeType.setName(dto.getName());
        feeType.setDescription(dto.getDescription());
        feeType.setCollege(college);
        feeType.setCreatedAt(LocalDateTime.now());
        feeTypeRepository.save(feeType);
        return "Create fee type successfully";
    }

    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Override
    @Cacheable(cacheNames = "feeTypes", key = "#collegeId != null ? #collegeId : 'UNIVERSITYFEETYPES'")
    public List<FeeTypeResponse> getAllFeeType(Long collegeId) {

        List<FeeType> feeTypes = feeTypeRepository.findByCollegeId(collegeId);

        List<FeeTypeResponse> responses = feeTypes.stream().map(fee->{
            FeeTypeResponse res = new FeeTypeResponse();
            res.setId(fee.getId());
            res.setName(fee.getName());
            res.setDescription(fee.getDescription());
            return res;
        }).toList();

        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Cacheable(cacheNames = "feeType",key = "#feeTypeId")
    public FeeTypeResponse getFeeTypeById(Long feeTypeId) {
        FeeType feeType = feeTypeRepository.findById(feeTypeId).orElseThrow(()->
                new IllegalArgumentException("Fee type not found"));
        FeeTypeResponse response = new FeeTypeResponse();
        response.setId(feeType.getId());
        response.setId(feeType.getId());
        response.setName(feeType.getName());
        response.setDescription(feeType.getDescription());
        return response;
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeTypes",allEntries = true),
            @CacheEvict(cacheNames = "feeType",key = "#feeTypeId")
    })
    public String updateFeeType(Long feeTypeId, FeeTypeRequest dto) {
        FeeType feeType = feeTypeRepository.findById(feeTypeId).orElseThrow(()->
                new IllegalArgumentException("Fee type not found"));
        feeType.setName(dto.getName());
        feeType.setDescription(dto.getDescription());
        feeType.setUpdatedAt(LocalDateTime.now());
        feeTypeRepository.save(feeType);
        return "Fee type update successfully";
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeTypes",allEntries = true),
            @CacheEvict(cacheNames = "feeType",key = "#feeTypeId")
    })
    public String deleteFeeType(Long feeTypeId) {
        FeeType feeType = feeTypeRepository.findById(feeTypeId).orElseThrow(()->
                new IllegalArgumentException("Fee type not found"));
        feeTypeRepository.delete(feeType);
        return "Fee Type delete successfully";
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(
            evict = {
                    @CacheEvict(cacheNames = "feeStructures",allEntries = true),
                    @CacheEvict(cacheNames = "feeOverviews",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructure",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructureAllStudents",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructurePaidStudents",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructureUnpaidStudents",allEntries = true),
                    @CacheEvict(cacheNames = "studentFees",allEntries = true),
            }
    )
    public String createFeeStructure(Long collegeId, FeeStructureRequest dto) {
        College college = null;
        if(collegeId!=null){
            college = collegeRepository.findById(collegeId).orElseThrow(()->
                    new IllegalArgumentException("College not found"));
        }

        Department department = departmentRepository.findByCode(dto.getDepartmentCode());
        FeeType feeType = feeTypeRepository.findById(dto.getFeeTypeId()).orElseThrow(()->
                new IllegalArgumentException("Fee Type not found"));

        FeeStructure feeStructure = new FeeStructure();

        feeStructure.setAmount(dto.getAmount());
        feeStructure.setAcademicYear(dto.getAcademicYear());
        feeStructure.setDescription(dto.getDescription());
        feeStructure.setCollege(college);
        feeStructure.setDepartment(department);
        feeStructure.setFeeType(feeType);
        feeStructure.setStatus(FeeStructureStatus.ACTIVE);
        feeStructure.setApplyScholarship(dto.getApplyScholarship());
        feeStructure.setDueDate(dto.getDueDate());
        feeStructure.setCreatedAt(LocalDateTime.now());
        FeeStructure savedFeeStructure= feeStructureRepository.save(feeStructure);

        if(dto.getFeeAssignmentType()==FeeAssignmentType.ALL_CLASS_STUDENTS){
            assignToAllClassStudent(dto.getClassCode(),savedFeeStructure);
        }

        return "Fee Structure create successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT')")
    @Caching(
            evict = {
                    @CacheEvict(cacheNames = "feeStructures",allEntries = true),
                    @CacheEvict(cacheNames = "feeOverviews",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructure",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructureAllStudents",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructurePaidStudents",allEntries = true),
                    @CacheEvict(cacheNames = "feeStructureUnpaidStudents",allEntries = true),
                    @CacheEvict(cacheNames = "studentFees",allEntries = true),
                    @CacheEvict(cacheNames = "studentunpaidfee",allEntries = true),
                    @CacheEvict(cacheNames = "studentFeeOverview",allEntries = true),
            }
    )
    public String assignFeeStructureToStudent(Long feeStructureId, List<FeeStudentRequest> dto) {
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));
        List<StudentFee> studentFees = new ArrayList<>();

        for(FeeStudentRequest s:dto){
            StudentFee fee= new StudentFee();
            Student student = studentRepository.findByRegistrationNumber(s.getRegistrationNumber());
            if(student==null){
               continue;
            }

            boolean isExits = studentFeeRepository.existsByStudentIdAndFeeStructureId(student.getId(),feeStructureId);
            if(isExits){
                continue;
            }
            double amount = feeStructure.getAmount();
            if(feeStructure.getApplyScholarship()){
               double totalScholarship = student.getScholarships().stream()
                       .filter(sch->sch.getStatus()==ScholarshipStatus.ACTIVE)
                       .mapToDouble(Scholarship::getScholarshipPercent)
                       .sum();
               totalScholarship = Math.min(totalScholarship,100.0);
               amount = amount*(100.0-totalScholarship)/100.0;
                amount = Math.round(amount * 100.0) / 100.0;
            }

            NotificationRequest notificationRequest = new NotificationRequest();
            String message = "Dear "+student.getFirstName()+",\n\n"
                    +"A new fee has been assigned to your account.\n\n"
                    + "Fee Type : "+feeStructure.getFeeType().getName()+"\n"
                    +"Amount : "+String.format("%.2f", amount)+"\n"
                    +"Academic Year : "+feeStructure.getAcademicYear()+"\n"
                    +"Due Date : "+feeStructure.getDueDate().toLocalDate()
                    +"\n\nPlease pay the fee before the due date to avoid any late charges.";

            notificationRequest.setTitle("New Fee Assigned");
            notificationRequest.setMessage(message);
            notificationRequest.setUserEmail(student.getEmail());
            notificationService.createNotification(notificationRequest);

            fee.setStudent(student);
            fee.setAmount(amount);
            fee.setStatus(StudentFeeStatus.PENDING);
            fee.setFeeStructure(feeStructure);
            fee.setCreatedAt(LocalDateTime.now());
            studentFees.add(fee);
        }
        studentFeeRepository.saveAll(studentFees);
        return "Fee structure assign to students";
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeStructures",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<FeeStructureResponse> getAllFeeStructure(Long collegeId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<FeeStructure> feeStructures = feeStructureRepository.findByCollegeId(collegeId,pageable);
        Page<FeeStructureResponse> responses = feeStructures.map(fee->{
           FeeStructureResponse res = new FeeStructureResponse();
           res.setId(fee.getId());
           res.setAmount(fee.getAmount());
           res.setDueDate(fee.getDueDate());
           res.setStatus(fee.getStatus());
           res.setAcademicYear(fee.getAcademicYear());
           res.setDescription(fee.getDescription());
           res.setApplyScholarship(fee.getApplyScholarship());
           if(fee.getFeeType()!=null)
               res.setFeeTypeName(fee.getFeeType().getName());
           if(fee.getAClass()!=null)
            res.setClassCode(fee.getAClass().getClassCode());
           if(fee.getDepartment()!=null)
            res.setDepartmentCode(fee.getDepartment().getCode());
           return res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeStructure",key = "#feeStructureId")
    public FeeStructureResponse getFeeStructureById(Long feeStructureId) {

        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));

        FeeStructureResponse response = new FeeStructureResponse();
        response.setId(feeStructure.getId());
        response.setAmount(feeStructure.getAmount());
        response.setDueDate(feeStructure.getDueDate());
        response.setStatus(feeStructure.getStatus());
        response.setAcademicYear(feeStructure.getAcademicYear());
        response.setDescription(feeStructure.getDescription());
        response.setApplyScholarship(feeStructure.getApplyScholarship());
        if(feeStructure.getFeeType()!=null)
            response.setFeeTypeName(feeStructure.getFeeType().getName());
        if(feeStructure.getAClass()!=null) {
            response.setClassCode(feeStructure.getAClass().getClassCode());
            response.setClassName(feeStructure.getAClass().getName());
        }
        if(feeStructure.getDepartment()!=null){
         response.setDepartmentCode(feeStructure.getDepartment().getCode());
         response.setDepartmentName(feeStructure.getDepartment().getName());
        }

        List<StudentFee> studentFees = feeStructure.getStudentFees();

        Integer totalStudent = studentFees.size();

        Integer totalPaidStudent =(int) studentFees.stream()
                .filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
                .count();

        Integer totalUnPaidStudent = (int) studentFees.stream()
                .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
                .count();

        Double totalCollectAmount = feeStructure.getStudentFees().stream()
                .mapToDouble(StudentFee::getAmount)
                .sum();

        Double totalCollectedAmount = feeStructure.getStudentFees().stream()
                .filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
                .mapToDouble(StudentFee::getAmount)
                .sum();
        Double totalPendingAmount = feeStructure.getStudentFees().stream()
                .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
                .mapToDouble(StudentFee::getAmount)
                .sum();

        response.setTotalCollectionAmount(totalCollectAmount);
        response.setTotalCollectedAmount(totalCollectedAmount);
        response.setTotalPendingAmount(totalPendingAmount);
        response.setTotalStudent(totalStudent);
        response.setTotalPaidStudent(totalPaidStudent);
        response.setTotalUnPaidStudent(totalUnPaidStudent);

        return response;
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeStructures",allEntries = true),
            @CacheEvict(cacheNames = "feeStructure",key = "#feeStructureId"),
            @CacheEvict(cacheNames = "feeOverviews",allEntries = true),
    })
    public String updateFeeStructure(Long feeStructureId, FeeStructureRequest dto) {
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));
        System.out.println(dto.getDueDate());
        feeStructure.setAmount(dto.getAmount());
        feeStructure.setDescription(dto.getDescription());
        feeStructure.setAcademicYear(dto.getAcademicYear());
        feeStructure.setStatus(dto.getFeeStructureStatus());
        feeStructure.setDueDate(dto.getDueDate());
        feeStructure.setUpdatedAt(LocalDateTime.now());

        feeStructureRepository.save(feeStructure);

        return "Fee Structure update successfully";
    }

    @Override
    @PreAuthorize("hasRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "feeStructures",allEntries = true),
            @CacheEvict(cacheNames = "feeStructure",key = "#feeStructureId")
    })
    public String deleteFeeStructure(Long feeStructureId) {
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));
        feeStructureRepository.delete(feeStructure);
        return "Fee Structure delete successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeStructureAllStudents",key = "{#feeStructureId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getFeeStructureAllStudent(Long feeStructureId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
            new IllegalArgumentException("Fee Structure not found"));

        Page<StudentFee> studentFees = studentFeeRepository.findByFeeStructure(feeStructure,pageable);
        Page<StudentFeeResponse> responses = studentFees.map(studentFee -> {

            Student student = studentFee.getStudent();
           StudentFeeResponse res = new StudentFeeResponse();

           StudentResponse studentResponse = new StudentResponse();
           studentResponse.setId(student.getId());
           studentResponse.setName(student.getFirstName()+" "+student.getLastName());
           studentResponse.setEmail(student.getEmail());
           studentResponse.setPhoneNumber(student.getPhoneNumber());
           studentResponse.setRegistrationNumber(student.getRegistrationNumber());

           res.setId(studentFee.getId());
           res.setAmount(studentFee.getAmount());
           res.setStatus(studentFee.getStatus());

           res.setStudentResponse(studentResponse);
           return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeStructurePaidStudents",key = "{#feeStructureId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getAllPaidStudent(Long feeStructureId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));

        Page<StudentFee> studentFees = studentFeeRepository
                .findByFeeStructureAndStatus(feeStructure,StudentFeeStatus.PAID,pageable);

        Page<StudentFeeResponse> responses = studentFees.map(studentFee -> {
            Student student = studentFee.getStudent();

            StudentFeeResponse res = new StudentFeeResponse();
            StudentResponse studentResponse = new StudentResponse();

            studentResponse.setId(student.getId());
            studentResponse.setName(student.getFirstName()+" "+student.getLastName());
            studentResponse.setEmail(student.getEmail());
            studentResponse.setPhoneNumber(student.getPhoneNumber());
            studentResponse.setRegistrationNumber(student.getRegistrationNumber());

            res.setId(studentFee.getId());
            res.setAmount(studentFee.getAmount());
            res.setStatus(studentFee.getStatus());
            res.setStatus(studentFee.getStatus());

            res.setStudentResponse(studentResponse);
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeStructureUnpaidStudents",key = "{#feeStructureId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getAllUnPaidStudent(Long feeStructureId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        FeeStructure feeStructure = feeStructureRepository.findById(feeStructureId).orElseThrow(()->
                new IllegalArgumentException("Fee Structure not found"));

        Page<StudentFee> studentFees = studentFeeRepository
                .findByFeeStructureAndStatus(feeStructure,StudentFeeStatus.PENDING,pageable);

        Page<StudentFeeResponse> responses = studentFees.map(studentFee -> {
            Student student = studentFee.getStudent();

            StudentFeeResponse res = new StudentFeeResponse();
            StudentResponse studentResponse = new StudentResponse();
            studentResponse.setId(student.getId());
            studentResponse.setName(student.getFirstName()+" "+student.getLastName());
            studentResponse.setEmail(student.getEmail());
            studentResponse.setPhoneNumber(student.getPhoneNumber());
            studentResponse.setRegistrationNumber(student.getRegistrationNumber());

            res.setId(studentFee.getId());
            res.setAmount(studentFee.getAmount());
            res.setStatus(studentFee.getStatus());
            res.setStatus(studentFee.getStatus());
            res.setStudentResponse(studentResponse);
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN','STUDENT')")
    @Cacheable(cacheNames = "studentsFee",key = "#studentFeeId")
    public StudentFeeResponse getStudentFeeById(Long studentFeeId) {
        StudentFee studentFee = studentFeeRepository.findById(studentFeeId).orElseThrow(()->
                new IllegalArgumentException("Not found"));

        Student student = studentFee.getStudent();

        StudentFeeResponse response = new StudentFeeResponse();
        StudentResponse studentResponse = new StudentResponse();
        studentResponse.setId(student.getId());
        studentResponse.setName(student.getFirstName()+" "+student.getLastName());
        studentResponse.setEmail(student.getEmail());
        studentResponse.setPhoneNumber(student.getPhoneNumber());
        studentResponse.setGender(student.getGender());
        studentResponse.setRegistrationNumber(student.getRegistrationNumber());

        response.setId(studentFee.getId());
        response.setFeeTypename(studentFee.getFeeStructure().getFeeType().getName());
        response.setAmount(studentFee.getAmount());
        response.setStatus(studentFee.getStatus());
        response.setAcademicYear(studentFee.getFeeStructure().getAcademicYear());
        if(studentFee.getFeeStructure().getAClass()!=null){
            response.setClassName(studentFee.getFeeStructure().getAClass().getName());
            response.setClassCode(studentFee.getFeeStructure().getAClass().getClassCode());
        }
       if(studentFee.getFeeStructure().getDepartment()!=null){
           response.setDepartmentName(studentFee.getFeeStructure().getDepartment().getName());
           response.setDepartmentCode(studentFee.getFeeStructure().getDepartment().getCode());
       }

        response.setStudentResponse(studentResponse);

        if(studentFee.getFeePayment()!=null){
            FeePayment feePayment = studentFee.getFeePayment();

            FeePaymentResponse res = new FeePaymentResponse();
            res.setId(feePayment.getId());
            res.setAmount(feePayment.getAmount());
            res.setPaymentMode(feePayment.getPaymentMode());
            res.setPaymentDataAndTime(feePayment.getPaymentDataAndTime());
            res.setTransactionId(feePayment.getTransactionId());
            res.setReceiptNumber(feePayment.getReceiptNumber());

            response.setFeePaymentResponse(res);
        }
        return response;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "studentsFees",key = "{#studentId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getStudentFeeByStudentId(Long studentId,int pageNumber,int pageSize) {

        Pageable pageable= PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<StudentFee> studentFees = studentFeeRepository.findByStudentId(studentId,pageable);
        Page<StudentFeeResponse> responses = studentFees.map(stufee->{

            StudentFeeResponse res = new StudentFeeResponse();
            FeePaymentResponse feePaymentResponse = new FeePaymentResponse();

            res.setId(stufee.getId());
            res.setFeeTypename(stufee.getFeeStructure().getFeeType().getName());
            res.setAmount(stufee.getAmount());
            res.setAcademicYear(stufee.getFeeStructure().getAcademicYear());
            if(stufee.getFeeStructure().getAClass()!=null)
             res.setClassCode(stufee.getFeeStructure().getAClass().getClassCode());
            res.setStatus(stufee.getStatus());
            res.setDueDate(stufee.getFeeStructure().getDueDate());

            if(stufee.getFeePayment()!=null) {
                feePaymentResponse.setPaymentDataAndTime(stufee.getFeePayment().getPaymentDataAndTime());
                feePaymentResponse.setPaymentMode(stufee.getFeePayment().getPaymentMode());
                feePaymentResponse.setReceiptNumber(stufee.getFeePayment().getReceiptNumber());
            }
            res.setFeePaymentResponse(feePaymentResponse);
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "studentFees",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<StudentResponse> getStudents(Long collegeId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Student> students = studentRepository.findByCollegeId(collegeId,pageable);

        Page<StudentResponse> responses = students.map(stu->{
           StudentResponse res = new StudentResponse();
           List<StudentFee> studentFees = stu.getStudentFees();

           Double totalFee=studentFees.stream()
                                   .mapToDouble(StudentFee::getAmount)
                                           .sum();

           Double totalPaidFee = studentFees.stream()
                   .filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
                                   .mapToDouble(StudentFee::getAmount)
                                           .sum();

           double totalPendingFee = studentFees.stream()
                           .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
                                           .mapToDouble(StudentFee::getAmount)
                                                   .sum();

           res.setId(stu.getId());
           res.setName(stu.getFirstName()+" "+stu.getLastName());
           res.setRegistrationNumber(stu.getRegistrationNumber());
           res.setEmail(stu.getEmail());
           res.setPhoneNumber(stu.getPhoneNumber());
           res.setTotalFee(totalFee);
           res.setTotalPaidFee(totalPaidFee);
           res.setTotalPendingFee(totalPendingFee);

           return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "studentFee",key = "#studentId")
    public StudentResponse getStudentById(Long studentId) {

        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));

        Double totalFee = student.getStudentFees()
                .stream()
                .mapToDouble(StudentFee::getAmount)
                .sum();

        Double totalPaidFee = student.getStudentFees().stream()
                .filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
                .mapToDouble(StudentFee::getAmount)
                .sum();

        Double totalPendingFee = student.getStudentFees().stream()
                .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
                .mapToDouble(StudentFee::getAmount)
                .sum();

        Double totalScholarship = student.getScholarships().stream()
                .filter(sch->sch.getStatus()== ScholarshipStatus.ACTIVE)
                .mapToDouble(Scholarship::getScholarshipPercent)
                .sum();

        StudentResponse response = new StudentResponse();
        response.setRegistrationNumber(student.getRegistrationNumber());
        response.setName(student.getFirstName()+" "+student.getLastName());
        response.setPhoneNumber(student.getPhoneNumber());
        response.setEmail(student.getEmail());
        response.setGender(student.getGender());
        response.setDepartmentCode(student.getDepartment().getCode());
        response.setDepartmentName(student.getDepartment().getName());

        response.setFatherName(student.getParent().getFatherName());
        response.setFatherNumber(student.getParent().getFatherNumber());
        response.setMotherName(student.getParent().getMotherName());
        response.setMotherNumber(student.getParent().getMotherNumber());

        response.setTotalFee(totalFee);
        response.setTotalPaidFee(totalPaidFee);
        response.setTotalPendingFee(totalPendingFee);
        response.setTotalScholarship(totalScholarship);

        return response;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "payments",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getPayments(Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<FeePayment> feePayments = feePaymentRepository.findByStudentFeeFeeStructureCollegeId(collegeId,pageable);

        Page<StudentFeeResponse> responses = feePayments.map(payment->{

            Student student = payment.getStudentFee().getStudent();

            StudentFeeResponse res = new StudentFeeResponse();
            FeePaymentResponse feePaymentResponse = new FeePaymentResponse();
            StudentResponse studentResponse = new StudentResponse();

            feePaymentResponse.setId(payment.getId());
            feePaymentResponse.setAmount(payment.getAmount());
            feePaymentResponse.setPaymentDataAndTime(payment.getPaymentDataAndTime());
            feePaymentResponse.setPaymentMode(payment.getPaymentMode());
            feePaymentResponse.setReceiptNumber(payment.getReceiptNumber());
            feePaymentResponse.setTransactionId(payment.getTransactionId());

            studentResponse.setId(student.getId());
            studentResponse.setName(student.getFirstName()+" "+student.getLastName());
            studentResponse.setRegistrationNumber(student.getRegistrationNumber());

            res.setFeePaymentResponse(feePaymentResponse);
            res.setStudentResponse(studentResponse);
            res.setFeeTypename(payment.getStudentFee().getFeeStructure().getFeeType().getName());
            res.setAcademicYear(payment.getStudentFee().getFeeStructure().getAcademicYear());

            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "payment",key = "#paymentId")
    public StudentFeeResponse getPaymentById(Long paymentId) {
        FeePayment feePayment = feePaymentRepository.findById(paymentId).orElseThrow(()->
                new IllegalArgumentException("Fee payment not found"));

        StudentFeeResponse response = new StudentFeeResponse();
        StudentResponse studentResponse = new StudentResponse();
        FeePaymentResponse feePaymentResponse = new FeePaymentResponse();

        feePaymentResponse.setId(feePayment.getId());
        feePaymentResponse.setAmount(feePayment.getAmount());
        feePaymentResponse.setPaymentMode(feePayment.getPaymentMode());
        feePaymentResponse.setTransactionId(feePayment.getTransactionId());
        feePaymentResponse.setReceiptNumber(feePayment.getReceiptNumber());
        feePaymentResponse.setPaymentDataAndTime(feePayment.getPaymentDataAndTime());

        Student student = feePayment.getStudentFee().getStudent();
        studentResponse.setId(student.getId());
        studentResponse.setName(student.getFirstName()+" "+student.getLastName());
        studentResponse.setEmail(student.getEmail());
        studentResponse.setPhoneNumber(student.getPhoneNumber());
        studentResponse.setRegistrationNumber(student.getRegistrationNumber());
        studentResponse.setGender(student.getGender());
        studentResponse.setFatherName(student.getParent().getFatherName());
        studentResponse.setFatherNumber(student.getParent().getFatherNumber());
        studentResponse.setMotherNumber(student.getParent().getMotherNumber());
        studentResponse.setMotherName(student.getParent().getMotherName());

        response.setId(feePayment.getStudentFee().getId());
        response.setFeeTypename(feePayment.getStudentFee().getFeeStructure().getFeeType().getName());
        response.setAcademicYear(feePayment.getStudentFee().getFeeStructure().getAcademicYear());
        if(feePayment.getStudentFee().getFeeStructure().getAClass()!=null){
            response.setClassCode(feePayment.getStudentFee().getFeeStructure().getAClass().getClassCode());
            response.setClassName(feePayment.getStudentFee().getFeeStructure().getAClass().getName());
        }
        if(feePayment.getStudentFee().getFeeStructure().getDepartment()!=null){
            response.setDepartmentCode(feePayment.getStudentFee().getFeeStructure().getDepartment().getCode());
            response.setDepartmentName(feePayment.getStudentFee().getFeeStructure().getDepartment().getName());
        }
        response.setDueDate(feePayment.getStudentFee().getFeeStructure().getDueDate());
        response.setStudentResponse(studentResponse);
        response.setFeePaymentResponse(feePaymentResponse);

        return response;
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('ACCOUNTANT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "payments",allEntries = true),
            @CacheEvict(cacheNames = "studentFee",key = "#studentFeeId"),
            @CacheEvict(cacheNames = "studentFees",allEntries = true),
            @CacheEvict(cacheNames = "studentsFees",allEntries = true),
            @CacheEvict(cacheNames = "studentsFee",allEntries = true),
            @CacheEvict(cacheNames = "feeStructure",allEntries = true),
            @CacheEvict(cacheNames = "feeStructureAllStudents",allEntries = true),
            @CacheEvict(cacheNames = "feeStructurePaidStudents",allEntries = true),
            @CacheEvict(cacheNames = "feeStructureUnpaidStudents",allEntries = true),
            @CacheEvict(cacheNames = "studentpaidfee",allEntries = true),
            @CacheEvict(cacheNames = "studentunpaidfee",allEntries = true),
            @CacheEvict(cacheNames = "studentFeeOverview",allEntries = true),
            @CacheEvict(cacheNames = "feeOverviews",allEntries = true),
            @CacheEvict(cacheNames = "studentFee",allEntries = true),
    })
    public String payFeeByCash(Long studentFeeId) {

        StudentFee studentFee = studentFeeRepository.findById(studentFeeId).orElseThrow(()->
                new RuntimeException("Student fee not found"));

        if(studentFee.getStatus()==StudentFeeStatus.PAID){
            return "Already paid this fee";
        }

        String date = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String receiptNo = "REC-"+date+"-"+studentFeeId;

        FeePayment feePayment = new FeePayment();
        feePayment.setAmount(studentFee.getAmount());
        feePayment.setPaymentMode("CASH");
        feePayment.setReceiptNumber(receiptNo);
        feePayment.setPaymentDataAndTime(LocalDateTime.now());
        feePayment.setCreatedAt(LocalDateTime.now());
        FeePayment savedFeePayment = feePaymentRepository.save(feePayment);

        studentFee.setStatus(StudentFeeStatus.PAID);
        studentFee.setFeePayment(savedFeePayment);
        studentFee.setUpdatedAt(LocalDateTime.now());
        studentFeeRepository.save(studentFee);

        return "Fee pay successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeOverviews",key = "#userId")
    public FeeOverviewResponse getFeeOverview(Long userId) {

       User user = userRepository.findById(userId).orElseThrow(()->
               new IllegalArgumentException("User not found"));
       College college = user.getCollege();

       List<StudentFee> studentFee = studentFeeRepository.findByFeeStructureCollege(college);

       Double totalFee = studentFee.stream()
               .mapToDouble(StudentFee::getAmount)
               .sum();

       Double totalPaidFee = studentFee.stream()
               .filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
               .mapToDouble(StudentFee::getAmount)
               .sum();

       Double totalPendingFee = studentFee.stream()
               .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
               .mapToDouble(StudentFee::getAmount)
               .sum();

       FeeOverviewResponse response = new FeeOverviewResponse();
       response.setTotalFee(totalFee);
       response.setTotalPaidFee(totalPaidFee);
       response.setTotalPendingFee(totalPendingFee);

        return response;
    }

    @Override
    public ByteArrayInputStream generateReceipt(Long studentFeeId) {

        StudentFee studentFee = studentFeeRepository.findById(studentFeeId)
                .orElseThrow(() -> new IllegalArgumentException("Student Fee not found"));

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        Document document = new Document(PageSize.A4, 40, 40, 40, 40);

        PdfWriter.getInstance(document, out);
        document.open();

        Font headingFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, Color.WHITE);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 11);
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11);

        Paragraph title = new Paragraph("FEE RECEIPT");
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph(" "));

        PdfPTable receiptTable = new PdfPTable(2);
        receiptTable.setWidthPercentage(100);
        receiptTable.setSpacingAfter(20);

        receiptTable.setWidths(new float[]{3,5});

        addRow(receiptTable,"Receipt Number",
                studentFee.getFeePayment().getReceiptNumber());

        addRow(receiptTable,"Transaction ID",
                studentFee.getFeePayment().getTransactionId());

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

        addRow(receiptTable,"Payment Date And Time",
                studentFee.getFeePayment()
                        .getPaymentDataAndTime()
                        .format(formatter));

        if (studentFee.getFeePayment() != null &&
                studentFee.getFeePayment().getPaymentMode() != null) {
            addRow(receiptTable,"Payment Mode",
                    studentFee.getFeePayment().getPaymentMode());
        }

        document.add(receiptTable);

        PdfPCell header = new PdfPCell(new Phrase("STUDENT INFORMATION", headingFont));
        header.setColspan(2);
        header.setBackgroundColor(Color.GRAY);
        header.setHorizontalAlignment(Element.ALIGN_CENTER);
        header.setPadding(8);

        PdfPTable studentTable = new PdfPTable(2);
        studentTable.setWidthPercentage(100);
        studentTable.setSpacingAfter(20);

        studentTable.addCell(header);

        addRow(studentTable,"Student Name",
                studentFee.getStudent().getFirstName()+" "+
                        studentFee.getStudent().getLastName());

        addRow(studentTable,"Registration Number",
                studentFee.getStudent().getRegistrationNumber());

        addRow(studentTable,"Email",
                studentFee.getStudent().getEmail());

        addRow(studentTable,"Phone",
                studentFee.getStudent().getPhoneNumber());

        addRow(studentTable,"Father Name",
                studentFee.getStudent().getParent().getFatherName());

        document.add(studentTable);


        PdfPCell feeHeader = new PdfPCell(new Phrase("FEE DETAILS", headingFont));
        feeHeader.setColspan(2);
        feeHeader.setBackgroundColor(Color.GRAY);
        feeHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
        feeHeader.setPadding(8);

        PdfPTable feeTable = new PdfPTable(2);
        feeTable.setWidthPercentage(100);
        feeTable.setSpacingAfter(20);

        feeTable.addCell(feeHeader);

        addRow(feeTable,"Fee Type",
                studentFee.getFeeStructure().getFeeType().getName());

        addRow(feeTable,"Academic Year",
                studentFee.getFeeStructure().getAcademicYear());

        addRow(feeTable,"Amount",
                "₹ " + studentFee.getAmount());

        addRow(feeTable,"Status",
                studentFee.getStatus().name());

        document.add(feeTable);

        document.add(new Paragraph(" "));


        PdfPTable signTable = new PdfPTable(2);
        signTable.setWidthPercentage(100);

        PdfPCell left = new PdfPCell(new Phrase(
                "Generated On : " + LocalDate.now(),
                normalFont));

        left.setBorder(Rectangle.NO_BORDER);

        PdfPCell right = new PdfPCell(new Phrase(
                "Authorized Signature",
                boldFont));

        right.setHorizontalAlignment(Element.ALIGN_RIGHT);
        right.setBorder(Rectangle.NO_BORDER);

        signTable.addCell(left);
        signTable.addCell(right);

        document.add(signTable);

        document.add(new Paragraph(" "));

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }

    private void addRow(PdfPTable table, String key, String value) {

        PdfPCell keyCell = new PdfPCell(new Phrase(
                key,
                FontFactory.getFont(FontFactory.HELVETICA_BOLD,11)));

        keyCell.setBackgroundColor(new Color(240,240,240));
        keyCell.setPadding(8);

        PdfPCell valueCell = new PdfPCell(new Phrase(
                value,
                FontFactory.getFont(FontFactory.HELVETICA,11)));

        valueCell.setPadding(8);

        table.addCell(keyCell);
        table.addCell(valueCell);
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "studentpaidfee",key = "{#userId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getPaidStudentFeeByStudent(Long userId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC, "createdAt"));

        Student student = studentRepository.findByUserId(userId);

        Page<StudentFee> studentFees = studentFeeRepository.findByStudentAndStatus(student,StudentFeeStatus.PAID,pageable);

        Page<StudentFeeResponse> responses = studentFees.map(stufee->{

            FeePayment feePayment = stufee.getFeePayment();

            StudentFeeResponse res = new StudentFeeResponse();
            FeePaymentResponse feePaymentResponse = new FeePaymentResponse();

            feePaymentResponse.setPaymentDataAndTime(feePayment.getPaymentDataAndTime());
            feePaymentResponse.setTransactionId(feePayment.getTransactionId());
            feePaymentResponse.setReceiptNumber(feePayment.getReceiptNumber());
            feePaymentResponse.setPaymentMode(feePayment.getPaymentMode());

            res.setId(stufee.getId());
            res.setFeeTypename(stufee.getFeeStructure().getFeeType().getName());
            res.setAmount(stufee.getAmount());
            res.setStatus(stufee.getStatus());
            res.setAcademicYear(stufee.getFeeStructure().getAcademicYear());
            res.setDueDate(stufee.getFeeStructure().getDueDate());
            if(stufee.getFeeStructure().getAClass()!=null) {
                res.setClassName(stufee.getFeeStructure().getAClass().getName());
                res.setClassCode(stufee.getFeeStructure().getAClass().getClassCode());
            }
            res.setFeePaymentResponse(feePaymentResponse);

            return res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "studentunpaidfee",key = "{#userId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getUnpaidStudentFeeByStudent(Long userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Student student = studentRepository.findByUserId(userId);

        Page<StudentFee> studentFees = studentFeeRepository.findByStudentAndStatus(student,StudentFeeStatus.PENDING,pageable);

        Page<StudentFeeResponse> responses = studentFees.map(stufee->{

            StudentFeeResponse res = new StudentFeeResponse();

            res.setId(stufee.getId());
            res.setFeeTypename(stufee.getFeeStructure().getFeeType().getName());
            res.setAmount(stufee.getAmount());
            res.setStatus(stufee.getStatus());
            res.setAcademicYear(stufee.getFeeStructure().getAcademicYear());
            res.setDueDate(stufee.getFeeStructure().getDueDate());
            if(stufee.getFeeStructure().getAClass()!=null) {
                res.setClassName(stufee.getFeeStructure().getAClass().getName());
                res.setClassCode(stufee.getFeeStructure().getAClass().getClassCode());
            }
            return res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "studentFeeOverview",key = "#userId")
    public StudentResponse getFeeOverviewForStudent(Long userId) {

        Student student = studentRepository.findByUserId(userId);
        List<StudentFee> studentFee = student.getStudentFees();

        Double totalFee = studentFee.stream()
                .mapToDouble(StudentFee::getAmount)
                .sum();

       Double totalPaidFee = studentFee.stream()
               .filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
               .mapToDouble(StudentFee::getAmount)
               .sum();

       Double totalPendingFee = studentFee.stream()
               .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
               .mapToDouble(StudentFee::getAmount)
               .sum();

        StudentResponse response = new StudentResponse();
        response.setTotalFee(totalFee);
        response.setTotalPaidFee(totalPaidFee);
        response.setTotalPendingFee(totalPendingFee);

        return response;
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('STUDENT')")
    public OrderResponse payFeeByRazorPay(Long studentFeeId) throws RazorpayException {
        try{

            StudentFee studentFee = studentFeeRepository.findById(studentFeeId).orElseThrow(()->
                    new IllegalArgumentException("Student fee not found"));

            RazorpayClient razorpayClient = new RazorpayClient(apiKey,apiSecret);
            JSONObject orderRequest = new JSONObject();

            orderRequest.put("amount",studentFee.getAmount()*100);
            orderRequest.put("currency","INR");

            String date = LocalDate.now()
                    .format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            String receiptNo = "REC-"+date+"-"+studentFeeId;

            orderRequest.put("receipt", receiptNo);
            orderRequest.put("payment_capture", 1);

            Order order = razorpayClient.orders.create(orderRequest);

            OrderResponse response = new OrderResponse();
            response.setOrderId(order.get("id"));
            response.setAmount(order.get("amount"));
            response.setCurrency(order.get("currency"));
            response.setStudentFeeId(studentFeeId);


            return response;
        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "payments",allEntries = true),
            @CacheEvict(cacheNames = "studentFee",key = "#dto.studentFeeId"),
            @CacheEvict(cacheNames = "studentFees",allEntries = true),
            @CacheEvict(cacheNames = "studentsFees",allEntries = true),
            @CacheEvict(cacheNames = "studentsFee",allEntries = true),
            @CacheEvict(cacheNames = "feeStructure",allEntries = true),
            @CacheEvict(cacheNames = "feeStructureAllStudents",allEntries = true),
            @CacheEvict(cacheNames = "feeStructurePaidStudents",allEntries = true),
            @CacheEvict(cacheNames = "feeStructureUnpaidStudents",allEntries = true),
            @CacheEvict(cacheNames = "studentpaidfee",allEntries = true),
            @CacheEvict(cacheNames = "studentunpaidfee",allEntries = true),
            @CacheEvict(cacheNames = "studentFeeOverview",allEntries = true),
            @CacheEvict(cacheNames = "feeOverviews",allEntries = true),
            @CacheEvict(cacheNames = "studentFee",allEntries = true),
    })
    public String verifyPayment(PaymentVerifyRequest dto) {
        try{
            StudentFee studentFee = studentFeeRepository.findById(dto.getStudentFeeId()).orElseThrow(()->
                    new IllegalArgumentException("No fee found"));

            if(studentFee.getFeePayment()!=null){
                return "";
            }

            JSONObject attributes = new JSONObject();
            attributes.put("razorpay_order_id", dto.getOrderId());
            attributes.put("razorpay_payment_id", dto.getPaymentId());
            attributes.put("razorpay_signature", dto.getSignature());

            boolean verify = Utils.verifyPaymentSignature(attributes,apiSecret);
            if(!verify){
                throw  new RuntimeException("Invalid Payment signature");
            }

            FeePayment feePayment = new FeePayment();

            RazorpayClient razorpayClient = new RazorpayClient(apiKey,apiSecret);
            Payment payment =  razorpayClient.payments.fetch(dto.getPaymentId());
            if(payment.get("status").equals("captured")){
                String date = LocalDate.now()
                        .format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                String receiptNo = "REC-"+date+"-"+dto.getStudentFeeId();

                JSONObject acquirerData =
                        payment.get("acquirer_data");
                String bankTransactionId = null;
                if(acquirerData.has("bank_transaction_id")){
                    bankTransactionId = acquirerData.getString("bank_transaction_id");
                }

                feePayment.setAmount(studentFee.getAmount());
                feePayment.setPaymentMode(payment.get("method").toString().toUpperCase());
                feePayment.setReceiptNumber(receiptNo);
                feePayment.setTransactionId(bankTransactionId);
                feePayment.setPaymentDataAndTime(LocalDateTime.now());
                feePayment.setCreatedAt(LocalDateTime.now());
                FeePayment savedFeePayment = feePaymentRepository.save(feePayment);

                studentFee.setStatus(StudentFeeStatus.PAID);
                studentFee.setFeePayment(savedFeePayment);
                studentFee.setUpdatedAt(LocalDateTime.now());
                studentFeeRepository.save(studentFee);
            }
            return "Payment successfully";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
