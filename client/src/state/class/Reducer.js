import { ADD_STUDENT_IN_CLASS_FAILER, ADD_STUDENT_IN_CLASS_REQUEST, ADD_STUDENT_IN_CLASS_SUCCESS, CREATE_CLASS_FAILER, CREATE_CLASS_REQUEST, CREATE_CLASS_SUCCESS, DELETE_CLASS_FAILER, DELETE_CLASS_REQUEST, DELETE_CLASS_SUCCESS, DELETE_STUDENT_FROM_CLASS_FAILER, DELETE_STUDENT_FROM_CLASS_REQUEST, DELETE_STUDENT_FROM_CLASS_SUCCESS, GET_ALL_CLASS_FAILER, GET_ALL_CLASS_REQUEST, GET_ALL_CLASS_SUCCESS, GET_CLASS_BYID_FAILER, GET_CLASS_BYID_REQUEST, GET_CLASS_BYID_SUCCESS, GET_DEPARTMENTS_ALL_CLASS_FAILER, GET_DEPARTMENTS_ALL_CLASS_REQUEST, GET_DEPARTMENTS_ALL_CLASS_SUCCESS, GET_STUDENT_FROM_CLASS_FAILER, GET_STUDENT_FROM_CLASS_REQUEST, GET_STUDENT_FROM_CLASS_SUCCESS, UPDATE_CLASS_FAILER, UPDATE_CLASS_REQUEST, UPDATE_CLASS_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    allClasses: null,
    departmentsClasses: null,
    class: null,
    classStudents: null
}

export const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CLASS_REQUEST:
        case UPDATE_CLASS_REQUEST:
        case GET_ALL_CLASS_REQUEST:
        case GET_DEPARTMENTS_ALL_CLASS_REQUEST:
        case GET_CLASS_BYID_REQUEST:
        case DELETE_CLASS_REQUEST:
        case ADD_STUDENT_IN_CLASS_REQUEST:
        case DELETE_STUDENT_FROM_CLASS_REQUEST:
        case GET_STUDENT_FROM_CLASS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case CREATE_CLASS_SUCCESS:
        case UPDATE_CLASS_SUCCESS:
        case DELETE_CLASS_SUCCESS:
        case ADD_STUDENT_IN_CLASS_SUCCESS:
        case DELETE_STUDENT_FROM_CLASS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case GET_ALL_CLASS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                allClasses: action.payload
            }
        case GET_DEPARTMENTS_ALL_CLASS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                departmentsClasses: action.payload
            }
        case GET_CLASS_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                class: action.payload
            }
        case GET_STUDENT_FROM_CLASS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                classStudents: action.payload
            }
        case CREATE_CLASS_FAILER:
        case UPDATE_CLASS_FAILER:
        case GET_ALL_CLASS_FAILER:
        case GET_DEPARTMENTS_ALL_CLASS_FAILER:
        case GET_CLASS_BYID_FAILER:
        case DELETE_CLASS_FAILER:
        case ADD_STUDENT_IN_CLASS_FAILER:
        case DELETE_STUDENT_FROM_CLASS_FAILER:
        case GET_STUDENT_FROM_CLASS_FAILER:
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