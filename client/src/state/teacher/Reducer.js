import {
    CREATE_TEACHER_FALIER, CREATE_TEACHER_REQUEST, CREATE_TEACHER_SUCCESS, DELETE_TEACHER_FALIER,
    DELETE_TEACHER_REQUEST, DELETE_TEACHER_SUCCESS, GET_ALL_TEACHER_FALIER, GET_ALL_TEACHER_REQUEST,
    GET_ALL_TEACHER_SUCCESS, GET_TEACHER_BYID_FALIER, GET_TEACHER_BYID_REQUEST, GET_TEACHER_BYID_SUCCESS,
    UPDATE_TEACHER_FALIER, UPDATE_TEACHER_IMAGE_FALIER, UPDATE_TEACHER_IMAGE_REQUEST, UPDATE_TEACHER_IMAGE_SUCCESS,
    UPDATE_TEACHER_REQUEST, UPDATE_TEACHER_SUCCESS
} from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    teachers: null,
    teacher: null
}

export const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TEACHER_REQUEST:
        case GET_ALL_TEACHER_REQUEST:
        case GET_TEACHER_BYID_REQUEST:
        case UPDATE_TEACHER_REQUEST:
        case DELETE_TEACHER_REQUEST:
        case UPDATE_TEACHER_IMAGE_REQUEST:
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
        default:
            return state
    }
}