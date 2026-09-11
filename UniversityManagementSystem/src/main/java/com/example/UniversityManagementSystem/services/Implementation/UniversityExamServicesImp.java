package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.universityExam.*;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.type.DocumentStatus;
import com.example.UniversityManagementSystem.entity.type.DocumentType;
import com.example.UniversityManagementSystem.entity.type.ResultStatus;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.UniversityExamService;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.Barcode128;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UniversityExamServicesImp implements UniversityExamService {

    private final Logger logger  = LoggerFactory.getLogger(UniversityExamServicesImp.class);
    private final ModelMapper modelMapper = new ModelMapper();
    private final CourseRepository courseRepository;
    private final UniversityExamRepository universityExamRepository;
    private final UniversityExamSubjectRepository universityExamSubjectRepository;
    private final StudentUniversityExamRepository studentUniversityExamRepository;
    private final NotificationRepository notificationRepository;
    private final StudentUniversityExamSubjectRepository studentUniversityExamSubjectRepository;
    private final CollegeRepository collegeRepository;
    private final StudentDocumentRepository studentDocumentRepository;

    public UniversityExamServicesImp(CourseRepository courseRepository,
                                     UniversityExamRepository universityExamRepository,
                                     UniversityExamSubjectRepository universityExamSubjectRepository,
                                     StudentUniversityExamRepository studentUniversityExamRepository,
                                     NotificationRepository notificationRepository,
                                     ExamRepository examRepository,
                                     StudentUniversityExamSubjectRepository studentUniversityExamSubjectRepository,
                                     CollegeRepository collegeRepository,
                                     StudentDocumentRepository studentDocumentRepository) {
        this.courseRepository = courseRepository;
        this.universityExamRepository = universityExamRepository;
        this.universityExamSubjectRepository = universityExamSubjectRepository;
        this.studentUniversityExamRepository = studentUniversityExamRepository;
        this.notificationRepository = notificationRepository;
        this.studentUniversityExamSubjectRepository = studentUniversityExamSubjectRepository;
        this.collegeRepository = collegeRepository;
        this.studentDocumentRepository = studentDocumentRepository;
    }

    private void createNotification(User user,String title,String message){
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setIsRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    private String safeValue(Object value) {
        if (value == null) {
            return "";
        }
        return String.valueOf(value);
    }

    private String formatTime(LocalDateTime time) {
        return time != null
                ? time.format(DateTimeFormatter.ofPattern("hh:mm a"))
                : "";
    }

    private void addDetailRow(PdfPTable table, String label1, String value1, String label2, String value2) {
        Font labelFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 8);
        Font valueFont = FontFactory.getFont(FontFactory.HELVETICA, 8);

        PdfPCell labelCell1 = new PdfPCell(
                        new Phrase(label1, labelFont));
        labelCell1.setBackgroundColor(new Color(245, 245, 245));
        labelCell1.setPadding(5);

        table.addCell(labelCell1);

        PdfPCell valueCell1 = new PdfPCell(
                        new Phrase(safeValue(value1), valueFont));
        valueCell1.setPadding(5);

        table.addCell(valueCell1);

        PdfPCell labelCell2 = new PdfPCell(
                new Phrase(label2, labelFont));
        labelCell2.setBackgroundColor(new Color(245, 245, 245));
        labelCell2.setPadding(5);

        table.addCell(labelCell2);

        PdfPCell valueCell2 = new PdfPCell(
                new Phrase(safeValue(value2), valueFont));

        valueCell2.setPadding(5);
        table.addCell(valueCell2);
    }

    private PdfPTable createSubjectSectionTable(String title, int columns) {
        PdfPTable table = new PdfPTable(columns);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{1,1,3,3});
        table.setSpacingBefore(8);
        table.setSpacingAfter(8);

        PdfPCell header = new PdfPCell(
                new Phrase(title, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, Color.WHITE))
        );

        header.setColspan(columns);
        header.setBackgroundColor(Color.GRAY);

        header.setHorizontalAlignment(Element.ALIGN_CENTER);

        header.setVerticalAlignment(Element.ALIGN_MIDDLE);
        header.setPadding(6);

        table.addCell(header);

        return table;
    }

    private PdfPCell createStudentSignatureCell(Student student) {
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 8);
        PdfPCell signatureCell = new PdfPCell();
        signatureCell.setBorder(Rectangle.NO_BORDER);
        signatureCell.setVerticalAlignment(Element.ALIGN_TOP);

        try {
            StudentDocument studentDocument = student.getStudentDocument().stream()
                    .filter(studentDocument1 -> Objects.equals(studentDocument1.getDocumentType(),DocumentType.SIGNATURE) &&
                            Objects.equals(studentDocument1.getStatus(),DocumentStatus.VERIFIED))
                    .findFirst()
                    .orElse(null);

            String signaturePath = studentDocument.getFilePath();
            if (signaturePath != null && !signaturePath.isBlank()) {
                Image signature = Image.getInstance(signaturePath);
                signature.scaleToFit(160f, 40f);
                signature.setAlignment(Image.ALIGN_RIGHT);
                signatureCell.addElement(signature);
            } else {
                Paragraph empty = new Paragraph("\n\n", normalFont);
                signatureCell.addElement(empty);
            }
        } catch (Exception e) {
            logger.error("Unable to load student signature | studentId = {}", student.getId(), e);
            Paragraph empty = new Paragraph("\n\n", normalFont);
            signatureCell.addElement(empty);
        }
        return signatureCell;
    }

    private PdfPCell createCenterCell(String text) {
        PdfPCell cell = createCell(text);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }

    private PdfPCell createCell(String text) {
        Font font = FontFactory.getFont(FontFactory.HELVETICA, 8);

        PdfPCell cell = new PdfPCell(
                        new Phrase(safeValue(text), font));
        cell.setPadding(5);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        return cell;
    }

    private void addTableHeader(PdfPTable table, String text) {
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 8);
        PdfPCell cell = new PdfPCell(
                        new Phrase(text, font));

        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setPadding(5);
        table.addCell(cell);
    }


    private PdfPTable createSectionTable(String title, int columns) {
        PdfPTable table = new PdfPTable(columns);
        table.setWidthPercentage(100);
        table.setSpacingBefore(8);
        table.setSpacingAfter(8);

        PdfPCell header = new PdfPCell(
                new Phrase(title, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, Color.WHITE))
        );

        header.setColspan(columns);
        header.setBackgroundColor(Color.GRAY);

        header.setHorizontalAlignment(Element.ALIGN_CENTER);

        header.setVerticalAlignment(Element.ALIGN_MIDDLE);
        header.setPadding(6);

        table.addCell(header);

        return table;
    }

    private void addLabelValue(PdfPTable table,String label, String value, Font labelFont, Font valueFont) {
        PdfPCell labelCell = new PdfPCell(new Paragraph(label, labelFont));

        labelCell.setPadding(5);
        table.addCell(labelCell);
        PdfPCell valueCell = new PdfPCell(new Paragraph(value != null ? value : "-", valueFont));
        valueCell.setPadding(5);
        table.addCell(valueCell);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "universityExams",allEntries = true)
    })
    public String createExam(UniversityExamRequest dto) {
        logger.info("Creating University exam");
        try{
            Course course = courseRepository.findByCourseCode(dto.getCourseCode());
            UniversityExam exam = modelMapper.map(dto,UniversityExam.class);
            exam.setCourse(course);
            exam.setShowTimeTable(false);
            exam.setShowAdmitCard(false);
            exam.setShowResult(false);
            exam.setCreatedAt(LocalDateTime.now());

            UniversityExam savedExam = universityExamRepository.save(exam);

            List<Subject>subjects = course.getSubjects().stream()
                    .filter(subject -> Objects.equals(subject.getYear(), dto.getYear()) &&
                          Objects.equals(subject.getSemester(),dto.getSemester()))
                    .toList();

            List<UniversityExamSubject> universityExamSubjects = new ArrayList<>();

            for(Subject subject: subjects){
                UniversityExamSubject universityExamSubject = new UniversityExamSubject();
                universityExamSubject.setUniversityExam(savedExam);
                universityExamSubject.setSubject(subject);
                universityExamSubject.setMaxMarks(subject.getMaxMarks());
                universityExamSubject.setPassingMarks(subject.getPassingMarks());
                universityExamSubject.setCreatedAt(LocalDateTime.now());

                universityExamSubjects.add(universityExamSubject);
            }

            universityExamSubjectRepository.saveAll(universityExamSubjects);

            List<StudentAcademic> studentAcademics = course.getStudentAcademics().stream()
                    .filter(student->Objects.equals(student.getYear(),dto.getYear()) &&
                            Objects.equals(student.getSemester(),dto.getSemester()) &&
                            Boolean.TRUE.equals(student.getIsCurrent()))
                    .toList();

            String notificationTitle = "University Exam Form Submission Open";
            String notificationMessage =    "Exam form available: " + dto.getName()
                    + " for " + course.getName()
                    + ", Year " + dto.getYear()
                    + ", Semester " + dto.getSemester()
                    + ", Academic Year " + dto.getAcademicYear()
                    + ". Form: " + dto.getFormStartAt()
                    + " to " + dto.getFormEndAt();

            List<StudentUniversityExam> studentUniversityExams = new ArrayList<>();
            for(StudentAcademic studentAcademic:studentAcademics){
                StudentUniversityExam studentUniversityExam = new StudentUniversityExam();
                studentUniversityExam.setFilledFrom(false);
                studentUniversityExam.setUniversityExam(savedExam);
                studentUniversityExam.setStudent(studentAcademic.getStudent());
                studentUniversityExam.setCreatedAt(LocalDateTime.now());

                studentUniversityExams.add(studentUniversityExam);
                createNotification(studentAcademic.getStudent().getUser(),notificationTitle,notificationMessage);
            }

            studentUniversityExamRepository.saveAll(studentUniversityExams);

            logger.info("Successfully create university exam");
            return "Successfully create";
        } catch (Exception e) {
            logger.error("Failed to create university exam",e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "universityExams",key = "{#pageNumber,#pageSize}")
    public Page<UniversityExamResponse> getAllExam(int pageNumber, int pageSize) {
        logger.info("Fetching university exam");
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<UniversityExam> universityExams = universityExamRepository.findAll(pageable);

            Page<UniversityExamResponse> responses = universityExams.map(exam->{
               return modelMapper.map(exam,UniversityExamResponse.class);
            });
            logger.info("Successfully fetched university exam | returnedElements = {}",responses.getNumberOfElements());
            return responses;
        } catch (Exception e) {
            logger.error("Failed to fetched university exam",e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "universityExam",key = "#universityExamId")
    public UniversityExamResponse getExamById(Long universityExamId) {
        logger.info("Fetching university exam by id | universityExamid = {}",universityExamId);
        try{
            UniversityExam exam = universityExamRepository.findById(universityExamId).orElseThrow(()->{
                logger.error("university exam not found | universityExamId = {}",universityExamId);
                throw new IllegalArgumentException("Not found");
            });
            UniversityExamResponse response = modelMapper.map(exam,UniversityExamResponse.class);

            int totalFilledFormStu = exam.getStudentUniversityExams().stream()
                            .filter(student->Boolean.TRUE.equals(student.getFilledFrom()))
                                    .toList().size();

            response.setTotalSubjects(exam.getUniversityExamSubjects().size());
            response.setTotalStudents(exam.getStudentUniversityExams().size());
            response.setTotalFilledFormStudents(totalFilledFormStu);
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched university exam by id | universityExamId = {}",universityExamId,e);
            throw new RuntimeException(e);
        }

    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(
            evict = {
                @CacheEvict(cacheNames = "universityExam",key = "#universityExamId"),
                    @CacheEvict(cacheNames = "studentUniversityExamsByUserId",allEntries = true)
            }
    )
    public String updateUniversityExam(Long universityExamId, UniversityExamRequest dto) {
        logger.info("updating university-exam | universityExamId = {}",universityExamId);
        try{
            UniversityExam exam = universityExamRepository.findById(universityExamId).orElseThrow(()->{
                logger.error("University exam not found | universityExamId = {}",universityExamId);
                throw new IllegalArgumentException("Not found");
            });
            exam.setFormStartAt(dto.getFormStartAt());
            exam.setFormEndAt(dto.getFormEndAt());
            exam.setUpdatedAt(LocalDateTime.now());
            universityExamRepository.save(exam);
            logger.info("Successfully update university exam | universityExamId = {}",universityExamId);
            return "Successfully update";
        } catch (Exception e) {
            logger.error("Failed to update universityExam | universityExamId = {}",universityExamId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "universityExam",key = "#universityExamId"),
            @CacheEvict(cacheNames = "studentUniversityExamsByUserId",allEntries = true)
    })
    public String updateUniversityExamShowTimeTable(Long universityExamId) {
        logger.info("Updating university-exam show time table | universityExamId = {}",universityExamId);
        try{
            UniversityExam universityExam = universityExamRepository.findById(universityExamId).orElseThrow(()->{
                logger.error("UniversityExam not found | universityExamId = {}",universityExamId);
                return new IllegalArgumentException("UniversityExam not found");
            });
            universityExam.setShowTimeTable(!universityExam.getShowTimeTable());
            universityExam.setUpdatedAt(LocalDateTime.now());
            universityExamRepository.save(universityExam);

            logger.info("Successfully update university-exam show time table | univsersityExamId = {}",universityExamId);
            return "Successfully update";
        } catch (Exception e) {
            logger.error("Failed to update university-exam show time table | universityExamId = {}",universityExamId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "universityExam",key = "#universityExamId"),
            @CacheEvict(cacheNames = "studentUniversityExamsByUserId",allEntries = true)
    })
    public String updateUniversityExamShowAdmitCard(Long universityExamId) {
        logger.info("Updating to show university-exam show admit card | universityExamId = {}",universityExamId);
        try{
            UniversityExam universityExam = universityExamRepository.findById(universityExamId).orElseThrow(()->{
               logger.error("UniversityExam not found | universityExamId = {}",universityExamId);
               return new IllegalArgumentException("UniversityExam not found");
            });
            universityExam.setShowAdmitCard(!universityExam.getShowAdmitCard());
            universityExam.setUpdatedAt(LocalDateTime.now());
            universityExamRepository.save(universityExam);

            logger.info("Successfully update universityExam show admit card | universityExamId = {}",universityExamId);
            return "successfully update";
        } catch (Exception e) {
            logger.error("Failed to updated the universityExam show admit card | universityExamId = {}",universityExamId);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "universityExam",key = "#universityExamId"),
            @CacheEvict(cacheNames = "universityExamResultOverview",allEntries = true),
            @CacheEvict(cacheNames = "studentUniversityExamsByUserId",allEntries = true)
    })
    public String updateUniversityExamShowResul(Long universityExamId) {
        logger.info("Updating universityExam show result | universityExamId = {}",universityExamId);
        try{
            UniversityExam universityExam = universityExamRepository.findById(universityExamId).orElseThrow(()->{
                logger.error("UniversityExam not found | universityExamId = {}",universityExamId);
                return new IllegalArgumentException("UniversityExam not found");
            });
            universityExam.setShowResult(!universityExam.getShowResult());
            universityExam.setUpdatedAt(LocalDateTime.now());
            universityExamRepository.save(universityExam);

            logger.info("Successfully update universityExam | universityExamId = {}",universityExamId);
            return "successfully update";
        } catch (Exception e) {
            logger.error("Failed to update universityExam | universityExamId = {}",universityExamId);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','STUDENT')")
    @Cacheable(cacheNames = "universityExamSubjects",key = "#universityExamId + ':' + T(org.springframework.security.core.context.SecurityContextHolder).getContext().getAuthentication().getAuthorities()")
    public List<UniversityExamSubjectResponse> getUniversityExamSubjects(Long universityExamId) {
        logger.info("Fetching university-exam-subjects | universityExamId = {}",universityExamId);
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Set<String> roles = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            boolean isSuperAdmin = roles.contains("ROLE_SUPER_ADMIN");

            List<UniversityExamSubject> subjects = universityExamSubjectRepository.findByUniversityExamId(universityExamId);

            List<UniversityExamSubjectResponse> response = subjects.stream().map(subject->{
                UniversityExamSubjectResponse res = modelMapper.map(subject,UniversityExamSubjectResponse.class);
                SubjectResponse subjectResponse = modelMapper.map(subject.getSubject(),SubjectResponse.class);
                res.setSubjectResponse(subjectResponse);
                if(isSuperAdmin)
                 res.setTotalStudents(subject.getStudentUniversityExamSubjects().size());
                return res;
            }).toList();
            logger.info("Successfully Fetched to university-exam-subjects | universityExamId = {} | returnedElements = {}",universityExamId,response.size());
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched university-exam-subject | universityExamId = {}",universityExamId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "universityExamSubject",key = "{#universityExamSubjectId,#pageNumber,#pageSize}")
    public UniversityExamSubjectResponse getUniversityExamSubjectById(Long universityExamSubjectId, int pageNumber, int pageSize) {
        logger.info("Fetching university-exam-subject-by-id | universityExamSubjectId = {}",universityExamSubjectId);
        try{

            Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));

            UniversityExamSubject universityExamSubject = universityExamSubjectRepository.findById(universityExamSubjectId).orElseThrow(()->{
                logger.error("universityExamSubject not found | universityExamSubjectId = {}",universityExamSubjectId);
                return new RuntimeException("UniversityExamSubject not found");
            });
            UniversityExamSubjectResponse response = modelMapper.map(universityExamSubject,UniversityExamSubjectResponse.class);
            SubjectResponse subjectResponse = modelMapper.map(universityExamSubject.getSubject(),SubjectResponse.class);

            Page<StudentUniversityExamSubject> studentUniversityExamSubjects = studentUniversityExamSubjectRepository.findByUniversityExamSubjectId(universityExamSubjectId,pageable);
            Page<StudentUniversityExamSubjectResponse> studentUniversityExamSubjectResponses = studentUniversityExamSubjects.map(studentExamSubject->{
               StudentUniversityExamSubjectResponse res = modelMapper.map(studentExamSubject,StudentUniversityExamSubjectResponse.class);
               StudentResponse studentResponse = modelMapper.map(studentExamSubject.getStudentUniversityExam().getStudent(),StudentResponse.class);

               res.setStudentResponse(studentResponse);
               return res;
            });

            response.setTotalStudents(universityExamSubject.getStudentUniversityExamSubjects().size());
            response.setSubjectResponse(subjectResponse);
            response.setStudentUniversityExamSubjectResponses(studentUniversityExamSubjectResponses);
            logger.info("Successfully fetched university-exam-subject-by-id | universityExamSubjectId = {}",universityExamSubjectId);
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched university-exam-by-id | universityExamSubjectId = {}",universityExamSubjectId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "universityExamSubject",allEntries = true),
            @CacheEvict(cacheNames = "universityExamSubjects",allEntries = true)
    })
    public String updateUniversityExamSubject(Long universityExamSubjectId, UniversityExamSubjectRequest dto) {
       logger.info("Updating universityExamSubject | universityExamSubjectId = {}",universityExamSubjectId);
       try{
           UniversityExamSubject subject = universityExamSubjectRepository.findById(universityExamSubjectId).orElseThrow(()->{
              logger.error("universityExamSubject not found | universityExamSubjectId = {}",universityExamSubjectId);
              return new RuntimeException("UniversityExamSubject not found");
           });
           subject.setDate(dto.getDate());
           subject.setStartTime(dto.getStartTime());
           subject.setEndTime(dto.getEndTime());
           subject.setUpdatedAt(LocalDateTime.now());

           universityExamSubjectRepository.save(subject);

           logger.info("Successfully update universityExamSubject | universityExamSubjectId = {}",universityExamSubjectId);
           return "Successfully update";
       } catch (Exception e) {
           logger.error("Failed to update universityExamSubject | universityExamSubjectId = {}",universityExamSubjectId,e);
           throw new RuntimeException(e);
       }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "studentUniversityExamsByUniversityExamId",key = "{#universityExamId,#pageNumber,#pageSize}")
    public Page<StudentUniversityExamResponse> getStudentUniversityExamByUniversityExamId(Long universityExamId, int pageNumber, int pageSize) {
        logger.info("Fetching student-university-exam by universityExamId = {}",universityExamId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<StudentUniversityExam> studentUniversityExams = studentUniversityExamRepository.
                    findByUniversityExamId(universityExamId,pageable);
            Page<StudentUniversityExamResponse> responses = studentUniversityExams.map(studentUniversityExam -> {
                StudentUniversityExamResponse res = modelMapper.map(studentUniversityExam,StudentUniversityExamResponse.class);
                StudentResponse studentResponse = modelMapper.map(studentUniversityExam.getStudent(),StudentResponse.class);
                res.setStudentResponse(studentResponse);
                return res;
            });
            logger.info("Successfully fetched student-university-exam by universityExamId | universityExamId = {} | returnedElements ={}",universityExamId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e) {
            logger.error("Failed to fetched to student-university-exam by universityExamId = {}",universityExamId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "studentUniversityExamsByUserId",key = "{#userId,#pageNumber,#pageSize}")
    public Page<StudentUniversityExamResponse> getStudentUniversityExamByUserId(Long userId, int pageNumber, int pageSize) {
        logger.info("Fetching student-university-exam by userId | userId = {}",userId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<StudentUniversityExam> studentUniversityExams = studentUniversityExamRepository.findByStudentUserId(userId,pageable);
            Page<StudentUniversityExamResponse> responses = studentUniversityExams.map(studentUniversityExam -> {
                StudentUniversityExamResponse res = new StudentUniversityExamResponse();
                res.setId(studentUniversityExam.getId());
                res.setFilledFrom(studentUniversityExam.getFilledFrom());

                UniversityExam universityExam = studentUniversityExam.getUniversityExam();
                UniversityExamResponse universityExamResponse = modelMapper.map(universityExam,UniversityExamResponse.class);

                res.setUniversityExamResponse(universityExamResponse);
                return res;
            });
            logger.info("successfully fetched student-university-exam by userId | userId = {} | returnedElement = {}",userId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e) {
            logger.error("Failed to fetched student-university-exam by userId | userId = {}",userId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT','SUPER_ADMIN')")
    @Cacheable(cacheNames = "studentUniversityExam",key = "#studentUniversityExamId")
    public StudentUniversityExamResponse getStudentUniversityExamById(Long studentUniversityExamId) {
        logger.info("Fetching student-university-exam by id | studentUniversityExamId = {}",studentUniversityExamId);
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Set<String> roles = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            boolean isSuperAdmin = roles.contains("ROLE_SUPER_ADMIN");

            StudentUniversityExam studentUniversityExam = studentUniversityExamRepository.findById(studentUniversityExamId).orElseThrow(()->{
               logger.error("StudentUniversityExam not found by id | id = {}",studentUniversityExamId);
               throw new IllegalArgumentException("Not found");
            });


            StudentUniversityExamResponse response = modelMapper.map(studentUniversityExam,StudentUniversityExamResponse.class);
            UniversityExamResponse universityExamResponse = modelMapper.map(studentUniversityExam.getUniversityExam(),UniversityExamResponse.class);

            Student student = studentUniversityExam.getStudent();

            StudentDocument studentDocument = student.getStudentDocument().stream()
                    .filter(document-> Objects.equals(document.getDocumentType(), DocumentType.PHOTO) &&
                            Objects.equals(document.getStatus(), DocumentStatus.VERIFIED))
                    .findFirst()
                    .orElse(null);

            StudentResponse studentResponse = modelMapper.map(student,StudentResponse.class);
            studentResponse.setFatherName(student.getParent().getFatherName());
            studentResponse.setMotherName(student.getParent().getMotherName());
            if(student.getCollege()!=null){
                studentResponse.setCollegeName(student.getCollege().getName());
                studentResponse.setCollegeCode(student.getCollege().getCollegeCode());
            }
            
            if(studentDocument!=null)
             studentResponse.setPhoto(studentDocument.getFilePath());

            List<StudentUniversityExamSubject> subjects = studentUniversityExam.getStudentUniversityExamSubjects();
            List<StudentUniversityExamSubjectResponse> subjectResponses = subjects.stream().map(subject->{
                StudentUniversityExamSubjectResponse res = modelMapper.map(subject,StudentUniversityExamSubjectResponse.class);
                SubjectResponse subjectResponse = modelMapper.map(subject.getUniversityExamSubject().getSubject(),SubjectResponse.class);
                res.setSubjectResponse(subjectResponse);
                return res;
            }).toList();

            if(isSuperAdmin && studentUniversityExam.getExamCenterCollege()!=null){
                response.setExamCenterCollegeName(studentUniversityExam.getExamCenterCollege().getName());
                response.setExamCenterCollegeCode(studentUniversityExam.getExamCenterCollege().getCollegeCode());
            }

            response.setUniversityExamResponse(universityExamResponse);
            response.setStudentResponse(studentResponse);
            response.setStudentUniversityExamSubjectResponse(subjectResponses);
            logger.info("Successfully fetched student-university-exam | id = {}",studentUniversityExamId);
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched student-university-exam by id | studentUniversityExamId = {}",studentUniversityExamId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentUniversityExam",key = "#studentUniversityExamId")
    })
    public String updateStudentUniversityExamCenter(Long studentUniversityExamId, String collegeCode) {
        logger.info("Updating student-university-exam-center | studentUniversityExamId = {}",studentUniversityExamId);
        try{
           StudentUniversityExam studentUniversityExam = studentUniversityExamRepository.findById(studentUniversityExamId).orElseThrow(()->{
              logger.error("StudentUniversityExam not found | studentUniversityExamId = {}",studentUniversityExamId);
              return new RuntimeException("StudentUniversity Exam not found");
           });

           College centerCollege = collegeRepository.findByCollegeCode(collegeCode);
           studentUniversityExam.setExamCenterCollege(centerCollege);
           studentUniversityExam.setUpdatedAt(LocalDateTime.now());
           studentUniversityExamRepository.save(studentUniversityExam);

            logger.info("successfully student-university-exam-center | studentUniversityExamId = {}",studentUniversityExamId);
            return "Successfully update";
        } catch (Exception e) {
            logger.error("Failed to update student-university-exam-center | studentUniversityExamId = {}",studentUniversityExamId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Transactional
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentUniversityExamsByUserId",allEntries = true),
            @CacheEvict(cacheNames = "studentUniversityExamsByUniversityExamId",allEntries = true),
            @CacheEvict(cacheNames = "studentUniversityExamsByUniversityExamId",allEntries = true)
    })
    public String saveStudentUniversityExamForm(Long studentUniversityExamId, List<Long> universityExamSubjectsIds) {
        logger.info("Saving student-university-exam-form | studentUniversityExamId = {}",studentUniversityExamId);
        try{
            StudentUniversityExam studentUniversityExam = studentUniversityExamRepository.findById(studentUniversityExamId).
                    orElseThrow(()->{
                        logger.error("StudentUniversityExam not found | studentUnivesityExamId = {}",studentUniversityExamId);
                        throw new IllegalArgumentException("Not found");
                    });

            List<StudentUniversityExamSubject> studentUniversityExamSubjects = new ArrayList<>();
            for(Long id : universityExamSubjectsIds){
                UniversityExamSubject examSubject = universityExamSubjectRepository.findById(id).orElseThrow(()->{
                    logger.error("University exam subject not found | UniversityExamSubjectId = {}" ,id);
                    throw new IllegalArgumentException("subject not found");
                });
                StudentUniversityExamSubject subject = new StudentUniversityExamSubject();
                subject.setUniversityExamSubject(examSubject);
                subject.setStudentUniversityExam(studentUniversityExam);
                subject.setCreatedAt(LocalDateTime.now());
                studentUniversityExamSubjects.add(subject);
            }
            studentUniversityExamSubjectRepository.saveAll(studentUniversityExamSubjects);

            studentUniversityExam.setFilledFrom(true);
            studentUniversityExam.setSubmittedAt(LocalDateTime.now());
            studentUniversityExam.setUpdatedAt(LocalDateTime.now());
            studentUniversityExamRepository.save(studentUniversityExam);

            logger.info("Successfully save student-university-exam-form | studentUniversityExamId = {}",studentUniversityExamId);
            return "successfully save";
        } catch (Exception e) {
            logger.error("Failed to save student-university-exam-form | studentUniversityExamId = {}",studentUniversityExamId);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','STUDENT')")
    public ByteArrayInputStream generateStudentApplicationForm(Long studentUniversityExamId) {
        logger.info("Generating student university application form | studentUniversityExamId = {}", studentUniversityExamId);
        try {
            StudentUniversityExam studentUniversityExam = studentUniversityExamRepository.findById(studentUniversityExamId).orElseThrow(() -> {
                                logger.error("StudentUniversityExam not found | studentUniversityExamId = {}", studentUniversityExamId);
                                return new IllegalArgumentException("StudentUniversityExam not found");
                            });

            UniversityExam universityExam = studentUniversityExam.getUniversityExam();
            Student student = studentUniversityExam.getStudent();
            List<StudentUniversityExamSubject> subjects = studentUniversityExam.getStudentUniversityExamSubjects();

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            Document document = new Document(PageSize.A4, 30, 30, 30, 30);

            PdfWriter.getInstance(document, out);
            document.open();

            Font universityFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 13);
            Font subTitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
            Font headingFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Color.WHITE);
            Font labelFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 8);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 8);
            Font smallFont = FontFactory.getFont(FontFactory.HELVETICA, 7);

            PdfPTable mainTable = new PdfPTable(1);
            mainTable.setWidthPercentage(100);

            PdfPCell mainCell = new PdfPCell();
            mainCell.setPadding(8);
            mainCell.setBorder(Rectangle.BOX);

            PdfPTable headerTable = new PdfPTable(1);
            headerTable.setWidthPercentage(100);

            PdfPCell headerCell = new PdfPCell();
            headerCell.setBorder(Rectangle.NO_BORDER);
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setVerticalAlignment(Element.ALIGN_MIDDLE);

//            Paragraph universityName = new Paragraph("UNIVERSITY NAME", universityFont);
//            universityName.setAlignment( Element.ALIGN_CENTER);

//            headerCell.addElement(universityName);

//            Paragraph universityAddress = new Paragraph("UNIVERSITY ADDRESS", smallFont);
//            universityAddress.setAlignment(Element.ALIGN_CENTER);
//
//            headerCell.addElement(universityAddress);
//
//            Paragraph applicationTitle = new Paragraph("END-TERM EXAMINATION", titleFont);
//            applicationTitle.setAlignment(Element.ALIGN_CENTER);
//
//            headerCell.addElement(applicationTitle);
//
//            Paragraph applicationForm = new Paragraph("APPLICATION FORM", titleFont);
//            applicationForm.setAlignment(Element.ALIGN_CENTER);
//
//            headerCell.addElement(applicationForm);

//            Paragraph academicSession = new Paragraph("Academic Session: " + safeValue(universityExam.getAcademicYear()), subTitleFont);
//            academicSession.setAlignment(Element.ALIGN_CENTER);
//
//            headerCell.addElement(academicSession);

//            Paragraph formNumber = new Paragraph("APPLICATION / FORM NO: " + studentUniversityExam.getId(), subTitleFont);
//            formNumber.setAlignment(Element.ALIGN_CENTER);
//
//            headerCell.addElement(formNumber);
//            headerTable.addCell(headerCell);
//
//            mainCell.addElement(headerTable);

            PdfPTable examTable = createSectionTable("EXAMINATION INFORMATION", 4);

            addDetailRow(examTable, "Exam Name", safeValue(universityExam.getName()), "Course", universityExam.getCourse().getName());
            addDetailRow(examTable, "Course Code", universityExam.getCourse().getCourseCode(), "Academic Year", safeValue(universityExam.getAcademicYear()));
            addDetailRow(examTable, "Year", safeValue(universityExam.getYear())+" Year", "Semester", safeValue(universityExam.getSemester())+" Semester");
            addDetailRow(examTable, "Application No.", safeValue(studentUniversityExam.getId()),"","");

            mainCell.addElement(examTable);

            PdfPTable studentTable = createSectionTable("PERSONAL DETAILS", 4);

            String studentName = safeValue(student.getFirstName()) + " " + safeValue(student.getLastName());

            addDetailRow(studentTable, "Student Name", studentName, "Roll Number", safeValue(student.getRollNumber()));
            addDetailRow(studentTable, "Enrollment No.", safeValue(student.getEnrollmentNumber()), "Date of Birth", safeValue(student.getDob()));
            addDetailRow(studentTable, "Gender", safeValue(student.getGender()), "Caste", safeValue(student.getCast()));
            addDetailRow(studentTable, "Aadhaar Number", student.getAadhaarNumber(), "Phone Number", safeValue(student.getPhoneNumber()));
            addDetailRow(studentTable, "Email", safeValue(student.getEmail()), "Father Name",
                    student.getParent() != null
                            ? safeValue(
                            student.getParent().getFatherName()
                    )
                            : ""
            );
            addDetailRow(studentTable, "Mother Name",
                    student.getParent() != null
                            ? safeValue(
                            student.getParent().getMotherName()
                    )
                            : "",
                    "Student Status",
                    "REGISTERED"
            );

            mainCell.addElement(studentTable);

            PdfPTable subjectTable = createSubjectSectionTable("SELECTED SUBJECTS", 4);

            addTableHeader(subjectTable, "S.No.");
            addTableHeader(subjectTable, "Subject Code");
            addTableHeader(subjectTable, "Subject Name");
            addTableHeader(subjectTable, "Subject Type");

            int serialNumber = 1;
            if (subjects != null && !subjects.isEmpty()) {
                for (StudentUniversityExamSubject item : subjects) {
                    Subject subject = item.getUniversityExamSubject().getSubject();
                    subjectTable.addCell(createCenterCell(String.valueOf(serialNumber++)));
                    subjectTable.addCell(createCell(subject.getCode()));
                    subjectTable.addCell(createCell(subject.getName()));
                    subjectTable.addCell(createCenterCell(safeValue(subject.getSubjectType())));
                }
            } else {
                PdfPCell noSubject = new PdfPCell(
                                new Phrase("No subjects selected", normalFont));
                noSubject.setColspan(5);
                noSubject.setHorizontalAlignment(Element.ALIGN_CENTER);
                noSubject.setPadding(8);
                subjectTable.addCell(noSubject);
            }

            mainCell.addElement(subjectTable);

            mainCell.addElement(new Paragraph(" "));

            PdfPTable photoSignatureTable = new PdfPTable(2);
            photoSignatureTable.setWidthPercentage(100);
            photoSignatureTable.setWidths(new float[]{1, 4});

            PdfPCell photoPlaceCell = new PdfPCell();
            photoPlaceCell.setBorder(Rectangle.BOX);
            photoPlaceCell.setFixedHeight(120);

            try {
                StudentDocument studentDocument = student.getStudentDocument().stream()
                        .filter(studentDocument1 -> Objects.equals(studentDocument1.getDocumentType(),DocumentType.PHOTO)&&
                                Objects.equals(studentDocument1.getStatus(),DocumentStatus.VERIFIED))
                        .findFirst()
                        .orElse(null);

                String imagePath =studentDocument.getFilePath();
                if (imagePath != null && !imagePath.isBlank()) {
                    Image image = Image.getInstance(imagePath);
                    image.scaleAbsolute(100f, 120f);
                    photoPlaceCell.addElement(image);
                } else {
                    Paragraph noPhoto = new Paragraph("PHOTO", normalFont);
                    noPhoto.setAlignment(Element.ALIGN_CENTER);
                    photoPlaceCell.addElement(noPhoto);
                }
            } catch (Exception e) {
                logger.error("Unable to load student photo | studentId = {}", student.getId(), e);
                Paragraph noPhoto = new Paragraph("PHOTO", normalFont);
                noPhoto.setAlignment(Element.ALIGN_CENTER);
                photoPlaceCell.addElement(noPhoto);
            }

            photoSignatureTable.addCell(photoPlaceCell);

            PdfPCell signatureCell = createStudentSignatureCell(student);
            photoSignatureTable.addCell(signatureCell);
            mainCell.addElement(photoSignatureTable);

            Paragraph generatedDate = new Paragraph("Generated On: " + LocalDateTime.now()
                                    .format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")), smallFont);

            generatedDate.setAlignment(Element.ALIGN_RIGHT);

            mainCell.addElement(generatedDate);

            mainTable.addCell(mainCell);
            document.add(mainTable);

            document.close();

            logger.info("Successfully generated student university application form | studentUniversityExamId = {}", studentUniversityExamId);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (Exception e) {
            logger.error("Failed to generate student university application form | studentUniversityExamId = {}", studentUniversityExamId, e);
            throw new RuntimeException("Failed to generate application form", e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','STUDENT')")
    @Cacheable(cacheNames = "universityExamTimeTable",key = "#universityExamId")
    public List<UniversityExamSubjectResponse> getUniversityExamTimeTable(Long universityExamId) {
        logger.info("Fetching university-exam-subject for the timetable | universityExamId = {}",universityExamId);
        try{
            List<UniversityExamSubject> universityExamSubjects = universityExamSubjectRepository.findByUniversityExamId(universityExamId);
            List<UniversityExamSubjectResponse> responses  = universityExamSubjects.stream().map(universityExamSubject->{
                UniversityExamSubjectResponse res = new UniversityExamSubjectResponse();
                res.setId(universityExamSubject.getId());
                res.setDate(universityExamSubject.getDate());
                res.setStartTime(universityExamSubject.getStartTime());
                res.setEndTime(universityExamSubject.getEndTime());

                Subject subject = universityExamSubject.getSubject();
                SubjectResponse subjectResponse = new SubjectResponse();

                subjectResponse.setId(subject.getId());
                subjectResponse.setName(subject.getName());
                subjectResponse.setCode(subject.getCode());
                subjectResponse.setSubjectType(subject.getSubjectType());

                res.setSubjectResponse(subjectResponse);
                return res;
            }).toList();
            return responses;
        } catch (Exception e) {
            logger.error("Failed to fetched the university-exam-subject for the timetable | universityExamId = {}",universityExamId,e);
            throw new RuntimeException(e);
        }
    }


    @Override
    @PreAuthorize("hasRole('STUDENT')")
    public ByteArrayInputStream generateStudentAdmitCard(Long studentUniversityExamId) {
        logger.info("Generating student exam admit card | studentUniversityExamId = {}", studentUniversityExamId);
        try {
            StudentUniversityExam studentUniversityExam = studentUniversityExamRepository.findById(studentUniversityExamId).orElseThrow(() -> {
                                logger.error("StudentUniversityExam not found | studentUniversityExamId = {}", studentUniversityExamId);
                                return new IllegalArgumentException("StudentUniversityExam not found");
                            });

            UniversityExam universityExam = studentUniversityExam.getUniversityExam();

            Student student = studentUniversityExam.getStudent();

            List<StudentUniversityExamSubject> subjects = studentUniversityExam.getStudentUniversityExamSubjects().stream()
                    .sorted(Comparator.comparing(subject->subject.getUniversityExamSubject().getDate()))
                            .toList();

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = new Document(PageSize.A4, 30, 30, 30, 30);

            PdfWriter writer=PdfWriter.getInstance(document, outputStream);
            document.open();

            Font universityFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            Font titleFont = new Font(Font.HELVETICA, 15, Font.BOLD);
            Font normalFont = new Font(Font.HELVETICA, 10, Font.NORMAL);
            Font boldFont = new Font(Font.HELVETICA, 10, Font.BOLD);

//            PdfPTable headerTable = new PdfPTable(1);
//            headerTable.setWidthPercentage(100);

//            PdfPCell universityCell = new PdfPCell(new Paragraph("UNIVERSITY NAME", universityFont));
//            universityCell.setHorizontalAlignment(Element.ALIGN_CENTER);
//            universityCell.setBorder(Rectangle.NO_BORDER);
//
//            headerTable.addCell(universityCell);
//
//            PdfPCell examCell = new PdfPCell(new Paragraph("UNIVERSITY EXAMINATION", titleFont));
//            examCell.setHorizontalAlignment(Element.ALIGN_CENTER);
//            examCell.setBorder(Rectangle.NO_BORDER);
//
//            headerTable.addCell(examCell);
//
//            document.add(headerTable);
//
//            Paragraph admitCardTitle = new Paragraph("EXAMINATION ADMIT CARD", titleFont);
//            admitCardTitle.setAlignment(Element.ALIGN_CENTER);
//            admitCardTitle.setSpacingBefore(10);
//            admitCardTitle.setSpacingAfter(15);
//
//            document.add(admitCardTitle);

            PdfPTable barcodeTable = new PdfPTable(1);
            barcodeTable.setWidthPercentage(100);

            PdfPCell barcodeCell = new PdfPCell();
            barcodeCell.setBorder(Rectangle.NO_BORDER);
            barcodeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            barcodeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);

            barcodeCell.setPaddingTop(8f);
            barcodeCell.setPaddingBottom(5f);
            barcodeCell.setPaddingLeft(0f);
            barcodeCell.setPaddingRight(0f);

            try {
                String barcodeValue =
                        "ID=" + safeValue(String.valueOf(studentUniversityExamId))
                                + "|ROLL=" + safeValue(student.getRollNumber())
                                + "|NAME=" + safeValue(student.getFirstName())+" "+safeValue(student.getLastName());

                if (barcodeValue.isBlank()) {
                    barcodeValue = String.valueOf(studentUniversityExamId);
                }

                Barcode128 barcode = new Barcode128();
                barcode.setCode(barcodeValue);
                barcode.setCodeType(Barcode128.CODE128);
                barcode.setX(1.0f);
                barcode.setBarHeight(30f);
                barcode.setFont(null);
                Image barcodeImage = barcode.createImageWithBarcode(
                        writer.getDirectContent(),
                        null,
                        null
                );
                barcodeImage.scalePercent(75f);
                barcodeImage.setAlignment(Element.ALIGN_LEFT);
                barcodeCell.addElement(barcodeImage);
            } catch (Exception ex) {
                logger.warn("Unable to generate barcode for studentUniversityExamId={}", studentUniversityExamId, ex);
                Paragraph fallback = new Paragraph(
                        safeValue(student.getRollNumber()),
                        boldFont
                );
                fallback.setAlignment(Element.ALIGN_LEFT);
                barcodeCell.addElement(fallback);
            }

            barcodeTable.addCell(barcodeCell);
            document.add(barcodeTable);

            PdfPTable examTable = createSectionTable("EXAMINATION INFORMATION", 4);

            addDetailRow(examTable, "Exam Name", safeValue(universityExam.getName()), "Course", universityExam.getCourse().getName());
            addDetailRow(examTable, "Course Code", safeValue(universityExam.getCourse().getCourseCode()), "Academic Year", safeValue(universityExam.getAcademicYear()));
            addDetailRow(examTable, "Year", safeValue(universityExam.getYear())+" Year", "Semester", safeValue(universityExam.getSemester())+" Semester");

            document.add(examTable);
            document.add(new Paragraph(" "));

            PdfPTable studentTable = createSectionTable("STUDENT DETAILS",2);
            studentTable.setWidthPercentage(100);
            studentTable.setWidths(new float[]{3f, 1f});

            PdfPTable detailsTable = new PdfPTable(2);
            detailsTable.setWidthPercentage(100);
            addLabelValue(detailsTable, "Enrollment Number", safeValue(student.getEnrollmentNumber()), boldFont, normalFont);
            addLabelValue(detailsTable, "Roll Number", safeValue(student.getRollNumber()), boldFont, normalFont);
            addLabelValue(detailsTable, "Student Name", safeValue(student.getFirstName()) + " " +safeValue( student.getLastName()), boldFont, normalFont);
            addLabelValue(detailsTable, "Email", safeValue(student.getEmail()), boldFont, normalFont);
            addLabelValue(detailsTable, "Phone", safeValue(student.getPhoneNumber()), boldFont, normalFont);

            PdfPCell detailsCell = new PdfPCell(detailsTable);
            detailsCell.setPadding(5);
            studentTable.addCell(detailsCell);

            PdfPCell photoCell = new PdfPCell();
            photoCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            photoCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            photoCell.setPadding(5);

            StudentDocument studentDocument = student.getStudentDocument().stream()
                    .filter(sd->Objects.equals(sd.getDocumentType(),DocumentType.PHOTO) &&
                            Objects.equals(sd.getStatus(),DocumentStatus.VERIFIED))
                    .findFirst()
                    .orElse(null);

            String studentImage =studentDocument.getFilePath();
            if (studentImage != null && !studentImage.isBlank()) {
                try {
                    Image image = Image.getInstance(studentImage);
                    image.scaleToFit(100, 120);
                    photoCell.addElement(image);
                } catch (Exception imageException) {
                    photoCell.addElement(new Paragraph("PHOTO", boldFont));
                    logger.warn("Unable to load student image | path={}", studentImage, imageException);
                }
            } else {
                photoCell.addElement(new Paragraph("PHOTO", boldFont));
            }
            studentTable.addCell(photoCell);
            document.add(studentTable);

            document.add(new Paragraph(" "));

            PdfPTable centerTable = createSectionTable("CENTER DETAILS", 1);
            centerTable.setWidthPercentage(100);

            PdfPTable centerDetailsTable = new PdfPTable(2);
            centerDetailsTable.setWidthPercentage(100);
            centerDetailsTable.setWidths(new float[]{1f,3f});

            addLabelValue(centerDetailsTable, "College Name", safeValue(studentUniversityExam.getExamCenterCollege().getName()), boldFont, normalFont);
            addLabelValue(centerDetailsTable, "College Code", safeValue(studentUniversityExam.getExamCenterCollege().getCollegeCode()), boldFont, normalFont);
            addLabelValue(centerDetailsTable, "Address", safeValue(studentUniversityExam.getExamCenterCollege().getAddress().getAddress())+", "+
                    safeValue(studentUniversityExam.getExamCenterCollege().getAddress().getCity())+", "+
                    safeValue(studentUniversityExam.getExamCenterCollege().getAddress().getDistrict())+", "+
                    safeValue(studentUniversityExam.getExamCenterCollege().getAddress().getState()), boldFont, normalFont);

            PdfPCell centerDetailsCell = new PdfPCell(centerDetailsTable);
            centerDetailsCell.setPadding(5);

            centerTable.addCell(centerDetailsCell);

            PdfPCell emptyCell = new PdfPCell();
            emptyCell.setBorder(Rectangle.NO_BORDER);
            centerTable.addCell(emptyCell);

            document.add(centerTable);

            PdfPTable subjectTable = createSectionTable("EXAMINATION SCHEDULE",5);
            subjectTable.setWidthPercentage(100);
            subjectTable.setWidths(new float[]{0.5f,1f, 4f, 1.5f, 2.5f});

            addTableHeader(subjectTable, "No.");
            addTableHeader(subjectTable,"Code");
            addTableHeader(subjectTable, "Subject");
            addTableHeader(subjectTable, "Date");
            addTableHeader(subjectTable, "Time");

            int serialNumber = 1;
            for (StudentUniversityExamSubject subject : subjects) {
                subjectTable.addCell(createCenterCell(String.valueOf(serialNumber++)));
                subjectTable.addCell(safeValue(subject.getUniversityExamSubject().getSubject().getCode()));
                subjectTable.addCell(safeValue(subject.getUniversityExamSubject().getSubject().getName()));
                subjectTable.addCell(
                        subject.getUniversityExamSubject().getDate() != null
                                ? subject.getUniversityExamSubject().getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                                : ""
                );
                subjectTable.addCell(
                        formatTime(subject.getUniversityExamSubject().getStartTime())
                                + " - " +
                                formatTime(subject.getUniversityExamSubject().getEndTime())
                );
            }

            document.add(subjectTable);
            document.add(new Paragraph(" "));

            Paragraph instructionTitle = new Paragraph("IMPORTANT INSTRUCTIONS", boldFont);

            document.add(instructionTitle);
            document.add(new Paragraph("1. Carry this admit card to the examination hall.", normalFont));
            document.add(new Paragraph("2. Carry a valid college/university identity card.", normalFont));
            document.add(new Paragraph("3. Report to the examination hall at least 30 minutes before the examination.", normalFont));
            document.add(new Paragraph("4. Electronic devices are not permitted in the examination hall.", normalFont));

            document.close();

            logger.info("Successfully generated student exam admit card | studentUniversityExamId = {}", studentUniversityExamId);
            return new ByteArrayInputStream(outputStream.toByteArray());
        } catch (Exception e) {
            logger.error("Failed to generate student exam admit card | studentUniversityExamId = {}", studentUniversityExamId, e);
            throw new RuntimeException("Failed to generate student admit card", e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
         @CacheEvict(cacheNames = "universityExamSubject",allEntries = true)
    })
    public String updateStudentUniversityExamSubjectObtainMarks(List<StudentUniversityExamSubjectRequest> dto) {
        logger.info("Updating studentUniversityExamSubject obtain marks");
        try{
            for(StudentUniversityExamSubjectRequest req:dto){
                StudentUniversityExamSubject subject = studentUniversityExamSubjectRepository.findById(req.getStudentUniversityExamSubjectId()).orElseThrow(()->{
                    logger.error("StudentUniversityExamSubject not found | studentUniversityExamSubjectId = {}",req.getStudentUniversityExamSubjectId());
                    return new IllegalArgumentException("studentUniversityExamSubject not found");
                });
                subject.setObtainMarks(req.getObtainMarks());
                if(req.getObtainMarks()>=subject.getUniversityExamSubject().getPassingMarks()){
                    subject.setEarnedCredits(subject.getUniversityExamSubject().getSubject().getCredit());
                    subject.setResultStatus(ResultStatus.PASS);
                } else{
                    subject.setEarnedCredits(0);
                    subject.setResultStatus(ResultStatus.FAIL);
                }
                subject.setUpdatedAt(LocalDateTime.now());
                studentUniversityExamSubjectRepository.save(subject);
            }
            return "successfully update";
        } catch (Exception e) {
            logger.error("Failed to update studentUniversityExamSubject obtain marks",e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "universityExamResultOverview",allEntries = true)
    })
    public String generateUniversityExamResult(Long universityExamId) {
        logger.info("Generating universityExam result | universityExamId = {}",universityExamId);
        try{
            UniversityExam universityExam = universityExamRepository.findById(universityExamId).orElseThrow(()->{
                logger.error("UniversityExam not found | universityExamId = {}",universityExamId);
                return new IllegalArgumentException("UniversityExam not found");
            });

            universityExam.setGeneratedResult(true);
            universityExamRepository.save(universityExam);

            for(StudentUniversityExam studentUniversityExam:universityExam.getStudentUniversityExams()){
                int totalCradit = 0;
                int totalEarnedCradit=0;
                double totalMarks = 0;
                double totalObtainMarks = 0;
                boolean isPassed = true;
                for(StudentUniversityExamSubject subject:studentUniversityExam.getStudentUniversityExamSubjects()){
                    totalCradit += subject.getUniversityExamSubject().getSubject().getCredit();
                    totalEarnedCradit += subject.getEarnedCredits();
                    totalMarks += subject.getUniversityExamSubject().getMaxMarks();
                    totalObtainMarks +=subject.getObtainMarks();
                    if(subject.getResultStatus()!=ResultStatus.PASS){
                        isPassed=false;
                    }
                }
                studentUniversityExam.setTotalCredits(totalCradit);
                studentUniversityExam.setEarnedCredits(totalEarnedCradit);
                studentUniversityExam.setTotalMarks(totalMarks);
                studentUniversityExam.setTotalObtainMarks(totalObtainMarks);
                if(isPassed){
                    studentUniversityExam.setResultStatus(ResultStatus.PASS);
                } else{
                    studentUniversityExam.setResultStatus(ResultStatus.FAIL);
                }
                studentUniversityExamRepository.save(studentUniversityExam);
            }
            logger.info("Successfully generated universityExam result | universityExamId = {}",universityExamId);
            return "successfully generate";
        } catch (Exception e) {
            logger.error("Failed to generate universityExam result | universityExamId = {}",universityExamId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Cacheable(cacheNames = "universityExamResultOverview",key = "{#universityExamId,#pageNumber,#pageSize}")
    public UniversityExamResponse getUniversityExamResultOverview(Long universityExamId, int pageNumber, int pageSize) {
        logger.info("Fetching university-exam-result-overview | universityExamId = {}",universityExamId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize);

            UniversityExam universityExam = universityExamRepository.findById(universityExamId).orElseThrow(()->{
                logger.error("UniversityExam not found | univeristyExamId = {}",universityExamId);
                return new IllegalArgumentException("UniversityExam not found");
            });
            UniversityExamResponse response = modelMapper.map(universityExam,UniversityExamResponse.class);

            int totalPassedStudent = universityExam.getStudentUniversityExams().stream()
                            .filter(studentUniversityExam -> Objects.equals(studentUniversityExam.getResultStatus(),ResultStatus.PASS))
                                    .toList().size();
            int totalFailedStudent = universityExam.getStudentUniversityExams().stream()
                            .filter(studentUniversityExam -> Objects.equals(studentUniversityExam.getResultStatus(),ResultStatus.FAIL))
                                    .toList().size();

            Page<StudentUniversityExam> studentUniversityExams = studentUniversityExamRepository.findByUniversityExamId(universityExamId,pageable);
            Page<StudentUniversityExamResponse> studentUniversityExamResponses = studentUniversityExams.map(studentUniversityExam -> {
                StudentUniversityExamResponse res = modelMapper.map(studentUniversityExam, StudentUniversityExamResponse.class);
                res.setTotalSubjects(studentUniversityExam.getStudentUniversityExamSubjects().size());
                StudentResponse studentResponse = modelMapper.map(studentUniversityExam.getStudent(),StudentResponse.class);
                res.setStudentResponse(studentResponse);
                return res;
            });

            response.setTotalStudents(universityExam.getStudentUniversityExams().size());
            response.setTotalPassedStudent(totalPassedStudent);
            response.setTotalFailedStudent(totalFailedStudent);
            response.setStudentUniversityExamResponse(studentUniversityExamResponses);
            logger.info("Successfully fetched university-exam-result-overview | universityExamId = {}",universityExamId);
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched university-exam-result-overview | universityExamId = {}",universityExamId,e);
            throw new RuntimeException(e);
        }
    }
}
