package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.fee.*;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.Class;
import com.example.UniversityManagementSystem.entity.type.FeeStructureStatus;
import com.example.UniversityManagementSystem.entity.type.PaymentMode;
import com.example.UniversityManagementSystem.entity.type.StudentFeeStatus;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.FeeServices;
import jakarta.transaction.Transactional;
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

    public FeeServiceImp(CollegeRepository collegeRepository,
                         FeeTypeRepository feeTypeRepository,
                         ClassRepository classRepository,
                         DepartmentRepository departmentRepository,
                         FeeStructureRepository feeStructureRepository,
                         StudentFeeRepository studentFeeRepository,
                         StudentRepository studentRepository,
                         FeePaymentRepository feePaymentRepository) {
        this.collegeRepository = collegeRepository;
        this.feeTypeRepository = feeTypeRepository;
        this.classRepository = classRepository;
        this.departmentRepository = departmentRepository;
        this.feeStructureRepository = feeStructureRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.studentRepository = studentRepository;
        this.feePaymentRepository = feePaymentRepository;
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
                    @CacheEvict(cacheNames = "feeStructures",allEntries = true)
            }
    )
    public String createFeeStructure(Long collegeId, FeeStructureRequest dto) {
        College college = null;
        if(collegeId!=null){
            college = collegeRepository.findById(collegeId).orElseThrow(()->
                    new IllegalArgumentException("College not found"));
        }

        Class clas = classRepository.findByClassCode(dto.getClassCode());
        if(clas==null){
            throw new IllegalArgumentException("Class not found");
        }

        Department department = departmentRepository.findByCode(dto.getDepartmentCode());
        FeeType feeType = feeTypeRepository.findById(dto.getFeeTypeId()).orElseThrow(()->
                new IllegalArgumentException("Fee Type not found"));

        FeeStructure feeStructure = new FeeStructure();

        feeStructure.setAmount(dto.getAmount());
        feeStructure.setAcademicYear(dto.getAcademicYear());
        feeStructure.setDescription(dto.getDescription());
        feeStructure.setCollege(college);
        feeStructure.setAClass(clas);
        feeStructure.setDepartment(department);
        feeStructure.setFeeType(feeType);
        feeStructure.setStatus(FeeStructureStatus.ACTIVE);
        feeStructure.setDueDate(dto.getDueDate());
        feeStructure.setCreatedAt(LocalDateTime.now());

        FeeStructure savedFeeStructure= feeStructureRepository.save(feeStructure);
        List<Student> students = clas.getStudents();

        List<StudentFee> studentFees = new ArrayList<>();

        for(Student student:students){
            StudentFee studentFee = new StudentFee();
            studentFee.setStatus(StudentFeeStatus.PENDING);
            studentFee.setFeeStructure(savedFeeStructure);
            studentFee.setStudent(student);
            studentFee.setCreatedAt(LocalDateTime.now());
            studentFees.add(studentFee);
        }

        studentFeeRepository.saveAll(studentFees);

        return "Fee Structure create successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "feeStructures",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<FeeStructureResponse> getAllFeeStructure(Long collegeId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<FeeStructure> feeStructures = feeStructureRepository.findByCollegeId(collegeId,pageable);
        Page<FeeStructureResponse> responses = feeStructures.map(fee->{
           FeeStructureResponse res = new FeeStructureResponse();
           res.setId(fee.getId());
           res.setAmount(fee.getAmount());
           res.setDueDate(fee.getDueDate());
           res.setStatus(fee.getStatus());
           res.setAcademicYear(fee.getAcademicYear());
           res.setDescription(fee.getDescription());
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
        Double totalCollectAmount = totalStudent*feeStructure.getAmount();
        Double totalCollectedAmount = totalPaidStudent*feeStructure.getAmount();
        Double totalPendingAmount = totalUnPaidStudent*feeStructure.getAmount();

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
            @CacheEvict(cacheNames = "feeStructure",key = "#feeStructureId")
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
           res.setAmount(feeStructure.getAmount());
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
            res.setAmount(feeStructure.getAmount());
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
            res.setAmount(feeStructure.getAmount());
            res.setStatus(studentFee.getStatus());
            res.setStatus(studentFee.getStatus());
            res.setStudentResponse(studentResponse);
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
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
        response.setAmount(studentFee.getFeeStructure().getAmount());
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
    public Page<StudentFeeResponse> getStudentFeeByStudentI(Long studentId,int pageNumber,int pageSize) {
        Pageable pageable= PageRequest.of(pageNumber,pageSize);
        Page<StudentFee> studentFees = studentFeeRepository.findByStudentId(studentId,pageable);
        Page<StudentFeeResponse> responses = studentFees.map(stufee->{

            StudentFeeResponse res = new StudentFeeResponse();
            FeePaymentResponse feePaymentResponse = new FeePaymentResponse();

            res.setId(stufee.getId());
            res.setFeeTypename(stufee.getFeeStructure().getFeeType().getName());
            res.setAmount(stufee.getFeeStructure().getAmount());
            res.setAcademicYear(stufee.getFeeStructure().getAcademicYear());
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
                           .map(StudentFee::getFeeStructure)
                                   .mapToDouble(FeeStructure::getAmount)
                                           .sum();

           Double totalPaidFee = studentFees.stream().
                   filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
                           .map(StudentFee::getFeeStructure)
                                   .mapToDouble(FeeStructure::getAmount)
                                           .sum();

           double totalPendingFee = studentFees.stream()
                           .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
                                   .map(StudentFee::getFeeStructure)
                                           .mapToDouble(FeeStructure::getAmount)
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
                .map(StudentFee::getFeeStructure)
                .mapToDouble(FeeStructure::getAmount)
                .sum();

        Double totalPaidFee = student.getStudentFees().stream()
                .filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
                .map(StudentFee::getFeeStructure)
                .mapToDouble(FeeStructure::getAmount)
                .sum();

        Double totalPendingFee = student.getStudentFees().stream()
                .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
                .map(StudentFee::getFeeStructure)
                .mapToDouble(FeeStructure::getAmount)
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

        return response;
    }

    @Override
    @PreAuthorize("hasAnyRole('ACCOUNTANT','ADMIN')")
    @Cacheable(cacheNames = "payments",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getPayments(Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
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
        feePayment.setAmount(studentFee.getFeeStructure().getAmount());
        feePayment.setPaymentMode(PaymentMode.CASH);
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
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "studentpaidfee",key = "{#userId,#pageNumber,#pageSize}")
    public Page<StudentFeeResponse> getPaidStudentFeeByStudent(Long userId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);

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
            res.setAmount(stufee.getFeeStructure().getAmount());
            res.setStatus(stufee.getStatus());
            res.setAcademicYear(stufee.getFeeStructure().getAcademicYear());
            res.setDueDate(stufee.getFeeStructure().getDueDate());
            res.setClassName(stufee.getFeeStructure().getAClass().getName());
            res.setClassCode(stufee.getFeeStructure().getAClass().getClassCode());

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
            res.setAmount(stufee.getFeeStructure().getAmount());
            res.setStatus(stufee.getStatus());
            res.setAcademicYear(stufee.getFeeStructure().getAcademicYear());
            res.setDueDate(stufee.getFeeStructure().getDueDate());
            res.setClassName(stufee.getFeeStructure().getAClass().getName());
            res.setClassCode(stufee.getFeeStructure().getAClass().getClassCode());

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
                .map(StudentFee::getFeeStructure)
                .mapToDouble(FeeStructure::getAmount)
                .sum();

       Double totalPaidFee = studentFee.stream()
               .filter(sf->sf.getStatus()==StudentFeeStatus.PAID)
               .map(StudentFee::getFeeStructure)
               .mapToDouble(FeeStructure::getAmount)
               .sum();

       Double totalPendingFee = studentFee.stream()
               .filter(sf->sf.getStatus()==StudentFeeStatus.PENDING)
               .map(StudentFee::getFeeStructure)
               .mapToDouble(FeeStructure::getAmount)
               .sum();

        StudentResponse response = new StudentResponse();
        response.setTotalFee(totalFee);
        response.setTotalPaidFee(totalPaidFee);
        response.setTotalPendingFee(totalPendingFee);

        return response;
    }


}
