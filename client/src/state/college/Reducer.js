import { CREATE_COLLEGE_FAILER, CREATE_COLLEGE_REQUEST, CREATE_COLLEGE_SUCCESS, DELETE_COLLEGE_FAILER, DELETE_COLLEGE_REQUEST, DELETE_COLLEGE_SUCCESS, GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_FAILER, GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_REQUEST, GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_SUCCESS, GET_COLLEGE_BYID_FAILER, GET_COLLEGE_BYID_REQUEST, GET_COLLEGE_BYID_SUCCESS, GET_COLLEGE_FAILER, GET_COLLEGE_REQUEST, GET_COLLEGE_SUCCESS, GET_COLLEGES_ADMISSION_FAILER, GET_COLLEGES_ADMISSION_REQUEST, GET_COLLEGES_ADMISSION_SUCCESS, GET_COLLEGES_STUDENTS_FAILER, GET_COLLEGES_STUDENTS_REQUEST, GET_COLLEGES_STUDENTS_SUCCESS, GET_COLLEGES_STUDENTSBYID_FAILER, GET_COLLEGES_STUDENTSBYID_REQUEST, GET_COLLEGES_STUDENTSBYID_SUCCESS, UPDATE_COLLEGE_FAILER, UPDATE_COLLEGE_REQUEST, UPDATE_COLLEGE_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    colleges: null,
    college: null,
    collegeStudents: [],
    collegeAdmission: [],
    collegeStudent: null
}

export const collegeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COLLEGE_REQUEST:
        case CREATE_COLLEGE_REQUEST:
        case GET_COLLEGE_BYID_REQUEST:
        case UPDATE_COLLEGE_REQUEST:
        case DELETE_COLLEGE_REQUEST:
        case GET_COLLEGES_STUDENTS_REQUEST:
        case GET_COLLEGES_ADMISSION_REQUEST:
        case GET_COLLEGES_STUDENTSBYID_REQUEST:
        case GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_COLLEGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                colleges: action.payload
            }
        case GET_COLLEGES_STUDENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                collegeStudents: action.payload
            }
        case GET_COLLEGES_ADMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                collegeAdmission: action.payload
            }
        case GET_COLLEGES_STUDENTSBYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                collegeStudent: action.payload
            }
        case GET_COLLEGE_FAILER:
        case CREATE_COLLEGE_FAILER:
        case GET_COLLEGE_BYID_FAILER:
        case UPDATE_COLLEGE_FAILER:
        case DELETE_COLLEGE_FAILER:
        case GET_COLLEGES_STUDENTS_FAILER:
        case GET_COLLEGES_ADMISSION_FAILER:
        case GET_COLLEGES_STUDENTSBYID_FAILER:
        case GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case CREATE_COLLEGE_SUCCESS:
        case DELETE_COLLEGE_SUCCESS:
        case GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_SUCCESS:
            return {
                ...state
            }
        case GET_COLLEGE_BYID_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                college: action.payload
            }
        case UPDATE_COLLEGE_SUCCESS:
            return {
                ...state
            }
        default:
            return state;
    }
}