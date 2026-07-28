package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.course.CourseDepartmentResponse;
import com.example.UniversityManagementSystem.dto.course.CourseRequest;
import com.example.UniversityManagementSystem.dto.course.CourseResponse;
import com.example.UniversityManagementSystem.dto.course.CourseStudentResponse;
import com.example.UniversityManagementSystem.entity.Course;
import com.example.UniversityManagementSystem.entity.Department;
import com.example.UniversityManagementSystem.entity.Student;
import com.example.UniversityManagementSystem.entity.type.CourseDurationType;
import com.example.UniversityManagementSystem.repository.CollegeRepository;
import com.example.UniversityManagementSystem.repository.CourseRepository;
import com.example.UniversityManagementSystem.repository.DepartmentRepository;
import com.example.UniversityManagementSystem.repository.StudentRepository;
import com.example.UniversityManagementSystem.services.CourseService;
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
public class CourseServiceImp implements CourseService {

    private final CollegeRepository collegeRepository;
    private final CourseRepository courseRepository;
    private final DepartmentRepository departmentRepository;
    private final StudentRepository studentRepository;

    public CourseServiceImp(CollegeRepository collegeRepository,
                            CourseRepository courseRepository,
                            DepartmentRepository departmentRepository,
                            StudentRepository studentRepository) {
        this.collegeRepository = collegeRepository;
        this.courseRepository = courseRepository;
        this.departmentRepository = departmentRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "courses",allEntries = true)
    })
    public String createCourse(CourseRequest dto) {

        String courseCode = dto.getShortName();

        Course course = new Course();
        course.setName(dto.getName());
        course.setShortName(dto.getShortName());
        course.setCourseCode(courseCode);
        course.setDuration(dto.getDuration());
        course.setCourseDurationType(dto.getCourseDurationType());
        if(dto.getCourseDurationType()== CourseDurationType.SEMESTER){
           course.setTotalSemester(Math.round(dto.getDuration()*2));
        }
        course.setDescription(dto.getDescription());
        course.setCreatedAt(LocalDateTime.now());
        courseRepository.save(course);

        return "Course create successfully";
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "courses",allEntries = true),
            @CacheEvict(cacheNames = "course",key = "#courseId")
    })
    public String updateCourse(Long courseId, CourseRequest dto) {
       Course course = courseRepository.findById(courseId).orElseThrow(()->
              new IllegalArgumentException("Course not found"));


        String courseCode = dto.getShortName();

        course.setName(dto.getName());
        course.setShortName(dto.getShortName());
        course.setCourseCode(courseCode);
        course.setDuration(dto.getDuration());
        course.setCourseDurationType(dto.getCourseDurationType());
        if(dto.getCourseDurationType()== CourseDurationType.SEMESTER){
            course.setTotalSemester(Math.round(dto.getDuration()*2));
        } else{
            course.setTotalSemester(null);
        }
        course.setDescription(dto.getDescription());
        course.setUpdatedAt(LocalDateTime.now());
        courseRepository.save(course);

        return "Course update successfully";
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "courses",key = "{#pageNumber,#pageSize}")
    public Page<CourseResponse> getAllCourse(int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Course> courses = courseRepository.findAll(pageable);

        Page<CourseResponse> responses = courses.map(course -> {
           CourseResponse res = new CourseResponse();
           res.setId(course.getId());
           res.setShortName(course.getShortName());
           res.setCourseCode(course.getCourseCode());
           res.setDuration(course.getDuration());
           res.setCourseDurationType(course.getCourseDurationType());
           res.setTotalCollege(course.getColleges().size());
           return  res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "collegeCourses",key = "{#collegeId,#pageNumber,#pageSize}")
    public Page<CourseResponse> getCourseByCollege(Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Course> courses = null;
        if(collegeId==null){
           courses = courseRepository.findAll(pageable);
        } else{
            courses = courseRepository.findByColleges_Id(collegeId,pageable);
        }
        Page<CourseResponse> responses = courses.map(course -> {
           CourseResponse res = new CourseResponse();
            res.setId(course.getId());
            res.setShortName(course.getShortName());
            res.setCourseCode(course.getCourseCode());
            res.setDuration(course.getDuration());
            res.setCourseDurationType(course.getCourseDurationType());
            return  res;
        });
        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "course",key = "#courseId")
    public CourseResponse getCourseById(Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(()->
                new IllegalArgumentException("Course not found"));

        Integer totalDepartment = course.getDepartment().size();
        Integer totalStudent = course.getDepartment().stream()
                .mapToInt(department->department.getStudentList().size())
                .sum();

        CourseResponse response = new CourseResponse();
        response.setId(course.getId());
        response.setShortName(course.getShortName());
        response.setCourseCode(course.getCourseCode());
        response.setDuration(course.getDuration());
        response.setName(course.getName());
        response.setCourseDurationType(course.getCourseDurationType());
        response.setDescription(course.getDescription());
        response.setTotalSemester(course.getTotalSemester());
        response.setTotalDepartment(totalDepartment);
        response.setTotalStudent(totalStudent);
        return response;
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "courseDepartment",key = "{#courseId,#pageNumber,#pageSize}")
    public Page<CourseDepartmentResponse> getDepartmentsByCourseId(Long courseId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Department> departments = departmentRepository.findByCourseId(courseId,pageable);

        Page<CourseDepartmentResponse> responses = departments.map(dep->{
           CourseDepartmentResponse res = new CourseDepartmentResponse();
           res.setId(dep.getId());
           res.setCode(dep.getCode());
           res.setName(dep.getName());
           if(dep.getCollege()!=null)
            res.setCollegeName(dep.getCollege().getShortName());
           res.setHodName(dep.getHodTeacher().getFirstName()+" "+dep.getHodTeacher().getLastName());
           res.setHodEmail(dep.getHodTeacher().getEmail());
           res.setHodPhoneNumber(dep.getHodTeacher().getPhoneNumber());
           return  res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "collegeCourseDepartment",key = "{#courseId,#collegeId,#pageNumber,#pageSize}")
    public Page<CourseDepartmentResponse> getDepartmentsByCourseIdAndCollegeId(Long courseId, Long collegeId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Department> departments = departmentRepository.findByCourseIdAndCollegeId(courseId,collegeId,pageable);

        Page<CourseDepartmentResponse> responses = departments.map(dep->{
            CourseDepartmentResponse res = new CourseDepartmentResponse();
            res.setId(dep.getId());
            res.setCode(dep.getCode());
            res.setName(dep.getName());
            res.setHodName(dep.getHodTeacher().getFirstName()+" "+dep.getHodTeacher().getLastName());
            res.setHodEmail(dep.getHodTeacher().getEmail());
            res.setHodPhoneNumber(dep.getHodTeacher().getPhoneNumber());
            return res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "courseStudent",key = "{#courseId,#pageNumber,#pageSize}")
    public Page<CourseStudentResponse> getStudentByCourseId(Long courseId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Student> students = studentRepository.findByDepartmentCourseId(courseId,pageable);

        Page<CourseStudentResponse> responses = students.map(stu->{
           CourseStudentResponse res = new CourseStudentResponse();
           res.setId(stu.getId());
           res.setRollNumber(stu.getRollNumber());
           res.setName(stu.getFirstName()+" "+stu.getLastName());
           res.setEmail(stu.getEmail());
           res.setPhoneNumber(stu.getPhoneNumber());
           res.setGender(stu.getGender());
           if(stu.getCollege()!=null)
            res.setCollegeName(stu.getCollege().getShortName());
           return res;
        });

        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    @Cacheable(cacheNames = "collegeCourseStudent",key = "{#courseId,#collegeId,#pageNumber,#pageSize}")
    public Page<CourseStudentResponse> getStudentByCourseIdAndCollegeId(Long courseId, Long collegeId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Student> students = studentRepository.findByDepartmentCourseIdAndCollegeId(courseId,collegeId,pageable);

        Page<CourseStudentResponse> responses = students.map(stu->{
            CourseStudentResponse res = new CourseStudentResponse();
            res.setId(stu.getId());
            res.setRollNumber(stu.getRollNumber());
            res.setRegistrationNumber(stu.getRegistrationNumber());
            res.setName(stu.getFirstName()+" "+stu.getLastName());
            res.setEmail(stu.getEmail());
            res.setPhoneNumber(stu.getPhoneNumber());
            res.setGender(stu.getGender());
            return res;
        });

        return responses;
    }

}
