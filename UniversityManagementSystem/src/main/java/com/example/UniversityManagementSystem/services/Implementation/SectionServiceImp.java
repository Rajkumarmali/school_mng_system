package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.section.*;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.type.AttendanceStatus;
import com.example.UniversityManagementSystem.entity.type.SectionStatus;
import com.example.UniversityManagementSystem.entity.type.StudentExamStatus;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.SectionService;
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
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SectionServiceImp implements SectionService {

    private final SectionRepository sectionRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;
    private final SectionSubjectRepository sectionSubjectRepository;
    private final StudentSubjectRepository studentSubjectRepository;

    private final Logger logger = LoggerFactory.getLogger(SectionServiceImp.class);
    private final ModelMapper modelMapper = new ModelMapper();
    private final ExamRepository examRepository;
    private final StudentExamRepository studentExamRepository;

    public SectionServiceImp(SectionRepository sectionRepository, TeacherRepository teacherRepository,
                             StudentRepository studentRepository,
                             SubjectRepository subjectRepository,
                             SectionSubjectRepository sectionSubjectRepository,
                             StudentSubjectRepository studentSubjectRepository,
                             ExamRepository examRepository,
                             StudentExamRepository studentExamRepository) {
        this.sectionRepository = sectionRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.sectionSubjectRepository = sectionSubjectRepository;
        this.studentSubjectRepository = studentSubjectRepository;
        this.examRepository = examRepository;
        this.studentExamRepository = studentExamRepository;
    }

    private void addSectionStudentInSectionSubject(SectionSubject savedSectionSubject, Section section) {

           List<Student> students = section.getStudents();
           List<StudentSubject> studentSubjects = new ArrayList<>();

           for(Student student:students){
               StudentSubject studentSubject = new StudentSubject();
               studentSubject.setStudent(student);
               studentSubject.setSectionSubject(savedSectionSubject);
               studentSubject.setCreatedAt(LocalDateTime.now());

               studentSubjects.add(studentSubject);
           }
           studentSubjectRepository.saveAll(studentSubjects);
    }

    private double getOverallAttendancePercent(Long sectionId, Long studentId) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findByStudentIdAndSectionSubjectSectionId(studentId,sectionId);
        int totalPresent = 0;
        int totalAbsent = 0;
        for(StudentSubject subject:studentSubjects){
            for(StudentAttendance attendance:subject.getStudentAttendances()){
                if(attendance.getStatus()==AttendanceStatus.PRESENT)
                    totalPresent++;
                else if(attendance.getStatus()==AttendanceStatus.ABSENT)
                    totalAbsent++;
            }
        }
        int totalAttendance = totalPresent+totalAbsent;
        return totalAttendance==0 ? 0 : (((double) totalPresent /totalAttendance)*100);
    }

    private int[] getOverallAttendance(Long sectionId,Long studentId){
        List<StudentSubject> studentSubjects = studentSubjectRepository.findByStudentIdAndSectionSubjectSectionId(studentId,sectionId);
        int totalPresent = 0;
        int totalAbsent=0;
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

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "sections",allEntries = true)
    })
    @PreAuthorize("hasRole('HOD')")
    public String createSection(Long userId, SectionRequest dto) {

        Teacher hod = teacherRepository.findByUserId(userId);
        Department department = hod.getDepartmentHod();

        Section section = new Section();
        section.setName(dto.getName());
        section.setAcademicYear(dto.getAcademicYear());
        section.setSemester(dto.getSemester());
        section.setYear(dto.getYear());
        section.setStatus(SectionStatus.ACTIVE);
        if(dto.getEmployeeEmailOrEmployeeId()!=null){
            Teacher teacher = teacherRepository.
                    findByEmailOrEmployeeId(dto.getEmployeeEmailOrEmployeeId(),dto.getEmployeeEmailOrEmployeeId());
            section.setClassTeacher(teacher);
        }
        if(department!=null){
            section.setDepartment(department);
        }
        section.setCreatedAt(LocalDateTime.now());
        sectionRepository.save(section);
        section.setCode(String.format("SEC%04d", section.getId()));
        sectionRepository.save(section);
        return "Create Section successfully";
    }

    @Override
    @PreAuthorize("hasRole('HOD')")
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "sections",allEntries = true),
            @CacheEvict(cacheNames = "section",key = "#sectionId")
    })
    public String updateSection(Long sectionId, SectionRequest dto) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(()->
                new IllegalArgumentException("Section not found"));
        if(dto.getEmployeeEmailOrEmployeeId()!=null){
            Teacher teacher = teacherRepository
                    .findByEmailOrEmployeeId(dto.getEmployeeEmailOrEmployeeId(),dto.getEmployeeEmailOrEmployeeId());

            section.setClassTeacher(teacher);
            section.setUpdatedAt(LocalDateTime.now());
            sectionRepository.save(section);
            return "section Teacher update successfully";
        }
        section.setStatus(dto.getSectionStatus());
        section.setName(dto.getName());
        section.setAcademicYear(dto.getAcademicYear());
        section.setSemester(dto.getSemester());
        section.setYear(dto.getYear());
        section.setUpdatedAt(LocalDateTime.now());
        section.setUpdatedAt(LocalDateTime.now());
        sectionRepository.save(section);
        return "section update successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "sections",allEntries = true),
            @CacheEvict(cacheNames = "section",key = "#sectionId")
    })
    public String deleteSection(Long sectionId) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(()->
                new IllegalArgumentException("Section not found"));
        if(section.getClassTeacher()!=null){
            section.setClassTeacher(null);
            section.setClassTeacher(null);
        }
        sectionRepository.delete(section);
        return "Section delete successfully";
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "sections",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<SectionResponse> getAllSection(Long collegeId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Section> sections = sectionRepository.findByDepartmentCollegeId(collegeId,pageable);

        Page<SectionResponse> responses = sections.map(section ->{
            SectionResponse res = new SectionResponse();
            if(section.getClassTeacher()!=null){
                Teacher teacher = section.getClassTeacher();
                ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
                classTeacherResponse.setFirstName(teacher.getFirstName());
                classTeacherResponse.setLastName(teacher.getLastName());
                res.setClassTeacherResponse(classTeacherResponse);
            }
            res.setSectionStatus(section.getStatus());
            res.setId(section.getId());
            res.setName(section.getName());
            res.setAcademicYear(section.getAcademicYear());
            res.setYear(section.getYear());
            res.setSemester(section.getSemester());
            res.setCode(section.getCode());
            res.setDepartmentCode(section.getDepartment().getCode());
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasRole('HOD')")
    @Cacheable(cacheNames = "sections",key = "{#userId,#pageNumber,#pageSize}")
    public Page<SectionResponse> getAllSectionByDepartment(Long userId, int pageNumber, int pageSize) {

        Teacher hod = teacherRepository.findByUserId(userId);
        Department department = hod.getDepartmentHod();

        Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Section> sections = sectionRepository.findByDepartment(department,pageable);

        Page<SectionResponse> responses = sections.map(section ->{
           SectionResponse res = new SectionResponse();

           if(section.getClassTeacher()!=null){
               Teacher teacher = section.getClassTeacher();
               ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
               classTeacherResponse.setFirstName(teacher.getFirstName());
               classTeacherResponse.setLastName(teacher.getLastName());
               res.setClassTeacherResponse(classTeacherResponse);
           }

            res.setSectionStatus(section.getStatus());
            res.setId(section.getId());
            res.setName(section.getName());
            res.setAcademicYear(section.getAcademicYear());
            res.setYear(section.getYear());
            res.setSemester(section.getSemester());
            res.setCode(section.getCode());
            res.setDepartmentCode(section.getDepartment().getCode());
            return res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "section",key = "#sectionId")
    public SectionResponse getSectionById(Long sectionId) {

        Section section = sectionRepository.findById(sectionId).orElseThrow(()->
                new IllegalArgumentException("Class not found"));
        SectionResponse response = new SectionResponse();

        if(section.getClassTeacher()!=null){
            Teacher teacher = section.getClassTeacher();
            ClassTeacherResponse classTeacherResponse = new ClassTeacherResponse();
            classTeacherResponse.setFirstName(teacher.getFirstName());
            classTeacherResponse.setLastName(teacher.getLastName());
            classTeacherResponse.setEmail(teacher.getEmail());
            classTeacherResponse.setPhoneNumber(teacher.getPhoneNumber());
            classTeacherResponse.setEmployeeId(teacher.getEmployeeId());
            response.setClassTeacherResponse(classTeacherResponse);
        }
        response.setTotalStudents(section.getStudents().size());
        response.setSectionStatus(section.getStatus());
        response.setId(section.getId());
        response.setName(section.getName());
        response.setAcademicYear(section.getAcademicYear());
        response.setYear(section.getYear());
        response.setSemester(section.getSemester());
        response.setCode(section.getCode());
        response.setDepartmentName(section.getDepartment().getName());
        response.setDepartmentCode(section.getDepartment().getCode());
        return response;
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('HOD')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "sectionStudents",allEntries = true),
            @CacheEvict(cacheNames = "section",key = "#sectionId")
    })
    public String addStudentInSection(Long sectionId, List<SectionStudentRequest> dto) {
        Section section= sectionRepository.findById(sectionId).orElseThrow(()->
                new IllegalArgumentException("Section not found"));

        for(SectionStudentRequest s:dto){
            Student stu = studentRepository.findByRegistrationNumber(s.getRegistrationNumber());
            if (!section.getStudents().contains(stu)) {
             section.getStudents().add(stu);
            }
        }
        sectionRepository.save(section);
        return "Student added successfully in the class";
    }

    @Override
    @PreAuthorize("hasRole('HOD')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "sectionStudents",allEntries = true),
            @CacheEvict(cacheNames = "section",key = "#sectionId")
    })
    public String deleteStudentFromSection(Long sectionId, Long studentId) {
        Section section = sectionRepository.findById(sectionId).orElseThrow(()->
                new IllegalArgumentException("Section not found"));
        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new IllegalArgumentException("Student not found"));
        section.getStudents().remove(student);
        student.getSections().remove(section);
        sectionRepository.save(section);
        return "Student delete from the section";
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "sectionStudents",key = "{#sectionId,#pageNumber,#pageSize}")
    public Page<StudentResponse> getAllStudentFromSection(Long sectionId, int pageNumber, int pageSize) {
        logger.info("Fetching students from section | sectionId = {}",sectionId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Section section = sectionRepository.findById(sectionId).orElseThrow(()->
                    new IllegalArgumentException("Class not found"));

            Page<Student> students = studentRepository.findBySections(section,pageable);
            Page<StudentResponse> responses = students.map(s->{
                StudentResponse res = modelMapper.map(s,StudentResponse.class);
                double overallAttendancePercent =  getOverallAttendancePercent(sectionId,s.getId());
                res.setAttendancePercent(overallAttendancePercent);
                return res;
            });
            logger.info("students fetched successfully from section | sectionId = {} | returnedElements = {}",sectionId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e){
            logger.error("Failed fetch students from section | sectionId = {}",sectionId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "sectionStudent",key = "#studentId")
    public StudentResponse getStudentFromSectionByStudentId(Long studentId) {
        logger.info("Fetching student | studentId = {}",studentId);
        try{
          Student student = studentRepository.findById(studentId).orElseThrow(()->{
              logger.info("Student not found | studentId = {}",studentId);
              throw new IllegalArgumentException("Student not found");
          });

          StudentResponse response = modelMapper.map(student,StudentResponse.class);
          response.setParentResponse(modelMapper.map(student.getParent(),ParentResponse.class));
          logger.info("Successfully fetch student | studentId = {}",studentId);
          return response;
        } catch (Exception e) {
             logger.error("Failed fetched student | studentId = {}",studentId,e);
            throw e;
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('HOD')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "sectionSubjects",allEntries = true)
    })
    public String addSubjectInSection(Long sectionId, SectionSubjectRequest dto) {

        Section section = sectionRepository.findById(sectionId).orElseThrow(()->
                new IllegalArgumentException("Section not found"));

        Subject subject = subjectRepository.findByCode(dto.getSubjectCode());
        Teacher teacher = teacherRepository.findByEmailOrEmployeeId(dto.getTeacherEmpIdOrEmail(), dto.getTeacherEmpIdOrEmail());

        Boolean isExists = sectionSubjectRepository.existsBySubjectAndSection(subject,section);
        if(isExists){
            return  "already add this subject";
        }

        SectionSubject sectionSubject = new SectionSubject();
        sectionSubject.setSection(section);
        sectionSubject.setSubject(subject);
        sectionSubject.setTeacher(teacher);
        sectionSubject.setCreatedAt(LocalDateTime.now());
        SectionSubject savedSectionSubject = sectionSubjectRepository.save(sectionSubject);

       if(dto.getAddAllSectionStudent())
           addSectionStudentInSectionSubject(savedSectionSubject,section);

        return "add subject in the section";
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "sectionSubjects",key = "{#sectionId,#pageNumber,#pageSize}")
    public Page<SectionSubjectResponse> getAllSectionSubject(Long sectionId, int pageNumber, int pageSize) {
        logger.info("Fetching section subjects by sectionId | sectionId = {}",sectionId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<SectionSubject> sectionSubjects = sectionSubjectRepository.findBySectionId(sectionId,pageable);

            Page<SectionSubjectResponse> responses = sectionSubjects.map(sectionSubject->{
                SectionSubjectResponse res = modelMapper.map(sectionSubject,SectionSubjectResponse.class);

                Subject subject = sectionSubject.getSubject();
                Teacher teacher = sectionSubject.getTeacher();

                if(subject!=null){
                    SubjectResponse subjectResponse = modelMapper.map(subject,SubjectResponse.class);
                    subjectResponse.setTotalStudent(sectionSubject.getStudentSubjects().size());
                    res.setSubjectResponse(subjectResponse);
                }

                if(teacher!=null){
                    ClassTeacherResponse teacherResponse = modelMapper.map(teacher,ClassTeacherResponse.class);
                    res.setTeacherResponse(teacherResponse);
                }
                return res;
            });
            logger.info("successfully fetched section subject by section id | sectionId = {} | returned elements = {}",sectionId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e){
            logger.error("Failed fetched section subjects by section id | sectionId= {}",sectionId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "sectionSubject",key = "#sectionSubjectId")
    public SectionSubjectResponse getSectionSubjectById(Long sectionSubjectId) {

        SectionSubject sectionSubject = sectionSubjectRepository.findById(sectionSubjectId).orElseThrow(()->
                new IllegalArgumentException("Not found"));

        Subject subject = sectionSubject.getSubject();
        Teacher teacher = sectionSubject.getTeacher();

        SectionSubjectResponse response = new SectionSubjectResponse();
        SubjectResponse subjectResponse = new SubjectResponse();
        ClassTeacherResponse teacherResponse = new ClassTeacherResponse();

        if(subject!=null){
            subjectResponse.setId(subject.getId());
            subjectResponse.setCode(subject.getCode());
            subjectResponse.setShortName(subject.getShortName());
            subjectResponse.setCredit(subject.getCredit());
            subjectResponse.setDescription(subject.getDescription());
            subjectResponse.setMaxMarks(subject.getMaxMarks());
            subjectResponse.setPassingMarks(subject.getPassingMarks());
            subjectResponse.setSubjectType(subject.getSubjectType());
            subjectResponse.setName(subject.getName());
        }

        if(teacher!=null){
           teacherResponse.setEmployeeId(teacher.getEmployeeId());
            teacherResponse.setFirstName(teacher.getFirstName());
            teacherResponse.setLastName(teacher.getLastName());
           teacherResponse.setEmail(teacher.getEmail());
           teacherResponse.setPhoneNumber(teacher.getPhoneNumber());
        }

        response.setId(sectionSubject.getId());
        response.setSubjectResponse(subjectResponse);
        response.setTeacherResponse(teacherResponse);

        return response;
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('HOD')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "sectionSubjects",allEntries = true),
            @CacheEvict(cacheNames = "sectionSubject",key = "#sectionSubjectId")
    })
    public String updateSubjectTeacher(Long sectionSubjectId, SectionSubjectRequest dto) {

        SectionSubject sectionSubject = sectionSubjectRepository.findById(sectionSubjectId).orElseThrow(()->
                new IllegalArgumentException("section subject not found"));

        Teacher teacher = teacherRepository.findByEmailOrEmployeeId(dto.getTeacherEmpIdOrEmail(), dto.getTeacherEmpIdOrEmail());

        sectionSubject.setTeacher(teacher);
        sectionSubject.setUpdatedAt(LocalDateTime.now());

        sectionSubjectRepository.save(sectionSubject);

        return "subject teacher update successfully";
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('HOD')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "sectionSubject",key = "#sectionSubjectId"),
            @CacheEvict(cacheNames = "sectionSubjectStudents",allEntries = true),
    })
    public String addStudentInSectionSubject(Long sectionSubjectId, List<SectionStudentRequest> dto) {

        SectionSubject sectionSubject = sectionSubjectRepository.findById(sectionSubjectId).orElseThrow(()->
                new IllegalArgumentException("Not found"));

        List<StudentSubject> studentSubjects = new ArrayList<>();
        for(SectionStudentRequest s:dto){
             StudentSubject studentSubject = new StudentSubject();

             Student student = studentRepository.findByRegistrationNumber(s.getRegistrationNumber());

             if(student==null){
                 continue;
             }

             Boolean isExists = studentSubjectRepository.existsByStudentAndSectionSubject(student,sectionSubject);
             if(isExists){
                 continue;
             }

             studentSubject.setSectionSubject(sectionSubject);
             studentSubject.setStudent(student);
             studentSubjects.add(studentSubject);
             studentSubject.setCreatedAt(LocalDateTime.now());
        }

        studentSubjectRepository.saveAll(studentSubjects);

        return "student add successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "sectionSubjectStudents",key = "{#sectionSubjectId,#pageNumber,#pageSize}")
    public Page<SectionSubjectResponse> getAllStudentFromSectionSubject(Long sectionSubjectId, int pageNumber, int pageSize) {

        logger.info("Fetching Students from sectionSubject | sectionSubjectId={}",sectionSubjectId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<StudentSubject> studentSubjects = studentSubjectRepository.findBySectionSubjectId(sectionSubjectId,pageable);

            Page<SectionSubjectResponse> responses = studentSubjects.map(studentSubject->{

                int totalPresent = 0;
                int totalAbsent = 0;

                for(StudentAttendance attendance:studentSubject.getStudentAttendances()){
                   if(attendance.getStatus()==AttendanceStatus.PRESENT)
                       totalPresent++;
                   else if(attendance.getStatus()==AttendanceStatus.ABSENT)
                       totalAbsent++;
                }
                int totalAttendance = totalPresent+totalAbsent;
                double attendancePercent = totalAttendance==0 ? 0 :  ((double)totalPresent /totalAttendance)*100.0;

               SectionSubjectResponse res = modelMapper.map(studentSubject,SectionSubjectResponse.class);
               StudentResponse studentResponse = modelMapper.map(studentSubject.getStudent(),StudentResponse.class);
               studentResponse.setAttendancePercent(attendancePercent);
               res.setStudentResponse(studentResponse);
               return res;
            });
            logger.info("Students from sectionSubject Fetched successfully | sectionSubjectId={} | returnedElements={}",sectionSubjectId,responses.getNumberOfElements());
            return responses;
        } catch (Exception  e){
            logger.error("Failed fetch student from student subject | sectionSubjectId={}",sectionSubjectId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "studentSubjects",key = "{#sectionId,#studentId,#pageNumber,#pageSize}")
    public StudentSubjectResponse getStudentSubjectBySectionIdAndStudentId(Long sectionId, Long studentId, int pageNumber, int pageSize) {
       logger.info("Fetching student subjects | sectionId = {} | studentId = {}",sectionId,studentId);
       try{

           StudentSubjectResponse responses = new StudentSubjectResponse();

           Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));
           Page<StudentSubject> studentSubjects = studentSubjectRepository.findByStudentIdAndSectionSubjectSectionId(studentId,sectionId,pageable);

           Page<SubjectResponse> subjectResponses = studentSubjects.map(studentSubject -> {
               SubjectResponse res= modelMapper.map(studentSubject.getSectionSubject().getSubject(),SubjectResponse.class);

               res.setTotalPresent(studentSubject.getStudentAttendances().stream()
                       .filter(attendance->attendance.getStatus()==AttendanceStatus.PRESENT).toList().size());
               res.setTotalAbsent(studentSubject.getStudentAttendances().stream()
                       .filter(attendance->attendance.getStatus()==AttendanceStatus.ABSENT).toList().size());
               return res;
           });
           responses.setSubjectResponse(subjectResponses);

           responses.setTotalPresent(getOverallAttendance(sectionId,studentId)[0]);
           responses.setTotalAbsent(getOverallAttendance(sectionId,studentId)[1]);

           logger.info("Successfully fetched student subjects | sectionId = {} | studentId = {} | returnedElement = {}",sectionId,studentId,responses.getSubjectResponse().getNumberOfElements());
           return responses;
       } catch (Exception e){
         logger.error("Failed fetched student subjects | sectionId = {} | studentId = {}",sectionId,studentId,e);
         throw e;
       }
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('HOD')")
    @Caching(evict = {
             @CacheEvict(cacheNames = "exams",allEntries = true),
             @CacheEvict(cacheNames = "studentExams",allEntries = true)
    })
    public String createExam(List<ExamRequest> dto) {
        logger.info("Creating exam");
        try{
            for(ExamRequest examRequest:dto){
                Exam exam = modelMapper.map(examRequest,Exam.class);

                SectionSubject sectionSubject = sectionSubjectRepository.findById(examRequest.getSectionSubjectId()).orElseThrow(()->{
                  logger.error("Section subject not found | sectionSubjectId = {}",examRequest.getSectionSubjectId());
                  return new IllegalArgumentException("Section subject not found");
                });
                exam.setCreatedAt(LocalDateTime.now());
                exam.setId(null);
                Exam savedExam = examRepository.save(exam);

                List<StudentExam> studentExams = new ArrayList<>();
                for(StudentSubject studentSubject:sectionSubject.getStudentSubjects()){
                    StudentExam studentExam = new StudentExam();
                    studentExam.setStudent(studentSubject.getStudent());
                    studentExam.setExam(savedExam);
                    studentExam.setCreatedAt(LocalDateTime.now());

                    studentExams.add(studentExam);
                }
                studentExamRepository.saveAll(studentExams);
            }
            logger.info("Successfully create exam");
            return "successfully create exam";
        } catch (Exception e) {
            logger.error("failed create exam",e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasRole('HOD')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "exams",allEntries = true),
            @CacheEvict(cacheNames = "exam",key = "#examId"),
            @CacheEvict(cacheNames = "studentExams",allEntries = true)
    })
    public String updateExam(Long examId, ExamRequest dto) {
        logger.info("Updating exam | examId = {}",examId);
        try{
            Exam exam = examRepository.findById(examId).orElseThrow(()->{
                logger.error("Exam not found | examId = {}",examId);
                return new IllegalArgumentException("Exam not found");
            });
            exam.setName(dto.getName());
            exam.setType(dto.getType());
            exam.setMode(dto.getMode());
            exam.setDate(dto.getDate());
            exam.setStartTime(dto.getStartTime());
            exam.setEndTime(dto.getEndTime());
            exam.setMaxMarks(dto.getMaxMarks());
            exam.setPassingMarks(dto.getPassingMarks());
            exam.setStatus(dto.getStatus());
            exam.setUpdatedAt(LocalDateTime.now());
            examRepository.save(exam);
            logger.info("successfully update exam | examId = {}",examId);
            return "Successfully update exam";
        } catch (Exception e) {
            logger.error("Failed update exam | examId = {}",examId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "exams",key = "{#sectionId,#pageNumber,#pageSize}")
    public Page<ExamResponse> getExams(Long sectionId, int pageNumber, int pageSize) {
        logger.info("Fetching exams | sectionId = {}",sectionId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<Exam> exams = examRepository.findBySectionSubjectSectionId(sectionId,pageable);
            Page<ExamResponse> responses = exams.map(exam -> {
                ExamResponse res =  modelMapper.map(exam,ExamResponse.class);
                res.setSubjectResponse(modelMapper.map(exam.getSectionSubject().getSubject(),SubjectResponse.class));
                return res;
            });
            logger.info("Successfully fetch exams | sectionId = {} | returnedElements = {}",sectionId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e){
            logger.error("failed fetched exams | sectionId = {}",sectionId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','HOD')")
    @Cacheable(cacheNames = "exam",key = "#examId")
    public ExamResponse getExamById(Long examId) {
        logger.info("Fetching exam by id | examId = {}",examId);
        try {
            Exam exam = examRepository.findById(examId).orElseThrow(()->{
                logger.error("Exam not found | examId = {}",examId);
                return new IllegalArgumentException("Exam not found");
            });
            ExamResponse response = modelMapper.map(exam,ExamResponse.class);
            response.setSubjectResponse(modelMapper.map(exam.getSectionSubject().getSubject(),SubjectResponse.class));
            logger.info("Successfully fetch exam by id | examId = {}",examId);
            return response;
        } catch (Exception e){
            logger.error("Failed to fetched exam by id | examId = {}",examId,e);
            throw e;
        }

    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "studentExams",key = "{#examId,#pageNumber,#pageSize}")
    public Page<StudentExamResponse> getStudentExamsByExamId(Long examId, int pageNumber, int pageSize) {
        logger.info("Fetching student exams | examId = {}",examId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<StudentExam> studentExams = studentExamRepository.findByExamId(examId,pageable);

            Page<StudentExamResponse> responses = studentExams.map(studentExam -> {
                StudentExamResponse res =  modelMapper.map(studentExam,StudentExamResponse.class);
                res.setStudentResponse(modelMapper.map(studentExam.getStudent(),StudentResponse.class));
                return res;
            });
            return responses;
        } catch (Exception e){
            logger.error("Failed Fetched student exams | examId = {}",examId,e);
            throw e;
        }
    }
}
