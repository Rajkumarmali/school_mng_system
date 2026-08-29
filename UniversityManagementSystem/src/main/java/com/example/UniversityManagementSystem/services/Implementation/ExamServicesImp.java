package com.example.UniversityManagementSystem.services.Implementation;

import com.example.UniversityManagementSystem.dto.exam.*;
import com.example.UniversityManagementSystem.entity.*;
import com.example.UniversityManagementSystem.entity.type.ExamStatus;
import com.example.UniversityManagementSystem.entity.type.QuestionType;
import com.example.UniversityManagementSystem.entity.type.StudentExamStatus;
import com.example.UniversityManagementSystem.repository.*;
import com.example.UniversityManagementSystem.services.ExamServices;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ExamServicesImp implements ExamServices {

    private final Logger logger = LoggerFactory.getLogger(ExamServicesImp.class);
    private final ModelMapper modelMapper = new ModelMapper();

    private final SectionSubjectRepository sectionSubjectRepository;
    private final ExamRepository examRepository;
    private final StudentExamRepository studentExamRepository;
    private final ExamQuestionRepository examQuestionRepository;
    private final ExamQuestionOptionRepository examQuestionOptionRepository;
    private final StudentExamAnswerRepository studentExamAnswerRepository;

    public ExamServicesImp(SectionSubjectRepository sectionSubjectRepository,
                           ExamRepository examRepository,
                           StudentExamRepository studentExamRepository,
                           ExamQuestionRepository examQuestionRepository,
                           ExamQuestionOptionRepository examQuestionOptionRepository,
                           StudentExamAnswerRepository studentExamAnswerRepository) {
        this.sectionSubjectRepository = sectionSubjectRepository;
        this.examRepository = examRepository;
        this.studentExamRepository = studentExamRepository;
        this.examQuestionRepository = examQuestionRepository;
        this.examQuestionOptionRepository = examQuestionOptionRepository;
        this.studentExamAnswerRepository = studentExamAnswerRepository;
    }


    private void createExamQuestionOption(ExamQuestion examQuestion, List<ExamQuestionOptionRequest> examQuestionOptionRequests) {
        List<ExamQuestionOption> examQuestionOptions = new ArrayList<>();
        for(ExamQuestionOptionRequest examQuestionOptionRequest:examQuestionOptionRequests){
              ExamQuestionOption examQuestionOption = new ExamQuestionOption();
              examQuestionOption.setOptionText(examQuestionOptionRequest.getOptionText());
              examQuestionOption.setIsTrue(examQuestionOptionRequest.getIsTrue());
              examQuestionOption.setExamQuestion(examQuestion);

              examQuestionOptions.add(examQuestionOption);
        }
        examQuestionOptionRepository.saveAll(examQuestionOptions);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('HOD','TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "exams",allEntries = true),
            @CacheEvict(cacheNames = "studentExams",allEntries = true),
            @CacheEvict(cacheNames = "sectionSubjectExams",allEntries = true),
            @CacheEvict(cacheNames = "studentExamOverview",allEntries = true)
    })
    public String createExam(List<ExamRequest> dto) {
        logger.info("Creating exam");
        try{
            for(ExamRequest examRequest:dto){
                Exam exam = modelMapper.map(examRequest,Exam.class);
                exam.setShowQuestionToStudent(false);
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
    @PreAuthorize("hasAnyRole('HOD','TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "exams",allEntries = true),
            @CacheEvict(cacheNames = "exam",key = "#examId"),
            @CacheEvict(cacheNames = "studentExams",allEntries = true),
            @CacheEvict(cacheNames = "sectionSubjectExams",allEntries = true),
            @CacheEvict(cacheNames = "studentExamOverview",allEntries = true),
            @CacheEvict(cacheNames = "OnGoingStudentExams",allEntries = true),
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
    @PreAuthorize("hasAnyRole('TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "examQuestions",allEntries = true),
            @CacheEvict(cacheNames = "exam",key = "#examId")
    })
    public String updateExamToShowQuestionPaper(Long examId) {
        logger.info("Updating exam to show question paper to students | examId = {}",examId);
        try{
            Exam exam  = examRepository.findById(examId).orElseThrow(()->{
                 logger.error("Exam not found | examId = {}",examId);
                 throw new IllegalArgumentException("Exam not found");
            });
            exam.setShowQuestionToStudent(!exam.getShowQuestionToStudent());
            exam.setUpdatedAt(LocalDateTime.now());
            examRepository.save(exam);
            logger.info("Successfully update exam to show question paper to student | examId = {}",examId);
            return "Successfully update.";
        } catch (Exception e) {
            logger.error("Failed to update exam to show question paper to students | examId = {}",examId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN')")
    @Cacheable(cacheNames = "exams",key = "{#sectionId,#pageNumber,#pageSize}")
    public Page<ExamResponse> getExams(Long sectionId, int pageNumber, int pageSize) {
        logger.info("Fetching exams | sectionId = {}",sectionId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<Exam> exams = examRepository.findBySectionSubjectSectionId(sectionId,pageable);
            Page<ExamResponse> responses = exams.map(exam -> {
                ExamResponse res =  modelMapper.map(exam,ExamResponse.class);
                res.setSubjectResponse(modelMapper.map(exam.getSectionSubject().getSubject(), SubjectResponse.class));
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
    @PreAuthorize("hasAnyRole('TEACHER')")
    @Cacheable(cacheNames = "sectionSubjectExams",key = "{#sectionSubjectId,#pageNumber,#pageSize}")
    public Page<ExamResponse> getExamsBySectionSubjectId(Long sectionSubjectId, int pageNumber, int pageSize) {
        logger.info("Fetching exam by sectionSubjectId | sectionSubjectId = {}",sectionSubjectId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<Exam> exams = examRepository.findBySectionSubjectId(sectionSubjectId,pageable);

            Page<ExamResponse> responses = exams.map(exam -> {
                ExamResponse res =  modelMapper.map(exam,ExamResponse.class);
                res.setSubjectResponse(modelMapper.map(exam.getSectionSubject().getSubject(), SubjectResponse.class));
                return res;
            });
            logger.info("Successfully fetched exam by sectionSubjectId | sectionSubjectId = {} | returnedElement = {}",sectionSubjectId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e) {
            logger.error("Failed fetched exam by sectionSubjectId | sectionSubjectId = {}",sectionSubjectId,e);
            throw e;
        }

    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT')")
    @Cacheable(cacheNames = "studentExams",key = "{#userId,#pageNumber,#pageSize}")
    public Page<StudentExamResponse> getStudentExamsByUserId(Long userId, int pageNumber, int pageSize) {
        logger.info("Fetching StudentExam by userId | userId = {}",userId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<StudentExam> studentExams = studentExamRepository.findByStudentUserIdAndExamStatusNot(userId,ExamStatus.ONGOING, pageable);

            Page<StudentExamResponse> responses = studentExams.map(studentExam -> {
              StudentExamResponse res = modelMapper.map(studentExam,StudentExamResponse.class);
              ExamResponse examResponse = modelMapper.map(studentExam.getExam(),ExamResponse.class);
              examResponse.setSubjectResponse(modelMapper.map(studentExam.getExam().getSectionSubject().getSubject(),SubjectResponse.class));
              res.setExamResponse(examResponse);
              return res;
            });
            logger.info("Successfully fetched student exam | userId = {} | returnedElements = {}",userId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e) {
            logger.error("Failed to fetched Student exam by userId | userId = {}",userId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "OnGoingStudentExams",key = "{#userId,#pageNumber,#pageSize}")
    public Page<StudentExamResponse> getOnGoingStudentExams(Long userId, int pageNumber, int pageSize) {
        logger.info("Fetching ongoing student exam | userId = {}",userId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<StudentExam> studentExams = studentExamRepository.findByStudentUserIdAndExamStatus(userId,ExamStatus.ONGOING,pageable);

            Page<StudentExamResponse> responses = studentExams.map(studentExam -> {

               StudentExamResponse res = new StudentExamResponse();
               res.setId(studentExam.getId());
               ExamResponse examResponse = modelMapper.map(studentExam.getExam(),ExamResponse.class);
               examResponse.setSubjectResponse(modelMapper.map(studentExam.getExam().getSectionSubject().getSubject(),SubjectResponse.class));

               res.setExamResponse(examResponse);
               return res;
            });

            logger.info("Successfully fetched ongoing student exam | userId = {} | returnedElements = {}",userId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e){
            logger.error("Failed to fetched ongoing student exams | userId = {}",userId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT')")
    @Cacheable(cacheNames = "studentExamOverview",key = "#userId")
    public StudentExamOverviewResponse getStudentExamOverview(Long userId) {
        logger.info("Fetching student exam overview | userId = {}",userId);
        try{
            List<StudentExam> studentExams = studentExamRepository.findByStudentUserId(userId);
            StudentExamOverviewResponse response = new StudentExamOverviewResponse();
            response.setTotalExam(studentExams.size());

            double totalMarks = 0;
            double totalObtainMarks=0;
            int onGoingExam = 0;

            for(StudentExam studentExam:studentExams){
                if(studentExam.getObtainMarks()!=null){
                    totalMarks += studentExam.getExam().getMaxMarks();
                    totalObtainMarks += studentExam.getObtainMarks();
                }
                if(studentExam.getExam().getStatus() == ExamStatus.ONGOING)
                    onGoingExam++;
            }
            double avgMarks = (totalObtainMarks/totalMarks)*100;

            int upcomingExam = studentExams.stream()
                            .filter(se->se.getExam().getDate().isAfter(LocalDate.now()))
                                    .toList().size();

            response.setAvgMarks(avgMarks);
            response.setUpcomingExam(upcomingExam);
            response.setOnGoingExam(onGoingExam);

            logger.info("Successfully fetched student exam overview | userId = {}",userId);
            return response;
        } catch (Exception e){
           logger.error("Failed to fetched student exam overview | userId = {}",userId,e);
           throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT')")
    @Cacheable(cacheNames = "studentExam",key = "#studentExamId")
    public StudentExamResponse getStudentExamById(Long studentExamId) {
        logger.info("Fetching studentExam by studentExamId | studentExamId = {}",studentExamId);
        try{
            StudentExam studentExam = studentExamRepository.findById(studentExamId).orElseThrow(()->{
               logger.error("Student exam not found | studentExamId = {}",studentExamId);
               throw new IllegalArgumentException("Student exam not found");
            });
            int totalQuestion = studentExam.getExam().getExamQuestions().size();
            StudentExamResponse response = modelMapper.map(studentExam,StudentExamResponse.class);
            ExamResponse examResponse = modelMapper.map(studentExam.getExam(),ExamResponse.class);
            examResponse.setTotalQuestion(totalQuestion);
            examResponse.setSubjectResponse(modelMapper.map(studentExam.getExam().getSectionSubject().getSubject(),SubjectResponse.class));

            response.setExamResponse(examResponse);
            logger.info("Successfully fetched student exam by studentExamId = {}",studentExamId);
            return response;
        } catch (Exception e){
            logger.error("Failed to fetched studentExam by studentExamId | studentExamId = {}",studentExamId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('ADMIN','HOD','TEACHER','STUDENT')")
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
    @PreAuthorize("hasAnyRole('HOD','ADMIN','TEACHER')")
    @Cacheable(cacheNames = "studentExams",key = "{#examId,#pageNumber,#pageSize}")
    public Page<StudentExamResponse> getStudentExamsByExamId(Long examId, int pageNumber, int pageSize) {
        logger.info("Fetching student exams | examId = {}",examId);
        try{
            Pageable pageable = PageRequest.of(pageNumber,pageSize,Sort.by(Sort.Direction.DESC,"createdAt"));
            Page<StudentExam> studentExams = studentExamRepository.findByExamId(examId,pageable);

            Page<StudentExamResponse> responses = studentExams.map(studentExam -> {
                StudentExamResponse res =  modelMapper.map(studentExam,StudentExamResponse.class);
                res.setStudentResponse(modelMapper.map(studentExam.getStudent(), StudentResponse.class));
                return res;
            });
            return responses;
        } catch (Exception e){
            logger.error("Failed Fetched student exams | examId = {}",examId,e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentExams",allEntries = true),
    })
    public String updateStudentExamStatus(StudentExamRequest dto) {
        logger.info("Updating student exam status");
        try{

            StudentExam studentExam = studentExamRepository.findById(dto.getId()).orElseThrow(()->{
                logger.error("Student Exam not found | id = {}",dto.getId());
                throw new IllegalArgumentException("Student exam not found");
            });

            studentExam.setStatus(dto.getStatus());
            studentExam.setUpdatedAt(LocalDateTime.now());
            studentExamRepository.save(studentExam);

            logger.info("successfully update student exams");
            return "Successfully update ";
        } catch (Exception e){
            logger.error("Failed to update student exam",e);
            throw e;
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','ADMIN','TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentExams",allEntries = true),
    })
    public String updateStudentExamObtainMarks(List<StudentExamRequest> dto) {
        logger.info("Updating student exam marks");
        try{
            for(StudentExamRequest studentExamRequest:dto){
                StudentExam studentExam = studentExamRepository.findById(studentExamRequest.getId()).orElseThrow(()->{
                    logger.error("Student Exam not found | id = {}",studentExamRequest.getId());
                    throw new IllegalArgumentException("Student exam not found");
                });
                if(studentExam.getStatus()== StudentExamStatus.PRESENT)
                    studentExam.setObtainMarks(studentExamRequest.getObtainMarks());
                studentExam.setUpdatedAt(LocalDateTime.now());
                studentExamRepository.save(studentExam);
            }
            logger.info("successfully update student exams marks");
            return "Successfully update";
        } catch (Exception e){
            logger.error("Failed to update student exam marks",e);
            throw e;
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('TEACHER')")
    @Caching(evict = {
         @CacheEvict(cacheNames = "examQuestions",allEntries = true)
    })
    public String createExamQuestion(Long examId, ExamQuestionRequest dto) {
        logger.info("Creating exam question | examId = {}",examId);
        try{
            Exam exam = examRepository.findById(examId).orElseThrow(()->{
                logger.error("Exam not found | examId = {}",examId);
                throw new IllegalArgumentException("Exam not found");
            });

                ExamQuestion examQuestion = new ExamQuestion();
                examQuestion.setQuestion(dto.getQuestion());
                examQuestion.setType(dto.getType());
                examQuestion.setMarks(dto.getMarks());
                examQuestion.setExam(exam);
                examQuestion.setCreatedAt(LocalDateTime.now());

                ExamQuestion savedExamQuestion =  examQuestionRepository.save(examQuestion);
                logger.info("Question type = [{}]", dto.getType());
                if(dto.getType().equals(QuestionType.MCQ)
                        || dto.getType().equals(QuestionType.MSQ)
                        || dto.getType().equals(QuestionType.TRUE_FALSE)){
                    createExamQuestionOption(savedExamQuestion,dto.getExamQuestionOptionRequests());
                }
            logger.info("Successfully create exam question | examId = {}",examId);
            return "Successfully create exam questions";
        } catch (Exception e){
            logger.error("Failed to create exam question | examId = {}",examId,e);
            throw e;
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "examQuestions",allEntries = true)
    })
    public String updateExamQuestion(Long examQuestionId, ExamQuestionRequest dto) {
        logger.info("Updating question | exam-questionId = {}",examQuestionId);
        try{
            ExamQuestion examQuestion = examQuestionRepository.findById(examQuestionId).orElseThrow(()->{
                logger.error("Exam question not found | exam-questionId = {}",examQuestionId);
                throw new IllegalArgumentException("Exam question not found");
            });

            examQuestion.setQuestion(dto.getQuestion());
            examQuestion.setType(dto.getType());
            examQuestion.setMarks(dto.getMarks());
            examQuestion.setUpdatedAt(LocalDateTime.now());

            if(dto.getType().equals(QuestionType.MSQ) || dto.getType().equals(QuestionType.MCQ) || dto.getType().equals(QuestionType.TRUE_FALSE)){
               examQuestion.getQuestionOptions().clear();
               if(dto.getExamQuestionOptionRequests()!=null){
                   for(ExamQuestionOptionRequest option:dto.getExamQuestionOptionRequests()){
                       ExamQuestionOption examQuestionOption = new ExamQuestionOption();
                       examQuestionOption.setOptionText(option.getOptionText());
                       examQuestionOption.setIsTrue(option.getIsTrue());
                       examQuestionOption.setExamQuestion(examQuestion);

                       examQuestion.getQuestionOptions().add(examQuestionOption);
                   }
               }
            } else{
                examQuestion.getQuestionOptions().clear();
            }
            examQuestionRepository.save(examQuestion);
            logger.info("Successfully update exam question");
            return "Successfully update exam question";
        } catch (Exception e){
          logger.error("Failed to update question | exam-questionId = {}",examQuestionId,e);
          throw e;
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "examQuestions",allEntries = true)
    })
    public String deleteExamQuestion(Long examQuestionId) {
         logger.info("Delete the exam question | exam-questionId = {}",examQuestionId);
         try{
             ExamQuestion examQuestion  = examQuestionRepository.findById(examQuestionId).orElseThrow(()->{
                 logger.error("Question not found | exam-questionId = {}",examQuestionId);
                 throw new IllegalArgumentException("Question not found");
             });
             examQuestionRepository.delete(examQuestion);
             logger.info("Successfully delete question | exam-questionId = {}",examQuestionId);
             return "Question delete successfully";
         } catch (Exception e) {
             logger.error("Failed to delete exam question | exam-questionId = {}",examQuestionId,e);
             throw e;
         }
    }

    @Override
    @PreAuthorize("hasAnyRole('HOD','TEACHER','STUDENT')")
    @Cacheable(cacheNames = "examQuestions", key = "{#examId,#pageNumber,#pageSize} + ':' + T(org.springframework.security.core.context.SecurityContextHolder).getContext().getAuthentication().getAuthorities()")
    public Page<ExamQuestionResponse> getExamQuestions(Long examId, int pageNumber, int pageSize) {
        logger.info("Fetching exam questions | examId = {}",examId);
        try {
            Exam exam = examRepository.findById(examId).orElseThrow(()->{
                logger.error("Exam not found | examId = {}",examId);
                throw new IllegalArgumentException("Exam not found");
            });

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Set<String> roles = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            boolean canViewHiddenQuestions = roles.contains("ROLE_TEACHER") || roles.contains("ROLE_HOD");

            if(!canViewHiddenQuestions && !exam.getShowQuestionToStudent()){
                logger.info("Questions are hidden for students | examId = {}", examId);
                return Page.empty();
            }
            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<ExamQuestion> examQuestions = examQuestionRepository.findByExamId(examId,pageable);

            Page<ExamQuestionResponse> responses = examQuestions.map(examQuestion -> {
                ExamQuestionResponse res =new ExamQuestionResponse();
                res.setId(examQuestion.getId());
                res.setQuestion(examQuestion.getQuestion());
                res.setType(examQuestion.getType());
                res.setMarks(examQuestion.getMarks());
                if(examQuestion.getType().equals(QuestionType.MCQ)
                        || examQuestion.getType().equals(QuestionType.MSQ)
                        || examQuestion.getType().equals(QuestionType.TRUE_FALSE)){
                    List<ExamQuestionOptionResponse> options =  examQuestion.getQuestionOptions()
                            .stream()
                            .map(option->{
                                ExamQuestionOptionResponse optionResponse = new ExamQuestionOptionResponse();
                                optionResponse.setId(option.getId());
                                optionResponse.setOptionText(option.getOptionText());
                                if(canViewHiddenQuestions){
                                    optionResponse.setIsTrue(option.getIsTrue());
                                }
                                return optionResponse;
                            }).toList();
                    res.setExamQuestionOptionResponses(options);
                }
                return res;
            });
            logger.info("Successfully fetched exam questions | examId = {} | returnedElement = {}",examId,responses.getNumberOfElements());
            return responses;
        } catch (Exception e){
            logger.error("Failed to fetched exam questions | examId = {}",examId,e);
            throw e;
        }
    }



    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "studentExamQuestions",key = "{#studentExamId}")
    public List<ExamQuestionResponse> getStudentExamQuestions(Long studentExamId) {
       logger.info("Fetching student exam questions | studentExamId= {}",studentExamId);
       try{

           StudentExam studentExam = studentExamRepository.findById(studentExamId).orElseThrow(()->{
               logger.error("Student exam not found | studentExamId = {}",studentExamId);
               throw new IllegalArgumentException("Student exam not found");
           });

           List<ExamQuestion> examQuestions = examQuestionRepository.findByExamId(studentExam.getExam().getId());
           List<ExamQuestionResponse> responses = examQuestions.stream().map(examQuestion->{
               ExamQuestionResponse res = modelMapper.map(examQuestion,ExamQuestionResponse.class);
               List<ExamQuestionOptionResponse> examQuestionOptionResponses = examQuestion.getQuestionOptions()
                       .stream().map(option->{
                           ExamQuestionOptionResponse examQuestionOptionResponse =new ExamQuestionOptionResponse();
                           examQuestionOptionResponse.setId(option.getId());
                           examQuestionOptionResponse.setOptionText(option.getOptionText());
                           return examQuestionOptionResponse;
                       }).toList();

               List<StudentExamAnswer> studentExamAnswers = studentExamAnswerRepository.findByQuestionIdAndStudentExamId(examQuestion.getId(),studentExamId);

               List<StudentExamAnswerResponse> studentExamAnswerResponses = studentExamAnswers.
                       stream().map(answer->{
                          StudentExamAnswerResponse studentExamAnswerResponse = modelMapper.map(answer,StudentExamAnswerResponse.class);
                          return studentExamAnswerResponse;
                       }).toList();

               res.setExamQuestionOptionResponses(examQuestionOptionResponses);
               res.setStudentExamAnswerResponses(studentExamAnswerResponses);
               return res;
           }).toList();
           logger.info("Successfully fetched student exam questions | studentExamId = {} | returnedElements = {}",studentExamId,responses.size());
           return responses;
       } catch (Exception e){
           logger.error("Failed to fetched student exam questions | studentExamId = {}",studentExamId,e);
           throw e;
       }
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('STUDENT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentExamQuestions",allEntries = true)
    })
    public String saveStudentAnswer(StudentExamAnswerRequest dto) {
        try{
            ExamQuestion question = examQuestionRepository.findById(dto.getQuestionId()).orElseThrow(()->{
                throw new IllegalArgumentException("Question not found");
            });
            if(question.getType()==QuestionType.MCQ){
                StudentExamAnswer studentExamAnswer = studentExamAnswerRepository.findByStudentExamIdAndQuestionId(dto.getStudentExamId(),dto.getQuestionId());
                if(studentExamAnswer!=null){
                    ExamQuestionOption option = examQuestionOptionRepository.findById(dto.getSelectedOptionId()).orElseThrow(()->{
                        throw new IllegalArgumentException("Option not found");
                    });
                    studentExamAnswer.setSelectedOption(option);
                    studentExamAnswer.setIsMarkedForReview(false);
                    studentExamAnswer.setIsAnswered(true);
                    studentExamAnswer.setUpdatedAt(LocalDateTime.now());
                    studentExamAnswerRepository.save(studentExamAnswer);
                } else{
                    ExamQuestionOption option = examQuestionOptionRepository.findById(dto.getSelectedOptionId()).orElseThrow(()->{
                        throw new IllegalArgumentException("Option not found");
                    });
                    StudentExam studentExam = studentExamRepository.findById(dto.getStudentExamId()).orElseThrow(()->{
                       throw new IllegalArgumentException("Student exam not found");
                    });
                    studentExamAnswer = new StudentExamAnswer();
                    studentExamAnswer.setQuestion(question);
                    studentExamAnswer.setSelectedOption(option);
                    studentExamAnswer.setStudentExam(studentExam);
                    studentExamAnswer.setIsAnswered(true);
                    studentExamAnswer.setIsMarkedForReview(false);
                    studentExamAnswer.setCreatedAt(LocalDateTime.now());
                    studentExamAnswerRepository.save(studentExamAnswer);
                }
            } else if (question.getType() == QuestionType.MSQ){
                StudentExamAnswer studentExamAnswer = studentExamAnswerRepository.findByQuestionIdAndSelectedOptionIdAndStudentExamId(dto.getQuestionId(),
                       dto.getSelectedOptionId(),dto.getStudentExamId());
                if(studentExamAnswer!=null){
                    studentExamAnswerRepository.delete(studentExamAnswer);
                } else {
                    ExamQuestionOption option = examQuestionOptionRepository.findById(dto.getSelectedOptionId()).orElseThrow(() -> {
                        throw new IllegalArgumentException("Option not found");
                    });
                    StudentExam studentExam = studentExamRepository.findById(dto.getStudentExamId()).orElseThrow(() -> {
                        throw new IllegalArgumentException("Student exam not found");
                    });
                    studentExamAnswer = new StudentExamAnswer();
                    studentExamAnswer.setQuestion(question);
                    studentExamAnswer.setSelectedOption(option);
                    studentExamAnswer.setStudentExam(studentExam);
                    studentExamAnswer.setIsAnswered(true);
                    studentExamAnswer.setIsMarkedForReview(false);
                    studentExamAnswer.setCreatedAt(LocalDateTime.now());
                    studentExamAnswerRepository.save(studentExamAnswer);
                }
            }
            return "successfully save answer";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentExamQuestions",allEntries = true)
    })
    public String updateReviewQuestion(Long studentExamId, Long questionId) {
        try{
            List<StudentExamAnswer> studentExamAnswers = studentExamAnswerRepository
                    .findByQuestionIdAndStudentExamId(questionId,studentExamId);
            if(studentExamAnswers.size()!=0){
                for(StudentExamAnswer answer:studentExamAnswers){
                    answer.setIsMarkedForReview(!answer.getIsMarkedForReview());
                    studentExamAnswerRepository.save(answer);
                }
            } else{
                ExamQuestion question = examQuestionRepository.findById(questionId).orElseThrow(()->{
                    throw new IllegalArgumentException("Question not found");
                });
                StudentExam studentExam = studentExamRepository.findById(studentExamId).orElseThrow(() -> {
                    throw new IllegalArgumentException("Student exam not found");
                });

                StudentExamAnswer studentExamAnswer = new StudentExamAnswer();
                studentExamAnswer.setQuestion(question);
                studentExamAnswer.setStudentExam(studentExam);
                studentExamAnswer.setIsMarkedForReview(true);
                studentExamAnswer.setIsAnswered(false);
                studentExamAnswer.setCreatedAt(LocalDateTime.now());
                studentExamAnswerRepository.save(studentExamAnswer);
            }
            return "Successfully update";
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentExamQuestions",allEntries = true)
    })
    public String clearStudentAnswer(Long studentExamId, Long questionId) {
        try{
            List<StudentExamAnswer> studentExamAnswers = studentExamAnswerRepository
                    .findByQuestionIdAndStudentExamId(questionId,studentExamId);
            studentExamAnswerRepository.deleteAll(studentExamAnswers);
            return "Successfully clear answer";
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentExam",key = "#studentExamId"),
            @CacheEvict(cacheNames = "studentExam",key = "#studentExamId")
    })
    public String submitExam(Long studentExamId) {
        logger.info("Submitting... studentExam | studentExamId = {}",studentExamId);
        try {
            StudentExam studentExam = studentExamRepository.findById(studentExamId).orElseThrow(()->{
                logger.error("StudentExam not found | studentExamId = {}",studentExamId);
                throw new IllegalArgumentException("StudentExam not found");
            });
            studentExam.setStatus(StudentExamStatus.PRESENT);
            studentExam.setUpdatedAt(LocalDateTime.now());
            studentExamRepository.save(studentExam);
            logger.info("Successfully submitted studentExam | studentExamId = {}",studentExamId);
            return "Successfully submitted studentExam";
        } catch (Exception e){
         logger.error("failed to  submit studentExam | studentExamId = {}",studentExamId,e);
         throw e;
        }
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Cacheable(cacheNames = "submitStudentExamDetail",key = "#studentExamId")
    public SubmitStudentExamResponse getSubmitStudentExamDetails(Long studentExamId) {
       logger.info("Fetching submit studentExam Details | studentExamId = {}", studentExamId);
       try{

           List<StudentExamAnswer> studentExamAnswers = studentExamAnswerRepository.findByStudentExamId(studentExamId);

           int totalQuestions = (int) studentExamAnswers.stream()
                   .map(answer->answer.getQuestion().getId())
                   .distinct()
                   .count();

           int answeredQuestions = (int) studentExamAnswers.stream()
                   .filter(answer->Boolean.TRUE.equals(answer.getIsAnswered()))
                   .map(answer->answer.getQuestion().getId())
                   .distinct()
                   .count();

           int markedForReviewQuestions = (int) studentExamAnswers.stream()
                   .filter(answer->Boolean.TRUE.equals(answer.getIsMarkedForReview()))
                   .map(answer->answer.getQuestion().getId())
                   .distinct()
                   .count();

           SubmitStudentExamResponse response = new SubmitStudentExamResponse();
           response.setTotalQuestions(totalQuestions);
           response.setAnsweredQuestions(answeredQuestions);
           response.setMarkedForReviewQuestions(markedForReviewQuestions);
           return response;
       } catch (Exception e) {
           logger.error("Failed to fetched submit studentExam details | studentExamId = {}", studentExamId,e);
           throw new RuntimeException(e);
       }
    }

}
