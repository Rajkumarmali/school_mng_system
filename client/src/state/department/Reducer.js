import {
    CREATE_DEPARTMENT_FAILER, CREATE_DEPARTMENT_REQUEST, CREATE_DEPARTMENT_SUCCESS, DELETE_DEPARTMENT_FAILER,
    DELETE_DEPARTMENT_REQUEST, DELETE_DEPARTMENT_SUCCESS, GET_DEPARTMENT_BYID_FAILER, GET_DEPARTMENT_BYID_REQUEST,
    GET_DEPARTMENT_BYID_SUCCESS, GET_DEPARTMENT_FAILER, GET_DEPARTMENT_REQUEST, GET_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAILER, UPDATE_DEPARTMENT_REQUEST, UPDATE_DEPARTMENT_SUCCESS
} from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    departments: null,
    department: null
}

export const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_DEPARTMENT_REQUEST:
        case UPDATE_DEPARTMENT_REQUEST:
        case GET_DEPARTMENT_REQUEST:
        case GET_DEPARTMENT_BYID_REQUEST:
        case DELETE_DEPARTMENT_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            }
        case GET_DEPARTMENT_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                departments: action.payload
            }
        case CREATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false
            }
        case GET_DEPARTMENT_BYID_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                department: action.payload
            }
        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false
            }
        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false
            }
        case CREATE_DEPARTMENT_FAILER:
        case UPDATE_DEPARTMENT_FAILER:
        case GET_DEPARTMENT_FAILER:
        case GET_DEPARTMENT_BYID_FAILER:
        case DELETE_DEPARTMENT_FAILER:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}