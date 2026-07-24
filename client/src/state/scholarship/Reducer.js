import { ASSIGN_SCHOLARSHIP_TOSTUDENT_FAILER, ASSIGN_SCHOLARSHIP_TOSTUDENT_REQUEST, ASSIGN_SCHOLARSHIP_TOSTUDENT_SUCCESS, CREATE_SCHOLARSHIP_FAILER, CREATE_SCHOLARSHIP_REQUEST, CREATE_SCHOLARSHIP_SUCCESS, GET_SCHOLARSHIP_BYID_FAILER, GET_SCHOLARSHIP_BYID_REQUEST, GET_SCHOLARSHIP_BYID_SUCCESS, GET_SCHOLARSHIP_FAILER, GET_SCHOLARSHIP_REQUEST, GET_SCHOLARSHIP_SUCCESS, GET_STUDENT_SCHOLARSHIP_FAILER, GET_STUDENT_SCHOLARSHIP_REQUEST, GET_STUDENT_SCHOLARSHIP_SUCCESS, REMOVE_STUDENT_FROM_SCHOLARSHIP_FAILER, REMOVE_STUDENT_FROM_SCHOLARSHIP_REQUEST, REMOVE_STUDENT_FROM_SCHOLARSHIP_SUCCESS, UPDATE_SCHOLARSHIP_FAILER, UPDATE_SCHOLARSHIP_REQUEST, UPDATE_SCHOLARSHIP_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    scholarships: [],
    scholarship: null,
    student: null
}

export const scholarshipReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SCHOLARSHIP_REQUEST:
        case UPDATE_SCHOLARSHIP_REQUEST:
        case ASSIGN_SCHOLARSHIP_TOSTUDENT_REQUEST:
        case REMOVE_STUDENT_FROM_SCHOLARSHIP_REQUEST:
        case GET_SCHOLARSHIP_BYID_REQUEST:
        case GET_SCHOLARSHIP_REQUEST:
        case GET_STUDENT_SCHOLARSHIP_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case CREATE_SCHOLARSHIP_SUCCESS:
        case UPDATE_SCHOLARSHIP_SUCCESS:
        case ASSIGN_SCHOLARSHIP_TOSTUDENT_SUCCESS:
        case REMOVE_STUDENT_FROM_SCHOLARSHIP_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case GET_SCHOLARSHIP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                scholarships: action.payload
            }
        case GET_SCHOLARSHIP_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                scholarship: action.payload
            }
        case GET_STUDENT_SCHOLARSHIP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                student: action.payload
            }
        case CREATE_SCHOLARSHIP_FAILER:
        case UPDATE_SCHOLARSHIP_FAILER:
        case ASSIGN_SCHOLARSHIP_TOSTUDENT_FAILER:
        case REMOVE_STUDENT_FROM_SCHOLARSHIP_FAILER:
        case GET_SCHOLARSHIP_BYID_FAILER:
        case GET_SCHOLARSHIP_FAILER:
        case GET_STUDENT_SCHOLARSHIP_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return {
                ...state
            }
    }
}