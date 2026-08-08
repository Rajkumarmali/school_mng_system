import { GET_UNIVERSITY_ADMISSION_FAILER, GET_UNIVERSITY_ADMISSION_REQUEST, GET_UNIVERSITY_ADMISSION_SUCCESS, GET_UNIVERSITY_FAILER, GET_UNIVERSITY_REQUEST, GET_UNIVERSITY_STUDENT_BY_ID_FAILER, GET_UNIVERSITY_STUDENT_BY_ID_REQUEST, GET_UNIVERSITY_STUDENT_BY_ID_SUCCESS, GET_UNIVERSITY_STUDENT_FAILER, GET_UNIVERSITY_STUDENT_REQUEST, GET_UNIVERSITY_STUDENT_SUCCESS, GET_UNIVERSITY_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    university: [],
    universityStudents: [],
    universityStudent: null,
    universityAdmission: []
}

export const universityReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_UNIVERSITY_REQUEST:
        case GET_UNIVERSITY_STUDENT_REQUEST:
        case GET_UNIVERSITY_ADMISSION_REQUEST:
        case GET_UNIVERSITY_STUDENT_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false
            }
        case GET_UNIVERSITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                university: action.payload
            }
        case GET_UNIVERSITY_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                universityStudents: action.payload
            }
        case GET_UNIVERSITY_STUDENT_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                universityStudent: action.payload
            }
        case GET_UNIVERSITY_ADMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                universityAdmission: action.payload
            }
        case GET_UNIVERSITY_FAILER:
        case GET_UNIVERSITY_STUDENT_FAILER:
        case GET_UNIVERSITY_ADMISSION_FAILER:
        case GET_UNIVERSITY_STUDENT_BY_ID_FAILER:
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