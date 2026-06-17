import { LOG_OUT, LOGIN_FAILER, LOGIN_REQUEST, LOGIN_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    token: null,
    error: null,
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
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
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case LOG_OUT:
            return {
                initialState
            }
        default:
            return state
    }
}