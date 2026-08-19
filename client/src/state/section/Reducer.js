import {
    ADD_STUDENT_IN_SECTION_FAILER, ADD_STUDENT_IN_SECTION_REQUEST, ADD_STUDENT_IN_SECTION_SUCCESS, CREATE_SECTION_FAILER,
    CREATE_SECTION_REQUEST, CREATE_SECTION_SUCCESS, DELETE_SECTION_FAILER, DELETE_SECTION_REQUEST, DELETE_SECTION_SUCCESS, DELETE_STUDENT_FROM_SECTION_FAILER, DELETE_STUDENT_FROM_SECTION_REQUEST, DELETE_STUDENT_FROM_SECTION_SUCCESS, GET_ALL_SECTION_FAILER, GET_ALL_SECTION_REQUEST, GET_ALL_SECTION_SUCCESS, GET_SECTION_BYID_FAILER, GET_SECTION_BYID_REQUEST, GET_SECTION_BYID_SUCCESS, GET_DEPARTMENTS_ALL_SECTION_FAILER, GET_DEPARTMENTS_ALL_SECTION_REQUEST, GET_DEPARTMENTS_ALL_SECTION_SUCCESS, GET_STUDENT_FROM_SECTION_FAILER, GET_STUDENT_FROM_SECTION_REQUEST, GET_STUDENT_FROM_SECTION_SUCCESS, UPDATE_SECTION_FAILER, UPDATE_SECTION_REQUEST, UPDATE_SECTION_SUCCESS, ADD_SUBJECT_IN_SECTION_REQUEST, GET_SECTION_SUBJECT_REQUEST, GET_SECTION_SUBJECT_BY_ID_REQUEST, UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_REQUEST, ADD_STUDENT_IN_SECTION_SUBJECT_REQUEST, ADD_SUBJECT_IN_SECTION_FAILER, GET_SECTION_SUBJECT_FAILER, GET_SECTION_SUBJECT_BY_ID_FAILER, UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_FAILER, ADD_STUDENT_IN_SECTION_SUBJECT_FAILER, GET_SECTION_SUBJECT_SUCCESS, GET_SECTION_SUBJECT_BY_ID_SUCCESS, GET_STUDENT_FROM_SECTION_SUBJECT_REQUEST, GET_STUDENT_FROM_SECTION_SUBJECT_SUCCESS, GET_STUDENT_FROM_SECTION_SUBJECT_FAILER, GET_STUDENT_FROM_SECTION_BY_STUDENTID_REQUEST, GET_STUDENT_FROM_SECTION_BY_STUDENTID_SUCCESS, GET_STUDENT_FROM_SECTION_BY_STUDENTID_FAILER, GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_REQUEST, GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_SUCCESS, GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_FAILER,
    CREATE_EXAM_REQUEST,
    UPDATE_STUDENT_EXAM_STATUS_REQUEST,
    UPDATE_STUDENT_EXAM_MARKS_REQUEST,
    GET_STUDENT_EXAM_REQUEST,
    GET_EXAM_REQUEST,
    UPDATE_STUDENT_EXAM_STATUS_SUCCESS,
    UPDATE_STUDENT_EXAM_MARKS_SUCCESS,
    CREATE_EXAM_SUCCESS,
    GET_EXAM_SUCCESS,
    GET_STUDENT_EXAM_SUCCESS,
    CREATE_EXAM_FAILER,
    GET_EXAM_FAILER,
    GET_STUDENT_EXAM_FAILER,
    UPDATE_STUDENT_EXAM_MARKS_FAILER,
    UPDATE_STUDENT_EXAM_STATUS_FAILER,
    GET_EXAM_BYID_REQUEST,
    GET_EXAM_BYID_SUCCESS,
    GET_EXAM_BYID_FAILER,
    UPDATE_EXAM_REQUEST,
    UPDATE_EXAM_SUCCESS,
    UPDATE_EXAM_FAILER
} from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    sections: null,
    departmentsSections: null,
    section: null,
    sectionStudents: null,
    sectionStudent: null,
    sectionSubjects: [],
    sectionSubject: null,
    sectionSubjectStudents: [],
    studentSubjects: [],
    exams: [],
    exam: null,
    studentExams: []
}

export const sectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SECTION_REQUEST:
        case UPDATE_SECTION_REQUEST:
        case GET_ALL_SECTION_REQUEST:
        case GET_DEPARTMENTS_ALL_SECTION_REQUEST:
        case GET_SECTION_BYID_REQUEST:
        case DELETE_SECTION_REQUEST:
        case ADD_STUDENT_IN_SECTION_REQUEST:
        case DELETE_STUDENT_FROM_SECTION_REQUEST:
        case GET_STUDENT_FROM_SECTION_REQUEST:
        case ADD_SUBJECT_IN_SECTION_REQUEST:
        case GET_SECTION_SUBJECT_REQUEST:
        case GET_SECTION_SUBJECT_BY_ID_REQUEST:
        case UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_REQUEST:
        case ADD_STUDENT_IN_SECTION_SUBJECT_REQUEST:
        case GET_STUDENT_FROM_SECTION_SUBJECT_REQUEST:
        case GET_STUDENT_FROM_SECTION_BY_STUDENTID_REQUEST:
        case GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_REQUEST:
        case CREATE_EXAM_REQUEST:
        case UPDATE_EXAM_REQUEST:
        case GET_EXAM_REQUEST:
        case GET_EXAM_BYID_REQUEST:
        case GET_STUDENT_EXAM_REQUEST:
        case UPDATE_STUDENT_EXAM_STATUS_REQUEST:
        case UPDATE_STUDENT_EXAM_MARKS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case CREATE_SECTION_SUCCESS:
        case UPDATE_SECTION_SUCCESS:
        case DELETE_SECTION_SUCCESS:
        case ADD_STUDENT_IN_SECTION_SUCCESS:
        case DELETE_STUDENT_FROM_SECTION_SUCCESS:
        case CREATE_EXAM_SUCCESS:
        case UPDATE_EXAM_SUCCESS:
        case UPDATE_STUDENT_EXAM_STATUS_SUCCESS:
        case UPDATE_STUDENT_EXAM_MARKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case GET_ALL_SECTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                sections: action.payload
            }
        case GET_DEPARTMENTS_ALL_SECTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                departmentsSections: action.payload
            }
        case GET_SECTION_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                section: action.payload
            }
        case GET_STUDENT_FROM_SECTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                sectionStudents: action.payload
            }
        case GET_SECTION_SUBJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                sectionSubjects: action.payload
            }
        case GET_SECTION_SUBJECT_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                sectionSubject: action.payload
            }
        case GET_STUDENT_FROM_SECTION_SUBJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                sectionSubjectStudents: action.payload
            }
        case GET_STUDENT_FROM_SECTION_BY_STUDENTID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                sectionStudent: action.payload
            }
        case GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentSubjects: action.payload
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
        case GET_STUDENT_EXAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentExams: action.payload
            }
        case CREATE_SECTION_FAILER:
        case UPDATE_SECTION_FAILER:
        case GET_ALL_SECTION_FAILER:
        case GET_DEPARTMENTS_ALL_SECTION_FAILER:
        case GET_SECTION_BYID_FAILER:
        case DELETE_SECTION_FAILER:
        case ADD_STUDENT_IN_SECTION_FAILER:
        case DELETE_STUDENT_FROM_SECTION_FAILER:
        case GET_STUDENT_FROM_SECTION_FAILER:
        case ADD_SUBJECT_IN_SECTION_FAILER:
        case GET_SECTION_SUBJECT_FAILER:
        case GET_SECTION_SUBJECT_BY_ID_FAILER:
        case UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_FAILER:
        case ADD_STUDENT_IN_SECTION_SUBJECT_FAILER:
        case GET_STUDENT_FROM_SECTION_SUBJECT_FAILER:
        case GET_STUDENT_FROM_SECTION_BY_STUDENTID_FAILER:
        case GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_FAILER:
        case CREATE_EXAM_FAILER:
        case UPDATE_EXAM_FAILER:
        case GET_EXAM_FAILER:
        case GET_EXAM_BYID_FAILER:
        case GET_STUDENT_EXAM_FAILER:
        case UPDATE_STUDENT_EXAM_STATUS_FAILER:
        case UPDATE_STUDENT_EXAM_MARKS_FAILER:
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