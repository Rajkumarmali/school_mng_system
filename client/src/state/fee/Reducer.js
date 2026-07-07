import { CREATE_FEE_STRUCTURE_FAILER, CREATE_FEE_STRUCTURE_REQUEST, CREATE_FEE_STRUCTURE_SUCCESS, CREATE_FEE_TYPE_FAILER, CREATE_FEE_TYPE_REQUEST, CREATE_FEE_TYPE_SUCCESS, DELETE_FEE_STRUCTURE_FAILER, DELETE_FEE_STRUCTURE_REQUEST, DELETE_FEE_STRUCTURE_SUCCESS, DELETE_FEE_TYPE_FAILER, DELETE_FEE_TYPE_REQUEST, DELETE_FEE_TYPE_SUCCESS, GET_FEE_STRUCTURE_BYID_FAILER, GET_FEE_STRUCTURE_BYID_REQUEST, GET_FEE_STRUCTURE_BYID_SUCCESS, GET_FEE_STRUCTURE_FAILER, GET_FEE_STRUCTURE_REQUEST, GET_FEE_STRUCTURE_SUCCESS, GET_FEE_TYPE_BYID_FAILER, GET_FEE_TYPE_BYID_REQUEST, GET_FEE_TYPE_BYID_SUCCESS, GET_FEE_TYPE_FAILER, GET_FEE_TYPE_REQUEST, GET_FEE_TYPE_SUCCESS, UPDATE_FEE_STRUCTURE_FAILER, UPDATE_FEE_STRUCTURE_REQUEST, UPDATE_FEE_STRUCTURE_SUCCESS, UPDATE_FEE_TYPE_FAILER, UPDATE_FEE_TYPE_REQUEST, UPDATE_FEE_TYPE_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    feeTypes: [],
    feeType: null,
    feeStructures: [],
    feeStructure: null
}

export const feeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_FEE_TYPE_REQUEST:
        case UPDATE_FEE_TYPE_REQUEST:
        case GET_FEE_TYPE_BYID_REQUEST:
        case GET_FEE_TYPE_REQUEST:
        case DELETE_FEE_TYPE_REQUEST:
        case CREATE_FEE_STRUCTURE_REQUEST:
        case UPDATE_FEE_STRUCTURE_REQUEST:
        case GET_FEE_STRUCTURE_REQUEST:
        case GET_FEE_STRUCTURE_BYID_REQUEST:
        case DELETE_FEE_STRUCTURE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CREATE_FEE_TYPE_SUCCESS:
        case UPDATE_FEE_TYPE_SUCCESS:
        case DELETE_FEE_TYPE_SUCCESS:
        case CREATE_FEE_STRUCTURE_SUCCESS:
        case UPDATE_FEE_STRUCTURE_SUCCESS:
        case DELETE_FEE_STRUCTURE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case GET_FEE_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                feeTypes: action.payload
            }
        case GET_FEE_TYPE_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                feeType: action.payload
            }
        case GET_FEE_STRUCTURE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                feeStructures: action.payload
            }
        case GET_FEE_STRUCTURE_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                feeStructure: action.payload
            }
        case CREATE_FEE_TYPE_FAILER:
        case UPDATE_FEE_TYPE_FAILER:
        case DELETE_FEE_TYPE_FAILER:
        case GET_FEE_TYPE_FAILER:
        case GET_FEE_TYPE_BYID_FAILER:
        case CREATE_FEE_STRUCTURE_FAILER:
        case UPDATE_FEE_STRUCTURE_FAILER:
        case DELETE_FEE_STRUCTURE_FAILER:
        case GET_FEE_STRUCTURE_FAILER:
        case GET_FEE_STRUCTURE_BYID_FAILER:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return {
                state
            }
    }
}