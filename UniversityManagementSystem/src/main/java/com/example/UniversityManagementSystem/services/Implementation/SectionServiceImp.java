package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.section.*;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.type.SectionStatus;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.SectionService;
import jakarta.transaction.Transactional;
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

    public SectionServiceImp(SectionRepository sectionRepository, TeacherRepository teacherRepository,
                             StudentRepository studentRepository,
                             SubjectRepository subjectRepository,
                             SectionSubjectRepository sectionSubjectRepository,
                             StudentSubjectRepository studentSubjectRepository) {
        this.sectionRepository = sectionRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.sectionSubjectRepository = sectionSubjectRepository;
        this.studentSubjectRepository = studentSubjectRepository;
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
            section.getClassTeacher().setClassTeacher(null);
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
                classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
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
               classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
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
            classTeacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
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
        student.getClasses().remove(section);
        sectionRepository.save(section);
        return "Student delete from the section";
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "sectionStudents",key = "{#sectionId,#pageNumber,#pageSize}")
    public Page<SectionStudentResponse> getAllStudentFromSection(Long sectionId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Section section = sectionRepository.findById(sectionId).orElseThrow(()->
                new IllegalArgumentException("Class not found"));

        Page<Student> students = studentRepository.findBySections(section,pageable);
        Page<SectionStudentResponse> responses = students.map(s->{
           SectionStudentResponse res = new SectionStudentResponse();
           res.setId(s.getId());
           res.setRollNumber(s.getRollNumber());
           res.setFirstName(s.getFirstName());
           res.setLastName(s.getLastName());
           res.setRegistrationNumber(s.getRegistrationNumber());
           res.setPhoneNumber(s.getPhoneNumber());
           res.setEmail(s.getEmail());
           return res;
        });
        return responses;
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

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<SectionSubject> sectionSubjects = sectionSubjectRepository.findBySectionId(sectionId,pageable);

        Page<SectionSubjectResponse> responses = sectionSubjects.map(sectionSubject->{

            Subject subject = sectionSubject.getSubject();
            Teacher teacher = sectionSubject.getTeacher();

           SectionSubjectResponse res = new SectionSubjectResponse();
           SubjectResponse subjectResponse = new SubjectResponse();
           ClassTeacherResponse teacherResponse = new ClassTeacherResponse();

           if(subject!=null){
               subjectResponse.setId(subject.getId());
               subjectResponse.setCode(subject.getCode());
               subjectResponse.setShortName(subject.getShortName());
           }

           if(teacher!=null){
               teacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
               teacherResponse.setEmployeeId(teacher.getEmployeeId());
               teacherResponse.setEmail(teacher.getEmail());
               teacherResponse.setPhoneNumber(teacher.getPhoneNumber());
            }

           res.setId(sectionSubject.getId());
           res.setSubjectResponse(subjectResponse);
           res.setTeacherResponse(teacherResponse);

           return res;
        });

        return responses;
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
           teacherResponse.setName(teacher.getFirstName()+" "+teacher.getLastName());
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
    public Page<SectionStudentResponse> getAllStudentFromSectionSubject(Long sectionSubjectId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<StudentSubject> studentSubjects = studentSubjectRepository.findBySectionSubjectId(sectionSubjectId,pageable);

        Page<SectionStudentResponse> responses  = studentSubjects.map(studentSubject->{
            Student student = studentSubject.getStudent();

           SectionStudentResponse res = new SectionStudentResponse();
           res.setId(student.getId());
           res.setRollNumber(student.getRollNumber());
           res.setRegistrationNumber(student.getRegistrationNumber());
           res.setFirstName(student.getFirstName());
           res.setLastName(student.getLastName());
           res.setEmail(student.getEmail());
           res.setPhoneNumber(student.getPhoneNumber());
           return res;
        });

        return responses;
    }
}
