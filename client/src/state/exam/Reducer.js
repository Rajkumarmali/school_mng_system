import { CLEAR_STUDENT_ANSWER_FAILER, CLEAR_STUDENT_ANSWER_REQUEST, CLEAR_STUDENT_ANSWER_SUCCESS, CREATE_EXAM_FAILER, CREATE_EXAM_QUESTION_FAILER, CREATE_EXAM_QUESTION_REQUEST, CREATE_EXAM_QUESTION_SUCCESS, CREATE_EXAM_REQUEST, CREATE_EXAM_SUCCESS, DELETE_EXAM_QUESTION_FAILER, DELETE_EXAM_QUESTION_REQUEST, DELETE_EXAM_QUESTION_SUCCESS, GENERATE_EXAM_RESULT_FAILER, GENERATE_EXAM_RESULT_REQUEST, GENERATE_EXAM_RESULT_SUCCESS, GET_EXAM_BY_SECTIONSUBJECTID_FAILER, GET_EXAM_BY_SECTIONSUBJECTID_REQUEST, GET_EXAM_BY_SECTIONSUBJECTID_SUCCESS, GET_EXAM_BYID_FAILER, GET_EXAM_BYID_REQUEST, GET_EXAM_BYID_SUCCESS, GET_EXAM_FAILER, GET_EXAM_QUESTION_FAILER, GET_EXAM_QUESTION_REQUEST, GET_EXAM_QUESTION_SUCCESS, GET_EXAM_REQUEST, GET_EXAM_RESULT_OVERVIEW_FAILER, GET_EXAM_RESULT_OVERVIEW_REQUEST, GET_EXAM_RESULT_OVERVIEW_SUCCESS, GET_EXAM_SUCCESS, GET_ONGOING_STUDENT_EXAM_FAILER, GET_ONGOING_STUDENT_EXAM_REQUEST, GET_ONGOING_STUDENT_EXAM_SUCCESS, GET_STUDENT_EXAM_BY_USERID_FAILER, GET_STUDENT_EXAM_BY_USERID_REQUEST, GET_STUDENT_EXAM_BY_USERID_SUCCESS, GET_STUDENT_EXAM_BYID_FAILER, GET_STUDENT_EXAM_BYID_REQUEST, GET_STUDENT_EXAM_BYID_SUCCESS, GET_STUDENT_EXAM_FAILER, GET_STUDENT_EXAM_OVERVIEW_FAILER, GET_STUDENT_EXAM_OVERVIEW_REQUEST, GET_STUDENT_EXAM_OVERVIEW_SUCCESS, GET_STUDENT_EXAM_QUESTION_FAILER, GET_STUDENT_EXAM_QUESTION_REQUEST, GET_STUDENT_EXAM_QUESTION_SUCCESS, GET_STUDENT_EXAM_REQUEST, GET_STUDENT_EXAM_RESULT_FAILER, GET_STUDENT_EXAM_RESULT_REQUEST, GET_STUDENT_EXAM_RESULT_SUCCESS, GET_STUDENT_EXAM_SUCCESS, GET_SUBMIT_STUDENT_EXAM_DETAILS_FAILER, GET_SUBMIT_STUDENT_EXAM_DETAILS_REQUEST, GET_SUBMIT_STUDENT_EXAM_DETAILS_SUCCESS, SAVE_STUDENT_ANSWER_FAILER, SAVE_STUDENT_ANSWER_REQUEST, SAVE_STUDENT_ANSWER_SUCCESS, SUBMIT_STUDENT_EXAM_FAILER, SUBMIT_STUDENT_EXAM_REQUEST, SUBMIT_STUDENT_EXAM_SUCCESS, UPDATE_EXAM_FAILER, UPDATE_EXAM_QUESTION_FAILER, UPDATE_EXAM_QUESTION_REQUEST, UPDATE_EXAM_QUESTION_SUCCESS, UPDATE_EXAM_REQUEST, UPDATE_EXAM_SUCCESS, UPDATE_EXAM_TO_SHOW_RESULT_FAILER, UPDATE_EXAM_TO_SHOW_RESULT_REQUEST, UPDATE_EXAM_TO_SHOW_RESULT_SUCCESS, UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_FAILER, UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_REQUEST, UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_SUCCESS, UPDATE_QUESTION_REVIEW_FAILER, UPDATE_QUESTION_REVIEW_REQUEST, UPDATE_QUESTION_REVIEW_SUCCESS, UPDATE_STUDENT_EXAM_MARKS_FAILER, UPDATE_STUDENT_EXAM_MARKS_REQUEST, UPDATE_STUDENT_EXAM_MARKS_SUCCESS, UPDATE_STUDENT_EXAM_STATUS_FAILER, UPDATE_STUDENT_EXAM_STATUS_REQUEST, UPDATE_STUDENT_EXAM_STATUS_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    exams: [],
    exam: null,
    examResultOverview: null,
    sectionSubjectExams: [],
    studentExams: [],
    userStudentExams: [],
    userStudentExam: null,
    userStudentExamOverview: null,
    onGoingStudentExams: [],
    examQuestions: [],
    studentExamQuestions: [],
    submitStudentExamDetail: null,
    studentExamResult: []
}

export const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EXAM_REQUEST:
        case UPDATE_EXAM_REQUEST:
        case GET_EXAM_REQUEST:
        case GET_EXAM_BYID_REQUEST:
        case GET_EXAM_BY_SECTIONSUBJECTID_REQUEST:
        case GET_STUDENT_EXAM_REQUEST:
        case GET_STUDENT_EXAM_BY_USERID_REQUEST:
        case GET_STUDENT_EXAM_BYID_REQUEST:
        case GET_ONGOING_STUDENT_EXAM_REQUEST:
        case GET_STUDENT_EXAM_OVERVIEW_REQUEST:
        case UPDATE_STUDENT_EXAM_STATUS_REQUEST:
        case UPDATE_STUDENT_EXAM_MARKS_REQUEST:
        case CREATE_EXAM_QUESTION_REQUEST:
        case UPDATE_EXAM_QUESTION_REQUEST:
        case DELETE_EXAM_QUESTION_REQUEST:
        case GET_EXAM_QUESTION_REQUEST:
        case UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_REQUEST:
        case GET_STUDENT_EXAM_QUESTION_REQUEST:
        case SAVE_STUDENT_ANSWER_REQUEST:
        case UPDATE_QUESTION_REVIEW_REQUEST:
        case CLEAR_STUDENT_ANSWER_REQUEST:
        case SUBMIT_STUDENT_EXAM_REQUEST:
        case GET_SUBMIT_STUDENT_EXAM_DETAILS_REQUEST:
        case UPDATE_EXAM_TO_SHOW_RESULT_REQUEST:
        case GENERATE_EXAM_RESULT_REQUEST:
        case GET_EXAM_RESULT_OVERVIEW_REQUEST:
        case GET_STUDENT_EXAM_RESULT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case CREATE_EXAM_SUCCESS:
        case UPDATE_EXAM_SUCCESS:
        case UPDATE_STUDENT_EXAM_STATUS_SUCCESS:
        case UPDATE_STUDENT_EXAM_MARKS_SUCCESS:
        case UPDATE_EXAM_QUESTION_SUCCESS:
        case DELETE_EXAM_QUESTION_SUCCESS:
        case CREATE_EXAM_QUESTION_SUCCESS:
        case UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_SUCCESS:
        case SAVE_STUDENT_ANSWER_SUCCESS:
        case UPDATE_QUESTION_REVIEW_SUCCESS:
        case CLEAR_STUDENT_ANSWER_SUCCESS:
        case SUBMIT_STUDENT_EXAM_SUCCESS:
        case UPDATE_EXAM_TO_SHOW_RESULT_SUCCESS:
        case GENERATE_EXAM_RESULT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case GET_EXAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                exams: action.payload
            }
        case GET_EXAM_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                exam: action.payload
            }
        case GET_EXAM_BY_SECTIONSUBJECTID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                sectionSubjectExams: action.payload
            }
        case GET_STUDENT_EXAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentExams: action.payload
            }
        case GET_STUDENT_EXAM_BY_USERID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                userStudentExams: action.payload
            }
        case GET_STUDENT_EXAM_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                userStudentExam: action.payload
            }
        case GET_ONGOING_STUDENT_EXAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                onGoingStudentExams: action.payload
            }
        case GET_STUDENT_EXAM_OVERVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                userStudentExamOverview: action.payload
            }
        case GET_EXAM_QUESTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                examQuestions: action.payload
            }
        case GET_STUDENT_EXAM_QUESTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentExamQuestions: action.payload
            }
        case GET_SUBMIT_STUDENT_EXAM_DETAILS_SUCCESS: return {
            ...state,
            isLoading: false,
            error: null,
            submitStudentExamDetail: action.payload
        }
        case GET_EXAM_RESULT_OVERVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                examResultOverview: action.payload
            }
        case GET_STUDENT_EXAM_RESULT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentExamResult: action.payload
            }
        case CREATE_EXAM_FAILER:
        case UPDATE_EXAM_FAILER:
        case GET_EXAM_FAILER:
        case GET_EXAM_BYID_FAILER:
        case GET_EXAM_BY_SECTIONSUBJECTID_FAILER:
        case GET_STUDENT_EXAM_FAILER:
        case GET_STUDENT_EXAM_BY_USERID_FAILER:
        case GET_STUDENT_EXAM_BYID_FAILER:
        case GET_ONGOING_STUDENT_EXAM_FAILER:
        case GET_STUDENT_EXAM_OVERVIEW_FAILER:
        case UPDATE_STUDENT_EXAM_STATUS_FAILER:
        case UPDATE_STUDENT_EXAM_MARKS_FAILER:
        case CREATE_EXAM_QUESTION_FAILER:
        case UPDATE_EXAM_QUESTION_FAILER:
        case DELETE_EXAM_QUESTION_FAILER:
        case GET_EXAM_QUESTION_FAILER:
        case UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_FAILER:
        case GET_STUDENT_EXAM_QUESTION_FAILER:
        case SAVE_STUDENT_ANSWER_FAILER:
        case UPDATE_QUESTION_REVIEW_FAILER:
        case CLEAR_STUDENT_ANSWER_FAILER:
        case SUBMIT_STUDENT_EXAM_FAILER:
        case GET_SUBMIT_STUDENT_EXAM_DETAILS_FAILER:
        case UPDATE_EXAM_TO_SHOW_RESULT_FAILER:
        case GENERATE_EXAM_RESULT_FAILER:
        case GET_EXAM_RESULT_OVERVIEW_FAILER:
        case GET_STUDENT_EXAM_RESULT_FAILER:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        default:
            return {
                ...state
            }
    }
}

