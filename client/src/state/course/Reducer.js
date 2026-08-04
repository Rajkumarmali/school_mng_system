import { CREATE_COURSE_FAILER, CREATE_COURSE_REQUEST, CREATE_COURSE_SUCCESS, GET_ALL_COURSE_FAILER, GET_ALL_COURSE_REQUEST, GET_ALL_COURSE_SUCCESS, GET_COURSE_BY_COLLEGE_FAILER, GET_COURSE_BY_COLLEGE_REQUEST, GET_COURSE_BY_COLLEGE_SUCCESS, GET_COURSE_BYID_FAILER, GET_COURSE_BYID_REQUEST, GET_COURSE_BYID_SUCCESS, GET_COURSE_DEPARTMENT_FAILER, GET_COURSE_DEPARTMENT_FOR_COLLEGE_FAILER, GET_COURSE_DEPARTMENT_FOR_COLLEGE_REQUEST, GET_COURSE_DEPARTMENT_FOR_COLLEGE_SUCCESS, GET_COURSE_DEPARTMENT_REQUEST, GET_COURSE_DEPARTMENT_SUCCESS, GET_COURSE_STUDENT_FAILER, GET_COURSE_STUDENT_FOR_COLLEGE_FAILER, GET_COURSE_STUDENT_FOR_COLLEGE_REQUEST, GET_COURSE_STUDENT_FOR_COLLEGE_SUCCESS, GET_COURSE_STUDENT_REQUEST, GET_COURSE_STUDENT_SUCCESS, UPDATE_COURSE_FAILER, UPDATE_COURSE_REQUEST, UPDATE_COURSE_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    courses: [],
    course: null,
    courseDepartments: [],
    courseDepartmentsForCollege: [],
    courseStudents: [],
    courseStudentsForCollege: [],
    collegeCourses: []
}

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COURSE_REQUEST:
        case UPDATE_COURSE_REQUEST:
        case GET_ALL_COURSE_REQUEST:
        case GET_COURSE_BYID_REQUEST:
        case GET_COURSE_DEPARTMENT_REQUEST:
        case GET_COURSE_STUDENT_REQUEST:
        case GET_COURSE_BY_COLLEGE_REQUEST:
        case GET_COURSE_DEPARTMENT_FOR_COLLEGE_REQUEST:
        case GET_COURSE_STUDENT_FOR_COLLEGE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CREATE_COURSE_SUCCESS:
        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case GET_ALL_COURSE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                courses: action.payload
            }
        case GET_COURSE_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                course: action.payload
            }
        case GET_COURSE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                courseDepartments: action.payload
            }
        case GET_COURSE_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                courseStudents: action.payload
            }
        case GET_COURSE_BY_COLLEGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                collegeCourses: action.payload
            }
        case GET_COURSE_DEPARTMENT_FOR_COLLEGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                courseDepartmentsForCollege: action.payload
            }
        case GET_COURSE_STUDENT_FOR_COLLEGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                courseStudentsForCollege: action.payload
            }
        case CREATE_COURSE_FAILER:
        case UPDATE_COURSE_FAILER:
        case GET_ALL_COURSE_FAILER:
        case GET_COURSE_BYID_FAILER:
        case GET_COURSE_DEPARTMENT_FAILER:
        case GET_COURSE_STUDENT_FAILER:
        case GET_COURSE_BY_COLLEGE_FAILER:
        case GET_COURSE_DEPARTMENT_FOR_COLLEGE_FAILER:
        case GET_COURSE_STUDENT_FOR_COLLEGE_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}