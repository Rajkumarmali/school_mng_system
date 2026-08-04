import { CREATE_SUBJECT_REQUEST, CREATE_SUBJECT_SUCCESS, GET_SUBJECT_BYID_REQUEST, GET_SUBJECT_BYID_SUCCESS, GET_SUBJECT_REQUEST, GET_SUBJECT_SUCCESS, UPDATE_SUBJECT_REQUEST, UPDATE_SUBJECT_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    subjects: [],
    subject: null
}

export const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SUBJECT_REQUEST:
        case UPDATE_SUBJECT_REQUEST:
        case GET_SUBJECT_REQUEST:
        case GET_SUBJECT_BYID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CREATE_SUBJECT_SUCCESS:
        case UPDATE_SUBJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case GET_SUBJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                subjects: action.payload
            }
        case GET_SUBJECT_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                subject: action.payload
            }
        default:
            return {
                ...state
            }
    }
}