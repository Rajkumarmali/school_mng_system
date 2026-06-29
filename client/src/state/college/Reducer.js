import { CREATE_COLLEGE_FAILER, CREATE_COLLEGE_REQUEST, CREATE_COLLEGE_SUCCESS, DELETE_COLLEGE_FAILER, DELETE_COLLEGE_REQUEST, DELETE_COLLEGE_SUCCESS, GET_COLLEGE_BYID_FAILER, GET_COLLEGE_BYID_REQUEST, GET_COLLEGE_BYID_SUCCESS, GET_COLLEGE_FAILER, GET_COLLEGE_REQUEST, GET_COLLEGE_SUCCESS, UPDATE_COLLEGE_FAILER, UPDATE_COLLEGE_REQUEST, UPDATE_COLLEGE_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    colleges: null,
    college: null
}

export const collegeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COLLEGE_REQUEST:
        case CREATE_COLLEGE_REQUEST:
        case GET_COLLEGE_BYID_REQUEST:
        case UPDATE_COLLEGE_REQUEST:
        case DELETE_COLLEGE_REQUEST:
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
        case GET_COLLEGE_FAILER:
        case CREATE_COLLEGE_FAILER:
        case GET_COLLEGE_BYID_FAILER:
        case UPDATE_COLLEGE_FAILER:
        case DELETE_COLLEGE_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case CREATE_COLLEGE_SUCCESS:
        case DELETE_COLLEGE_SUCCESS:
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