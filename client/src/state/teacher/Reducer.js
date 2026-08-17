import {
    CREATE_TEACHER_FALIER, CREATE_TEACHER_REQUEST, CREATE_TEACHER_SUCCESS, DELETE_TEACHER_FALIER,
    DELETE_TEACHER_REQUEST, DELETE_TEACHER_SUCCESS, GET_ALL_TEACHER_FALIER, GET_ALL_TEACHER_REQUEST,
    GET_ALL_TEACHER_SUCCESS, GET_SECTION_SUBJECT_STUDENTS_FALIER, GET_SECTION_SUBJECT_STUDENTS_REQUEST, GET_SECTION_SUBJECT_STUDENTS_SUCCESS, GET_STUDENT_SUBJECT_BYID_FALIER, GET_STUDENT_SUBJECT_BYID_REQUEST, GET_STUDENT_SUBJECT_BYID_SUCCESS, GET_TEACHER_BYID_FALIER, GET_TEACHER_BYID_REQUEST, GET_TEACHER_BYID_SUCCESS,
    GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_FALIER,
    GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_REQUEST,
    GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_SUCCESS,
    GET_TEACHERS_CLASSES_FALIER,
    GET_TEACHERS_CLASSES_REQUEST,
    GET_TEACHERS_CLASSES_SUCCESS,
    MARK_STUDENT_ATTENDANCE_FALIER,
    MARK_STUDENT_ATTENDANCE_REQUEST,
    MARK_STUDENT_ATTENDANCE_SUCCESS,
    UPDATE_TEACHER_FALIER, UPDATE_TEACHER_IMAGE_FALIER, UPDATE_TEACHER_IMAGE_REQUEST, UPDATE_TEACHER_IMAGE_SUCCESS,
    UPDATE_TEACHER_REQUEST, UPDATE_TEACHER_SUCCESS
} from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    teachers: [],
    teacher: null,
    teacherClasses: [],
    teacherClass: null,
    sectionSubjectStudents: [],
    studentSubject: null,
}

export const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TEACHER_REQUEST:
        case GET_ALL_TEACHER_REQUEST:
        case GET_TEACHER_BYID_REQUEST:
        case UPDATE_TEACHER_REQUEST:
        case DELETE_TEACHER_REQUEST:
        case UPDATE_TEACHER_IMAGE_REQUEST:
        case GET_TEACHERS_CLASSES_REQUEST:
        case GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_REQUEST:
        case GET_SECTION_SUBJECT_STUDENTS_REQUEST:
        case GET_STUDENT_SUBJECT_BYID_REQUEST:
        case MARK_STUDENT_ATTENDANCE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case CREATE_TEACHER_FALIER:
        case GET_ALL_TEACHER_FALIER:
        case GET_TEACHER_BYID_FALIER:
        case UPDATE_TEACHER_FALIER:
        case DELETE_TEACHER_FALIER:
        case UPDATE_TEACHER_IMAGE_FALIER:
        case GET_TEACHERS_CLASSES_FALIER:
        case GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_FALIER:
        case GET_SECTION_SUBJECT_STUDENTS_FALIER:
        case GET_STUDENT_SUBJECT_BYID_FALIER:
        case MARK_STUDENT_ATTENDANCE_FALIER:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case CREATE_TEACHER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case GET_ALL_TEACHER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                teachers: action.payload
            }
        case GET_TEACHER_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                teacher: action.payload
            }
        case UPDATE_TEACHER_SUCCESS:
        case UPDATE_TEACHER_IMAGE_SUCCESS:
        case MARK_STUDENT_ATTENDANCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case DELETE_TEACHER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case GET_TEACHERS_CLASSES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                teacherClasses: action.payload
            }
        case GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                teacherClass: action.payload
            }
        case GET_SECTION_SUBJECT_STUDENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                sectionSubjectStudents: action.payload
            }
        case GET_STUDENT_SUBJECT_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentSubject: action.payload
            }
        default:
            return state
    }
}