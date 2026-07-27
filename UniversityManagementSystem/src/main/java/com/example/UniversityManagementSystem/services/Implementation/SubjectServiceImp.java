package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.subject.SubjectRequest;
import com.example.UniversityManagementSystem.dto.subject.SubjectResponse;
import com.example.UniversityManagementSystem.entity.Course;
import com.example.UniversityManagementSystem.entity.Subject;
import com.example.UniversityManagementSystem.repository.CourseRepository;
import com.example.UniversityManagementSystem.repository.SubjectRepository;
import com.example.UniversityManagementSystem.services.SubjectService;
import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SubjectServiceImp implements SubjectService {

    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;

    public SubjectServiceImp(CourseRepository courseRepository,
                             SubjectRepository subjectRepository) {
        this.courseRepository = courseRepository;
        this.subjectRepository = subjectRepository;
    }


    @Override
    @Transactional
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(
            evict = {
                    @CacheEvict(cacheNames = "subjects",allEntries = true)
            }
    )
    public String createSubject(Long courseId, SubjectRequest dto) {
        Course course = courseRepository.findById(courseId).orElseThrow(()->
                new IllegalArgumentException("Course not found"));

        String code = dto.getSemester()+"SUB";

        Subject subject = new Subject();
        subject.setName(dto.getName());
        subject.setShortName(dto.getShortName());
        subject.setDescription(dto.getDescription());
        subject.setSemester(dto.getSemester());
        subject.setYear(dto.getYear());
        subject.setSubjectType(dto.getSubjectType());
        subject.setCredit(dto.getCredit());
        subject.setMaxMarks(dto.getMaxMarks());
        subject.setPassingMarks(dto.getPassingMarks());
        subject.setCourse(course);
        subject.setCreatedAt(LocalDateTime.now());

        Subject savedSub = subjectRepository.save(subject);

        code += savedSub.getId();
        subject.setCode(code);
        subjectRepository.save(subject);

        return "Subject create successfully";
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(
            evict = {
                    @CacheEvict(cacheNames = "subjects",allEntries = true),
                    @CacheEvict(cacheNames = "subject",key = "#subjectId")
            }
    )
    public String updateSubject(Long subjectId, SubjectRequest dto) {
        Subject subject = subjectRepository.findById(subjectId).orElseThrow(()->
                new IllegalArgumentException("Subject not found"));
        String code = dto.getSemester()+"SUB"+subjectId;
        subject.setName(dto.getName());
        subject.setShortName(dto.getShortName());
        subject.setDescription(dto.getDescription());
        subject.setSemester(dto.getSemester());
        subject.setYear(dto.getYear());
        subject.setSubjectType(dto.getSubjectType());
        subject.setCredit(dto.getCredit());
        subject.setMaxMarks(dto.getMaxMarks());
        subject.setPassingMarks(dto.getPassingMarks());
        subject.setCode(code);
        subject.setUpdatedAt(LocalDateTime.now());

        subjectRepository.save(subject);

        return "Subject update successfully";
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    @Cacheable(cacheNames = "subjects",key = "{#courseId,#pageNumber,#pageSize}")
    public Page<SubjectResponse> getAllSubject(Long courseId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Subject> subjects = subjectRepository.findByCourseId(courseId,pageable);

        Page<SubjectResponse> responses = subjects.map(sub->{
            SubjectResponse res = new SubjectResponse();
            res.setId(sub.getId());
            res.setCode(sub.getCode());
            res.setName(sub.getName());
            res.setShortName(sub.getShortName());
            res.setSemester(sub.getSemester());
            res.setYear(sub.getYear());
            res.setSubjectType(sub.getSubjectType());
            res.setCredit(sub.getCredit());

            return res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    @Cacheable(cacheNames = "subject",key = "#subjectId")
    public SubjectResponse getSubjectById(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId).orElseThrow(()->
                new IllegalArgumentException("Subject not found"));
        SubjectResponse response = new SubjectResponse();
        response.setId(subject.getId());
        response.setCode(subject.getCode());
        response.setName(subject.getName());
        response.setShortName(subject.getShortName());
        response.setSemester(subject.getSemester());
        response.setYear(subject.getYear());
        response.setSubjectType(subject.getSubjectType());
        response.setCredit(subject.getCredit());
        response.setMaxMarks(subject.getMaxMarks());
        response.setPassingMarks(subject.getPassingMarks());
        response.setDescription(subject.getDescription());

        return response;
    }
}
