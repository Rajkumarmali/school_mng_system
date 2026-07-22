import {
    ASSIGN_FEE_STRUCTURE_TOSTUDENT_FAILER,
    ASSIGN_FEE_STRUCTURE_TOSTUDENT_REQUEST,
    ASSIGN_FEE_STRUCTURE_TOSTUDENT_SUCCESS,
    CREATE_FEE_STRUCTURE_FAILER, CREATE_FEE_STRUCTURE_REQUEST, CREATE_FEE_STRUCTURE_SUCCESS, CREATE_FEE_TYPE_FAILER,
    CREATE_FEE_TYPE_REQUEST, CREATE_FEE_TYPE_SUCCESS, DELETE_FEE_STRUCTURE_FAILER, DELETE_FEE_STRUCTURE_REQUEST,
    DELETE_FEE_STRUCTURE_SUCCESS, DELETE_FEE_TYPE_FAILER, DELETE_FEE_TYPE_REQUEST, DELETE_FEE_TYPE_SUCCESS,
    GET_FEE_OVERVIEW_FAILER,
    GET_FEE_OVERVIEW_REQUEST,
    GET_FEE_OVERVIEW_SUCCESS,
    GET_FEE_STRUCTURE_BYID_FAILER, GET_FEE_STRUCTURE_BYID_REQUEST, GET_FEE_STRUCTURE_BYID_SUCCESS, GET_FEE_STRUCTURE_FAILER,
    GET_FEE_STRUCTURE_REQUEST, GET_FEE_STRUCTURE_SUCCESS, GET_FEE_STUDENT_BYID_FAILER, GET_FEE_STUDENT_BYID_REQUEST,
    GET_FEE_STUDENT_BYID_SUCCESS, GET_FEE_STUDENT_FAILER, GET_FEE_STUDENT_REQUEST, GET_FEE_STUDENT_SUCCESS,
    GET_FEE_TYPE_BYID_FAILER, GET_FEE_TYPE_BYID_REQUEST, GET_FEE_TYPE_BYID_SUCCESS, GET_FEE_TYPE_FAILER, GET_FEE_TYPE_REQUEST,
    GET_FEE_TYPE_SUCCESS, GET_PAID_FEE_STUDENT_FAILER, GET_PAID_FEE_STUDENT_REQUEST, GET_PAID_FEE_STUDENT_SUCCESS,
    GET_PAYMENT_BYID_FAILER, GET_PAYMENT_BYID_REQUEST, GET_PAYMENT_BYID_SUCCESS,
    GET_PAYMENT_FAILER, GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS, GET_STUDENT_BYID_FAILER, GET_STUDENT_BYID_REQUEST,
    GET_STUDENT_BYID_SUCCESS,
    GET_STUDENT_FAILER, GET_STUDENT_REQUEST, GET_STUDENT_SUCCESS,
    GET_STUDENTS_FEES_FAILER, GET_STUDENTS_FEES_REQUEST, GET_STUDENTS_FEES_SUCCESS,
    GET_UNPAID_FEE_STUDENT_FAILER, GET_UNPAID_FEE_STUDENT_REQUEST, GET_UNPAID_FEE_STUDENT_SUCCESS, PAY_FEE_BY_CASH_FAILER,
    PAY_FEE_BY_CASH_REQUEST, PAY_FEE_BY_CASH_SUCCESS, UPDATE_FEE_STRUCTURE_FAILER,
    UPDATE_FEE_STRUCTURE_REQUEST, UPDATE_FEE_STRUCTURE_SUCCESS, UPDATE_FEE_TYPE_FAILER, UPDATE_FEE_TYPE_REQUEST,
    UPDATE_FEE_TYPE_SUCCESS
} from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    feeTypes: [],
    feeType: null,
    feeStructures: [],
    feeStructure: null,
    feeStudent: null,
    feeStudents: [],
    students: [],
    student: null,
    studentsFees: [],
    payments: [],
    payment: null,
    paidFeeStudents: [],
    unpaidFeeStudents: [],
    feeOverview: null,
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
        case GET_FEE_STUDENT_REQUEST:
        case GET_PAID_FEE_STUDENT_REQUEST:
        case GET_UNPAID_FEE_STUDENT_REQUEST:
        case GET_FEE_STUDENT_BYID_REQUEST:
        case GET_STUDENT_REQUEST:
        case GET_PAYMENT_REQUEST:
        case PAY_FEE_BY_CASH_REQUEST:
        case GET_STUDENTS_FEES_REQUEST:
        case GET_STUDENT_BYID_REQUEST:
        case GET_PAYMENT_BYID_REQUEST:
        case GET_FEE_OVERVIEW_REQUEST:
        case ASSIGN_FEE_STRUCTURE_TOSTUDENT_REQUEST:
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
        case PAY_FEE_BY_CASH_SUCCESS:
        case ASSIGN_FEE_STRUCTURE_TOSTUDENT_SUCCESS:
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
        case GET_FEE_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                feeStudents: action.payload
            }
        case GET_PAID_FEE_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                paidFeeStudents: action.payload
            }
        case GET_UNPAID_FEE_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                unpaidFeeStudents: action.payload
            }
        case GET_FEE_STUDENT_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                feeStudent: action.payload
            }
        case GET_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                students: action.payload
            }
        case GET_PAYMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                payments: action.payload
            }
        case GET_STUDENTS_FEES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                studentsFees: action.payload
            }
        case GET_STUDENT_BYID_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                student: action.payload
            }
        }
        case GET_PAYMENT_BYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                payment: action.payload
            }
        case GET_FEE_OVERVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                feeOverview: action.payload
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
        case GET_FEE_STUDENT_FAILER:
        case GET_PAID_FEE_STUDENT_FAILER:
        case GET_UNPAID_FEE_STUDENT_FAILER:
        case GET_FEE_STUDENT_BYID_FAILER:
        case GET_STUDENT_FAILER:
        case GET_PAYMENT_FAILER:
        case PAY_FEE_BY_CASH_FAILER:
        case GET_STUDENTS_FEES_FAILER:
        case GET_STUDENT_BYID_FAILER:
        case GET_PAYMENT_BYID_FAILER:
        case GET_FEE_OVERVIEW_FAILER:
        case ASSIGN_FEE_STRUCTURE_TOSTUDENT_FAILER:
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