import { CREATE_NOTIFICATION_FAILER, CREATE_NOTIFICATION_REQUEST, CREATE_NOTIFICATION_SUCCESS, GET_NOTIFICATION_BYID_FAILER, GET_NOTIFICATION_BYID_REQUEST, GET_NOTIFICATION_BYID_SUCCESS, GET_NOTIFICATION_COUNT_FAILER, GET_NOTIFICATION_COUNT_REQUEST, GET_NOTIFICATION_COUNT_SUCCESS, GET_NOTIFICATION_FAILER, GET_NOTIFICATION_REQUEST, GET_NOTIFICATION_SUCCESS, UPDATE_NOTIFICATION_FAILER, UPDATE_NOTIFICATION_REQUEST, UPDATE_NOTIFICATION_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    notifications: [],
    notification: null,
    notificationCount: 0
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTIFICATION_REQUEST:
        case UPDATE_NOTIFICATION_REQUEST:
        case GET_NOTIFICATION_REQUEST:
        case GET_NOTIFICATION_BYID_REQUEST:
        case GET_NOTIFICATION_COUNT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CREATE_NOTIFICATION_SUCCESS:
        case UPDATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                notifications: action.payload
            }
        case GET_NOTIFICATION_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                notification: action.payload
            }
        case GET_NOTIFICATION_COUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                notificationCount: action.payload
            }
        case CREATE_NOTIFICATION_FAILER:
        case UPDATE_NOTIFICATION_FAILER:
        case GET_NOTIFICATION_FAILER:
        case GET_NOTIFICATION_BYID_FAILER:
        case GET_NOTIFICATION_COUNT_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return {
                ...state
            }
    }
}