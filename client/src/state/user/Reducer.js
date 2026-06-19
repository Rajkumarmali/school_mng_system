import { GET_ALL_USERS_FAILER, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_PROFILE_FAILER, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USERS_BYID_FAILER, GET_USERS_BYID_REQUEST, GET_USERS_BYID_SUCCESS, RESET_PASSWORD_FAILER, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_USER_PROFILE_FAILER, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    user: null,
    users: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_REQUEST:
        case UPDATE_USER_PROFILE_REQUEST:
        case GET_ALL_USERS_REQUEST:
        case GET_USERS_BYID_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case GET_USER_PROFILE_FAILER:
        case UPDATE_USER_PROFILE_FAILER:
        case GET_ALL_USERS_FAILER:
        case GET_USERS_BYID_FAILER:
        case RESET_PASSWORD_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_USER_PROFILE_SUCCESS:
        case GET_USERS_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: action.payload
            }
        case UPDATE_USER_PROFILE_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                users: action.payload
            }
        default:
            return state
    }
}