import { GET_ALL_USERS_FAILER, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALLROLES_FAILER, GET_ALLROLES_REQUEST, GET_ALLROLES_SUCCESS, GET_USER_PROFILE_FAILER, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USERS_BYID_FAILER, GET_USERS_BYID_REQUEST, GET_USERS_BYID_SUCCESS, RESET_PASSWORD_FAILER, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_USER_PROFILE_FAILER, UPDATE_USER_PROFILE_IMAGE_FAILER, UPDATE_USER_PROFILE_IMAGE_REQUEST, UPDATE_USER_PROFILE_IMAGE_SUCCESS, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_ROLE_FAILER, UPDATE_USER_ROLE_REQUEST } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    user: null,
    users: null,
    roles: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_REQUEST:
        case UPDATE_USER_PROFILE_REQUEST:
        case GET_ALL_USERS_REQUEST:
        case GET_USERS_BYID_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case UPDATE_USER_PROFILE_IMAGE_REQUEST:
        case GET_ALLROLES_REQUEST:
        case UPDATE_USER_ROLE_REQUEST:
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
        case UPDATE_USER_PROFILE_IMAGE_FAILER:
        case GET_ALLROLES_FAILER:
        case UPDATE_USER_ROLE_FAILER:
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
        case UPDATE_USER_PROFILE_IMAGE_SUCCESS:
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
        case GET_ALLROLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                roles: action.payload
            }
        default:
            return state
    }
}