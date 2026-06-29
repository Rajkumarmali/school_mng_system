import {
    CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS,
    GET_ALLSTUDENT_REQUEST, GET_ALLSTUDENT_SUCCESS, GET_STUDENT_BYID_REQUEST, GET_STUDENT_BYID_SUCCESS,
    UPDATE_STUDENT_IMAGE_REQUEST,
    UPDATE_STUDENT_IMAGE_SUCCESS,
    UPDATE_STUDENT_REQUEST, UPDATE_STUDENT_SUCCESS
} from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    student: null,
    students: null,
}

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STUDENT_REQUEST:
        case GET_ALLSTUDENT_REQUEST:
        case GET_STUDENT_BYID_REQUEST:
        case UPDATE_STUDENT_REQUEST:
        case DELETE_STUDENT_REQUEST:
        case UPDATE_STUDENT_IMAGE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CREATE_STUDENT_SUCCESS:
        case UPDATE_STUDENT_SUCCESS:
        case DELETE_STUDENT_SUCCESS:
        case UPDATE_STUDENT_IMAGE_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ALLSTUDENT_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                students: action.payload
            }
        case GET_STUDENT_BYID_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                student: action.payload
            }

        default:
            return {
                state
            }
    }
}