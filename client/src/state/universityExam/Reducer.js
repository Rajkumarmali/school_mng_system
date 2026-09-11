import { CREATE_UNIVERSITY_EXAM_FAILER, CREATE_UNIVERSITY_EXAM_REQUEST, CREATE_UNIVERSITY_EXAM_SUCCESS, GENERATE_UNIVERSITY_EXAM_RESULT_FAILER, GENERATE_UNIVERSITY_EXAM_RESULT_REQUEST, GENERATE_UNIVERSITY_EXAM_RESULT_SUCCESS, GET_STUDENT_UNIVERSITY_EXAM_BY_ID_FAILER, GET_STUDENT_UNIVERSITY_EXAM_BY_ID_REQUEST, GET_STUDENT_UNIVERSITY_EXAM_BY_ID_SUCCESS, GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_FAILER, GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_REQUEST, GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_SUCCESS, GET_STUDENT_UNIVERSITY_EXAM_FAILER, GET_STUDENT_UNIVERSITY_EXAM_REQUEST, GET_STUDENT_UNIVERSITY_EXAM_SUCCESS, GET_UNIVERSITY_EXAM_BYID_FAILER, GET_UNIVERSITY_EXAM_BYID_REQUEST, GET_UNIVERSITY_EXAM_BYID_SUCCESS, GET_UNIVERSITY_EXAM_FAILER, GET_UNIVERSITY_EXAM_REQUEST, GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_FAILER, GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_REQUEST, GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_SUCCESS, GET_UNIVERSITY_EXAM_SUBJECT_BYID_FAILER, GET_UNIVERSITY_EXAM_SUBJECT_BYID_REQUEST, GET_UNIVERSITY_EXAM_SUBJECT_BYID_SUCCESS, GET_UNIVERSITY_EXAM_SUBJECT_FAILER, GET_UNIVERSITY_EXAM_SUBJECT_REQUEST, GET_UNIVERSITY_EXAM_SUBJECT_SUCCESS, GET_UNIVERSITY_EXAM_SUCCESS, GET_UNIVERSITY_EXAM_TIMETABLE_FAILER, GET_UNIVERSITY_EXAM_TIMETABLE_REQUEST, GET_UNIVERSITY_EXAM_TIMETABLE_SUCCESS, SAVE_STUDENT_UNIVERSITY_EXAM_FORM_FAILER, SAVE_STUDENT_UNIVERSITY_EXAM_FORM_REQUEST, SAVE_STUDENT_UNIVERSITY_EXAM_FORM_SUCCESS, UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_FAILER, UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_REQUEST, UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_SUCCESS, UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_FAILER, UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_REQUEST, UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_SUCCESS, UPDATE_UNIVERSITY_EXAM_FAILER, UPDATE_UNIVERSITY_EXAM_REQUEST, UPDATE_UNIVERSITY_EXAM_SHOW_ADMIT_CARD_FAILER, UPDATE_UNIVERSITY_EXAM_SHOW_ADMIT_CARD_REQUEST, UPDATE_UNIVERSITY_EXAM_SHOW_ADMIT_CARD_SUCCESS, UPDATE_UNIVERSITY_EXAM_SHOW_RESULT_FAILER, UPDATE_UNIVERSITY_EXAM_SHOW_RESULT_REQUEST, UPDATE_UNIVERSITY_EXAM_SHOW_RESULT_SUCCESS, UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_FAILER, UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_REQUEST, UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_SUCCESS, UPDATE_UNIVERSITY_EXAM_SUBJECT_FAILER, UPDATE_UNIVERSITY_EXAM_SUBJECT_REQUEST, UPDATE_UNIVERSITY_EXAM_SUBJECT_SUCCESS, UPDATE_UNIVERSITY_EXAM_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    universityExams: [],
    universityExam: null,
    universityExamSubjects: null,
    universityExamSubject: null,
    studentUniversityExamsByUniversityExamId: [],
    studentUniversityExamsByUser: [],
    studentUniversityExam: null,
    universityExamTimetable: null,
    universityExamResultOverview: null,
}

export const universityExamReduceer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_UNIVERSITY_EXAM_REQUEST:
        case UPDATE_UNIVERSITY_EXAM_REQUEST:
        case UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_REQUEST:
        case UPDATE_UNIVERSITY_EXAM_SHOW_ADMIT_CARD_REQUEST:
        case UPDATE_UNIVERSITY_EXAM_SHOW_RESULT_REQUEST:
        case GET_UNIVERSITY_EXAM_REQUEST:
        case GET_UNIVERSITY_EXAM_BYID_REQUEST:
        case GET_UNIVERSITY_EXAM_SUBJECT_REQUEST:
        case GET_UNIVERSITY_EXAM_SUBJECT_BYID_REQUEST:
        case UPDATE_UNIVERSITY_EXAM_SUBJECT_REQUEST:
        case GET_STUDENT_UNIVERSITY_EXAM_REQUEST:
        case GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_REQUEST:
        case GET_STUDENT_UNIVERSITY_EXAM_BY_ID_REQUEST:
        case UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_REQUEST:
        case SAVE_STUDENT_UNIVERSITY_EXAM_FORM_REQUEST:
        case GET_UNIVERSITY_EXAM_TIMETABLE_REQUEST:
        case UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_REQUEST:
        case GENERATE_UNIVERSITY_EXAM_RESULT_REQUEST:
        case GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CREATE_UNIVERSITY_EXAM_SUCCESS:
        case UPDATE_UNIVERSITY_EXAM_SUCCESS:
        case UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_SUCCESS:
        case UPDATE_UNIVERSITY_EXAM_SHOW_ADMIT_CARD_SUCCESS:
        case UPDATE_UNIVERSITY_EXAM_SHOW_RESULT_SUCCESS:
        case SAVE_STUDENT_UNIVERSITY_EXAM_FORM_SUCCESS:
        case UPDATE_UNIVERSITY_EXAM_SUBJECT_SUCCESS:
        case UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_SUCCESS:
        case UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_SUCCESS:
        case GENERATE_UNIVERSITY_EXAM_RESULT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case GET_UNIVERSITY_EXAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                universityExams: action.payload
            }
        case GET_UNIVERSITY_EXAM_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                universityExam: action.payload
            }
        case GET_UNIVERSITY_EXAM_SUBJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                universityExamSubjects: action.payload
            }
        case GET_UNIVERSITY_EXAM_SUBJECT_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                universityExamSubject: action.payload
            }
        case GET_STUDENT_UNIVERSITY_EXAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentUniversityExamsByUniversityExamId: action.payload
            }
        case GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentUniversityExamsByUser: action.payload
            }
        case GET_STUDENT_UNIVERSITY_EXAM_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentUniversityExam: action.payload
            }
        case GET_UNIVERSITY_EXAM_TIMETABLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                universityExamTimetable: action.payload
            }
        case GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                universityExamResultOverview: action.payload
            }
        case CREATE_UNIVERSITY_EXAM_FAILER:
        case UPDATE_UNIVERSITY_EXAM_FAILER:
        case UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_FAILER:
        case UPDATE_UNIVERSITY_EXAM_SHOW_ADMIT_CARD_FAILER:
        case UPDATE_UNIVERSITY_EXAM_SHOW_RESULT_FAILER:
        case GET_UNIVERSITY_EXAM_FAILER:
        case GET_UNIVERSITY_EXAM_BYID_FAILER:
        case GET_UNIVERSITY_EXAM_SUBJECT_FAILER:
        case GET_UNIVERSITY_EXAM_SUBJECT_BYID_FAILER:
        case UPDATE_UNIVERSITY_EXAM_SUBJECT_FAILER:
        case GET_STUDENT_UNIVERSITY_EXAM_FAILER:
        case GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_FAILER:
        case GET_STUDENT_UNIVERSITY_EXAM_BY_ID_FAILER:
        case UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_FAILER:
        case SAVE_STUDENT_UNIVERSITY_EXAM_FORM_FAILER:
        case GET_UNIVERSITY_EXAM_TIMETABLE_FAILER:
        case UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_FAILER:
        case GENERATE_UNIVERSITY_EXAM_RESULT_FAILER:
        case GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}