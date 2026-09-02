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
import java.util.*;
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
    private final SelectedOptionsRepository selectedOptionsRepository;

    public ExamServicesImp(SectionSubjectRepository sectionSubjectRepository,
                           ExamRepository examRepository,
                           StudentExamRepository studentExamRepository,
                           ExamQuestionRepository examQuestionRepository,
                           ExamQuestionOptionRepository examQuestionOptionRepository,
                           StudentExamAnswerRepository studentExamAnswerRepository,
                           SelectedOptionsRepository selectedOptionsRepository) {
        this.sectionSubjectRepository = sectionSubjectRepository;
        this.examRepository = examRepository;
        this.studentExamRepository = studentExamRepository;
        this.examQuestionRepository = examQuestionRepository;
        this.examQuestionOptionRepository = examQuestionOptionRepository;
        this.studentExamAnswerRepository = studentExamAnswerRepository;
        this.selectedOptionsRepository = selectedOptionsRepository;
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

    private static double checkAnswer(ExamQuestion question,StudentExamAnswer answer){

        if(question.getType().equals(QuestionType.NUMERICAL)){
            if(answer.getAnswer()==null){
                return 0.0;
            } else if (answer.getAnswer().equals(question.getCorrectAnswer()))
               return question.getMarks();
             else
                return question.getNegativeMarks()*(-1.0);
        }

        List<ExamQuestionOption> examQuestionOptions = question.getQuestionOptions();
        List<SelectedOptions> selectedOptions = answer.getSelectedOptions();
        if(selectedOptions==null || selectedOptions.isEmpty()){
            return 0.0;
        }
        int totalCorrectOptions =(int) examQuestionOptions.stream()
                .filter(option-> option.getIsTrue().equals(true))
                .count();

        int totalSelectedCorrectOption=0;
        for(SelectedOptions selectedOptions1:selectedOptions){
            boolean isCorrect = examQuestionOptions.stream()
                    .anyMatch(option -> Objects.equals(option.getId(), selectedOptions1.getExamQuestionOption().getId())
                            && Boolean.TRUE.equals(option.getIsTrue()));
            if(isCorrect)
                totalSelectedCorrectOption++;
            else
                return question.getNegativeMarks()*(-1.00);
        }
        return ((double) totalSelectedCorrectOption/totalCorrectOptions)*((double)question.getMarks());
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

                SectionSubject sectionSubject = sectionSubjectRepository.findById(examRequest.getSectionSubjectId()).orElseThrow(()->{
                    logger.error("Section subject not found | sectionSubjectId = {}",examRequest.getSectionSubjectId());
                    return new IllegalArgumentException("Section subject not found");
                });

                Exam exam = modelMapper.map(examRequest,Exam.class);
                exam.setShowQuestionToStudent(false);
                exam.setGeneratedResult(false);
                exam.setShowResult(false);
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
            @CacheEvict(cacheNames = "exam",key = "#examId"),
            @CacheEvict(cacheNames = "studentExamResult",allEntries = true)
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
    @PreAuthorize("hasAnyRole('TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "exam",key = "#examId"),
            @CacheEvict(cacheNames = "studentExams",allEntries = true),
            @CacheEvict(cacheNames = "studentExamOverview",allEntries = true),
            @CacheEvict(cacheNames = "studentExamResult",allEntries = true)
    })
    public String updateExamToShowResult(Long examId) {
        logger.info("Updating exam to show result | examId = {}",examId);
        try{
            Exam exam = examRepository.findById(examId).orElseThrow(()->{
                logger.error("exam not found | examId = {}",examId);
                throw new IllegalArgumentException("Exam not found");
            });
            exam.setShowResult(!exam.getShowResult());
            examRepository.save(exam);
            logger.info("Successfully update exam to show result | examId = {}",examId);
            return "Successfully update";
        } catch (Exception e) {
            logger.error("Failed to update exam to show result | examId = {}",examId,e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('TEACHER')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "exam",key = "#examId"),
            @CacheEvict(cacheNames = "studentExams",allEntries = true),
            @CacheEvict(cacheNames = "examResultOverview",key = "#examId"),
    })
    public String generateExamResult(Long examId) {
        logger.info("Generating exam result | examId = {}",examId);
        try{
            Exam exam = examRepository.findById(examId).orElseThrow(()->{
                logger.error("Exam not found | examId = {}",examId);
                throw new IllegalArgumentException("Exam not found");
            });
            if(exam.getGeneratedResult()!=null && exam.getGeneratedResult()){
                return "already generated";
            }
            List<StudentExam> studentExams = exam.getStudentExams();
            for(StudentExam studentExam:studentExams){
                List<StudentExamAnswer> studentExamAnswers = new ArrayList<>();
                for(StudentExamAnswer answer:studentExam.getStudentExamAnswers()){
                    ExamQuestion examQuestion = answer.getQuestion();

                    double marks = checkAnswer(examQuestion,answer);
                    answer.setObtainMarks(marks);
                    answer.setUpdatedAt(LocalDateTime.now());
                    studentExamAnswers.add(answer);
                }
                studentExamAnswerRepository.saveAll(studentExamAnswers);
                if(studentExam.getStatus()==null){
                    studentExam.setStatus(StudentExamStatus.ABSENT);
                } else if (studentExam.getStatus()==StudentExamStatus.PRESENT){
                    double totalObtainMarks = studentExamAnswers.stream()
                                    .mapToDouble(StudentExamAnswer::getObtainMarks)
                                            .sum();
                    studentExam.setObtainMarks(totalObtainMarks);
                    studentExamRepository.save(studentExam);
                }
            }
            exam.setGeneratedResult(true);
            examRepository.save(exam);
            logger.info("Successfully generate exam result | examId = {}",examId);
            return "Successfully generate exam result";
        } catch (Exception e) {
            logger.error("Failed to generate exam result | examId = {}",examId);
            throw new RuntimeException(e);
        }

    }


    @Override
    @Cacheable(cacheNames = "examResultOverview",key = "#examId")
    public ExamResultOverviewResponse getExamResultOverview(Long examId) {
        logger.info("Fetching exam result review | examId = {}",examId);
        try{

            List<StudentExam> studentExams = studentExamRepository.findByExamId(examId,Sort.by(Sort.Direction.DESC,"obtainMarks"));

            int totalStudents = studentExams.size();

            int totalAppearedStudents = studentExams.stream()
                    .filter(se->se.getStatus()==StudentExamStatus.PRESENT)
                    .toList().size();

            int totalPassedStudents = studentExams.stream()
                    .filter(se->se.getStatus()==StudentExamStatus.PRESENT
                            && se.getObtainMarks()!=null
                            && se.getObtainMarks()>=se.getExam().getPassingMarks())
                    .toList()
                    .size();

            int totalFailedStudents = studentExams.stream()
                    .filter(se->se.getStatus()==StudentExamStatus.PRESENT
                            && se.getObtainMarks()!=null
                            && se.getObtainMarks()<se.getExam().getPassingMarks())
                    .toList()
                    .size();

            double totalObtainMarks = studentExams.stream()
                    .filter(se->se.getStatus()==StudentExamStatus.PRESENT
                            && se.getObtainMarks()!=null)
                    .mapToDouble(StudentExam::getObtainMarks)
                    .sum();

            double agvMarks = totalObtainMarks!=0 ? totalObtainMarks/totalAppearedStudents :0 ;

            List<StudentExam> topPerformanceStudents = studentExams.stream()
                    .filter(se->se.getStatus()==StudentExamStatus.PRESENT
                            && se.getObtainMarks()!=null
                            && se.getObtainMarks()>=se.getExam().getPassingMarks())
                    .limit(3)
                    .toList();

            List<Map<String,Object>> topPerformanceStudentsResponse = new ArrayList<>();

            for(StudentExam studentExam:topPerformanceStudents){
                Map<String,Object> topPerformanceStudentRes = new HashMap<>();
                topPerformanceStudentRes.put("name",studentExam.getStudent().getFirstName()+" "+studentExam.getStudent().getLastName());
                topPerformanceStudentRes.put("rollNumber",studentExam.getStudent().getRollNumber());
                topPerformanceStudentRes.put("obtainMarks",studentExam.getObtainMarks());

                topPerformanceStudentsResponse.add(topPerformanceStudentRes);
            }

            ExamResultOverviewResponse response = new ExamResultOverviewResponse();
            response.setTotalStudent(totalStudents);
            response.setTotalAppearedStudent(totalAppearedStudents);
            response.setTotalPassedStudent(totalPassedStudents);
            response.setTotalFiledStudent(totalFailedStudents);
            response.setAvgMarks(agvMarks);
            response.setTopPerformanceStudents(topPerformanceStudentsResponse);

            logger.info("Successfully fetched exam result review | examId = {}",examId);
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched exam result review | examId = {}",examId,e);
            throw new RuntimeException(e);
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
              StudentExamResponse res =new StudentExamResponse();
              res.setId(studentExam.getId());
              res.setStatus(studentExam.getStatus());
              if(studentExam.getExam().getShowResult()){
                  res.setObtainMarks(studentExam.getObtainMarks());
              }
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
    @PreAuthorize("hasAnyRole('TEACHER','STUDENT')")
    @Cacheable(cacheNames = "studentExamResult", key = "{#studentExamId,#pageNumber,#pageSize} + ':' + T(org.springframework.security.core.context.SecurityContextHolder).getContext().getAuthentication().getAuthorities()")
    public StudentExamResultResponse getStudentExamResult(Long studentExamId, int pageNumber, int pageSize) {
        logger.info("Fetching student exam result | studentExamId = {}",studentExamId);
        try{

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Set<String> roles = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            StudentExam studentExam = studentExamRepository.findById(studentExamId).orElseThrow(()->{
                logger.error("Student Exam not found | studentExamId = {}",studentExamId);
                throw new IllegalArgumentException("Student Exam not found");
            });
            boolean isView = roles.contains("ROLE_TEACHER") || roles.contains("ROLE_HOD");

            if(!isView &&  !studentExam.getExam().getShowQuestionToStudent()){
                logger.info("Questions are hidden for students | StudentExamId = {}", studentExamId);
                return null;
            }

            Student student = studentExam.getStudent();

            Pageable pageable = PageRequest.of(pageNumber,pageSize);
            Page<ExamQuestion> examQuestions = examQuestionRepository.findByExamId(studentExam.getExam().getId(),pageable);

            Page<ExamQuestionResponse> examQuestionResponses = examQuestions
                    .map(question->{
                       ExamQuestionResponse res = modelMapper.map(question,ExamQuestionResponse.class);
                       if(!isView && !studentExam.getExam().getShowResult()){
                           res.setCorrectAnswer(null);
                       }
                       List<ExamQuestionOptionResponse> questionOptionResponses = question.getQuestionOptions()
                               .stream()
                               .map(option->{
                                   ExamQuestionOptionResponse optionResponse = modelMapper.map(option,ExamQuestionOptionResponse.class);
                                   if(!isView && !studentExam.getExam().getShowResult())
                                       optionResponse.setIsTrue(null);
                                   return optionResponse;
                               }).toList();

                           StudentExamAnswer questionAnswer= studentExamAnswerRepository.findByStudentExamIdAndQuestionId(studentExamId,question.getId());
                           if(questionAnswer!=null){
                               StudentExamAnswerResponse answerResponse = new StudentExamAnswerResponse();
                               answerResponse.setId(questionAnswer.getId());
                               if((isView || studentExam.getExam().getShowResult())
                                       && questionAnswer.getObtainMarks()!=null)
                                           answerResponse.setObtainMarks(questionAnswer.getObtainMarks());

                               if(questionAnswer.getAnswer()!=null)
                                   answerResponse.setAnswer(questionAnswer.getAnswer());

                               List<SelectedOptions> selectedOptions = questionAnswer.getSelectedOptions();

                               List<Map<String,Object>> optionsResponse  = new ArrayList<>();
                               if(selectedOptions!=null){
                                   for(SelectedOptions option:selectedOptions){
                                       Map<String,Object> selectedOption = new HashMap<>();
                                       selectedOption.put("id",option.getExamQuestionOption().getId());
                                       if(isView || studentExam.getExam().getShowResult()){
                                           selectedOption.put("isCorrect",option.getExamQuestionOption().getIsTrue());
                                       }
                                       optionsResponse.add(selectedOption);
                                   }
                               }
                               answerResponse.setSelectedOptions(optionsResponse);
                               res.setStudentExamAnswerResponses(answerResponse);
                           }


                       res.setExamQuestionOptionResponses(questionOptionResponses);
                       return res;
                    });

            StudentExamResultResponse response = new StudentExamResultResponse();
            response.setStudentName(student.getFirstName()+" "+student.getLastName());
            response.setRollNumber(student.getRollNumber());
            response.setRegistrationNumber(student.getRegistrationNumber());

            response.setTotalMarks((double)studentExam.getExam().getMaxMarks());
            if(studentExam.getObtainMarks()!=null)
             response.setTotalObtainMarks((double)studentExam.getObtainMarks());

            response.setExamQuestionResponses(examQuestionResponses);

            logger.info("Successfully fetched student exam result | studentExamId = {}",studentExamId);
            return response;
        } catch (Exception e) {
            logger.error("Failed to fetched student exam result | studentExamId = {}",studentExamId,e);
            throw new RuntimeException(e);
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
                if(studentExam.getObtainMarks()!=null && studentExam.getExam().getShowResult()){
                    totalMarks += studentExam.getExam().getMaxMarks();
                    totalObtainMarks += studentExam.getObtainMarks();
                }
                if(studentExam.getExam().getStatus() == ExamStatus.ONGOING)
                    onGoingExam++;
            }

            double avgMarks = (totalObtainMarks/totalMarks)*100;
            avgMarks = Math.round(avgMarks*100.00)/100.00;

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
            if(!studentExam.getExam().getShowResult())
              response.setObtainMarks(null);
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
            @CacheEvict(cacheNames = "examResultOverview",allEntries = true),
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
            @CacheEvict(cacheNames = "examResultOverview",allEntries = true),
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
                examQuestion.setNegativeMarks(dto.getNegativeMarks());
                examQuestion.setExam(exam);
                if(dto.getType().equals(QuestionType.NUMERICAL)){
                    examQuestion.setCorrectAnswer(dto.getCorrectAnswer());
                }
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
            examQuestion.setNegativeMarks(dto.getNegativeMarks());
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
            } else if(dto.getType().equals(QuestionType.NUMERICAL)){
                examQuestion.setCorrectAnswer(dto.getCorrectAnswer());
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
                res.setCorrectAnswer(examQuestion.getCorrectAnswer());
                res.setNegativeMarks(examQuestion.getNegativeMarks());
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
               res.setCorrectAnswer(null);
               List<ExamQuestionOptionResponse> examQuestionOptionResponses = examQuestion.getQuestionOptions()
                       .stream().map(option->{
                           ExamQuestionOptionResponse examQuestionOptionResponse =new ExamQuestionOptionResponse();
                           examQuestionOptionResponse.setId(option.getId());
                           examQuestionOptionResponse.setOptionText(option.getOptionText());
                           return examQuestionOptionResponse;
                       }).toList();

               StudentExamAnswer studentExamAnswer = studentExamAnswerRepository.findByQuestionIdAndStudentExamId(examQuestion.getId(),studentExamId);
               if(studentExamAnswer!=null) {

                   StudentExamAnswerResponse studentExamAnswerResponse = new StudentExamAnswerResponse();
                   studentExamAnswerResponse.setId(studentExamAnswer.getId());
                   studentExamAnswerResponse.setIsAnswered(studentExamAnswer.getIsAnswered());
                   studentExamAnswerResponse.setIsMarkedForReview(studentExamAnswer.getIsMarkedForReview());
                   if(examQuestion.getType().equals(QuestionType.NUMERICAL)){
                       studentExamAnswerResponse.setAnswer(studentExamAnswer.getAnswer());
                   }

                   List<SelectedOptions> selectedOptions = studentExamAnswer.getSelectedOptions();

                   List<Map<String,Object>> optionsResponse  = new ArrayList<>();

                   if(selectedOptions!=null){
                       for(SelectedOptions options:selectedOptions){
                           Map<String,Object> option = new HashMap<>();
                           option.put("id",options.getExamQuestionOption().getId());

                           optionsResponse.add(option);
                       }
                   }
                   studentExamAnswerResponse.setSelectedOptions(optionsResponse);
                   res.setStudentExamAnswerResponses(studentExamAnswerResponse);
               }

               res.setExamQuestionOptionResponses(examQuestionOptionResponses);
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

            StudentExam studentExam = studentExamRepository.findById(dto.getStudentExamId()).orElseThrow(()->{
                throw new IllegalArgumentException("Student exam not found");
            });

            StudentExamAnswer studentExamAnswer = studentExamAnswerRepository.findByStudentExamIdAndQuestionId(dto.getStudentExamId(),dto.getQuestionId());

            if(question.getType().equals(QuestionType.NUMERICAL)){
                if(studentExamAnswer!=null){
                    studentExamAnswer.setAnswer(dto.getAnswer());
                }else{
                    studentExamAnswer = new StudentExamAnswer();
                    studentExamAnswer.setQuestion(question);
                    studentExamAnswer.setAnswer(dto.getAnswer());
                    studentExamAnswer.setStudentExam(studentExam);
                }
                studentExamAnswer.setIsAnswered(true);
                studentExamAnswer.setIsMarkedForReview(false);
                studentExamAnswerRepository.save(studentExamAnswer);
                studentExamAnswer.setCreatedAt(LocalDateTime.now());
                return "successfully save answer";
            }

            ExamQuestionOption option = examQuestionOptionRepository.findById(dto.getSelectedOptionId()).orElseThrow(()->{
                throw new IllegalArgumentException("Option not found");
            });



            if(question.getType()==QuestionType.MCQ){
                if(studentExamAnswer!=null){
                    studentExamAnswer.setIsMarkedForReview(false);
                    studentExamAnswer.setIsAnswered(true);
                    studentExamAnswerRepository.save(studentExamAnswer);

                    List<SelectedOptions> selectedOptions = studentExamAnswer.getSelectedOptions();
                    if(selectedOptions!=null && !selectedOptions.isEmpty()){
                       SelectedOptions selectedOptions1= selectedOptions.get(0);
                       selectedOptions1.setExamQuestionOption(option);
                       selectedOptionsRepository.save(selectedOptions1);
                    } else{
                        SelectedOptions selectedOptions1 = new SelectedOptions();
                        selectedOptions1.setExamQuestionOption(option);
                        selectedOptions1.setStudentExamAnswer(studentExamAnswer);
                        selectedOptionsRepository.save(selectedOptions1);
                    }
                } else{
                    studentExamAnswer = new StudentExamAnswer();
                    studentExamAnswer.setQuestion(question);
                    studentExamAnswer.setStudentExam(studentExam);
                    studentExamAnswer.setIsAnswered(true);
                    studentExamAnswer.setIsMarkedForReview(false);
                    studentExamAnswer.setCreatedAt(LocalDateTime.now());
                    StudentExamAnswer savedStudentExamAnswer =  studentExamAnswerRepository.save(studentExamAnswer);

                    SelectedOptions selectedOptions1 = new SelectedOptions();
                    selectedOptions1.setExamQuestionOption(option);
                    selectedOptions1.setStudentExamAnswer(savedStudentExamAnswer);
                    selectedOptionsRepository.save(selectedOptions1);
                }
            }
            else if (question.getType() == QuestionType.MSQ){
                if(studentExamAnswer!=null){
                    List<SelectedOptions> selectedOptions = studentExamAnswer.getSelectedOptions();
                    SelectedOptions selectedOptions1 = selectedOptions.stream()
                            .filter(selectedOptions2 ->
                            Objects.equals(
                                    selectedOptions2.getExamQuestionOption().getId(),
                                    option.getId()
                            ))
                            .findFirst()
                            .orElse(null);
                    if(selectedOptions1!=null){
                        selectedOptions.remove(selectedOptions1);

                        studentExamAnswer.setIsMarkedForReview(false);
                        studentExamAnswer.setIsAnswered(true);
                        studentExamAnswerRepository.save(studentExamAnswer);

                        if(selectedOptions.isEmpty()){
                            studentExamAnswerRepository.delete(studentExamAnswer);
                        }
                    } else{
                        selectedOptions1 = new SelectedOptions();
                        selectedOptions1.setStudentExamAnswer(studentExamAnswer);
                        selectedOptions1.setExamQuestionOption(option);
                        studentExamAnswer.setIsAnswered(true);
                        selectedOptionsRepository.save(selectedOptions1);

                        studentExamAnswer.setIsMarkedForReview(false);
                        studentExamAnswerRepository.save(studentExamAnswer);
                    }
                } else {
                    studentExamAnswer = new StudentExamAnswer();
                    studentExamAnswer.setQuestion(question);
                    studentExamAnswer.setStudentExam(studentExam);
                    studentExamAnswer.setIsAnswered(true);
                    studentExamAnswer.setIsMarkedForReview(false);
                    studentExamAnswer.setCreatedAt(LocalDateTime.now());
                    StudentExamAnswer savedStudentExamAnswer = studentExamAnswerRepository.save(studentExamAnswer);

                    SelectedOptions selectedOptions1 = new SelectedOptions();
                    selectedOptions1.setStudentExamAnswer(savedStudentExamAnswer);
                    selectedOptions1.setExamQuestionOption(option);
                    selectedOptionsRepository.save(selectedOptions1);
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
            StudentExamAnswer studentExamAnswers = studentExamAnswerRepository
                    .findByQuestionIdAndStudentExamId(questionId,studentExamId);
            if(studentExamAnswers!=null){
                studentExamAnswers.setIsMarkedForReview(!studentExamAnswers.getIsMarkedForReview());
                studentExamAnswerRepository.save(studentExamAnswers);
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
            StudentExamAnswer studentExamAnswer = studentExamAnswerRepository
                    .findByQuestionIdAndStudentExamId(questionId,studentExamId);
            studentExamAnswer.getSelectedOptions().clear();
            studentExamAnswerRepository.delete(studentExamAnswer);
            return "Successfully clear answer";
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    @Caching(evict = {
            @CacheEvict(cacheNames = "studentExam",key = "#studentExamId"),
    })
    public String submitExam(Long studentExamId) {
        logger.info("Submitting... studentExam | studentExamId = {}",studentExamId);
        try {
            StudentExam studentExam = studentExamRepository.findById(studentExamId).orElseThrow(()->{
                logger.error("StudentExam not found | studentExamId = {}",studentExamId);
                throw new IllegalArgumentException("StudentExam not found");
            });
            studentExam.setStatus(StudentExamStatus.PRESENT);
            studentExam.setSubmitted_at(LocalDateTime.now());
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

           StudentExam studentExam = studentExamRepository.findById(studentExamId).orElseThrow(()->{
               logger.error("Student Exam not found | studentExamId = {}",studentExamId);
               throw new IllegalArgumentException("Student exam not found");
           });

           List<StudentExamAnswer> studentExamAnswers = studentExamAnswerRepository.findByStudentExamId(studentExamId);
           
           int totalQuestions = studentExam.getExam()
                   .getExamQuestions().size();

           int answeredQuestions = (int) studentExamAnswers.stream()
                   .filter(answer->answer.getIsAnswered()==true)
                   .count();

           int markedForReviewQuestions = (int) studentExamAnswers.stream()
                   .filter(answer->answer.getIsMarkedForReview()==true)
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
