import { CREATE_TENANT_FAILER, CREATE_TENANT_REQUEST, CREATE_TENANT_SUCCESS, GET_TENANT_BYID_FAILER, GET_TENANT_BYID_REQUEST, GET_TENANT_BYID_SUCCESS, GET_TENANT_FAILER, GET_TENANT_REQUEST, GET_TENANT_SUCCESS, UPDATE_TENANT_FAILER, UPDATE_TENANT_REQUEST, UPDATE_TENANT_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    tenants: null,
    tenant: null
}

export const tenantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TENANT_REQUEST:
        case CREATE_TENANT_REQUEST:
        case GET_TENANT_BYID_REQUEST:
        case UPDATE_TENANT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_TENANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                tenants: action.payload
            }
        case GET_TENANT_FAILER:
        case CREATE_TENANT_FAILER:
        case GET_TENANT_BYID_FAILER:
        case UPDATE_TENANT_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case CREATE_TENANT_SUCCESS:
            return {
                ...state
            }
        case GET_TENANT_BYID_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                tenant: action.payload
            }
        case UPDATE_TENANT_SUCCESS:
            return {
                ...state
            }
        default:
            return state;
    }
}