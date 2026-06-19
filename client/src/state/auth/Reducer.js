import { LOG_OUT, LOGIN_FAILER, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_PASSWORD_FAILER, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    token: null,
    error: null,
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isLoading: false,
                error: null
            }
        case LOGIN_FAILER:
        case RESET_PASSWORD_FAILER:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case LOG_OUT:
            return {
                initialState
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                initialState
            }
        default:
            return state
    }
}