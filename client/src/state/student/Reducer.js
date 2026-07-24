import {
    CREATE_STUDENT_FAILER, CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, DELETE_STUDENT_DOCUMENT_FAILER, DELETE_STUDENT_DOCUMENT_REQUEST, DELETE_STUDENT_DOCUMENT_SUCCESS, DELETE_STUDENT_FAILER, DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS, GET_ALLSTUDENT_FAILER, GET_ALLSTUDENT_REQUEST, GET_ALLSTUDENT_SUCCESS, GET_STUDENT_BYID_FAILER,
    GET_STUDENT_BYID_REQUEST, GET_STUDENT_BYID_SUCCESS, GET_STUDENT_DOCUMENT_FAILER, GET_STUDENT_DOCUMENT_REQUEST, GET_STUDENT_DOCUMENT_SUCCESS, GET_STUDENT_DOCUMENTBYID_FAILER, GET_STUDENT_DOCUMENTBYID_REQUEST, GET_STUDENT_DOCUMENTBYID_SUCCESS, GET_STUDENTS_FEEOVERVIEW_FAILER, GET_STUDENTS_FEEOVERVIEW_REQUEST, GET_STUDENTS_FEEOVERVIEW_SUCCESS, GET_STUDENTS_PAIDFEE_FAILER, GET_STUDENTS_PAIDFEE_REQUEST, GET_STUDENTS_PAIDFEE_SUCCESS,
    GET_STUDENTS_UNPAIDFEE_FAILER, GET_STUDENTS_UNPAIDFEE_REQUEST, GET_STUDENTS_UNPAIDFEE_SUCCESS, UPDATE_STUDENT_DOCUMENT_FAILER, UPDATE_STUDENT_DOCUMENT_REQUEST, UPDATE_STUDENT_DOCUMENT_STATUS_FAILER, UPDATE_STUDENT_DOCUMENT_STATUS_REQUEST, UPDATE_STUDENT_DOCUMENT_STATUS_SUCCESS, UPDATE_STUDENT_DOCUMENT_SUCCESS, UPDATE_STUDENT_FAILER,
    UPDATE_STUDENT_IMAGE_FAILER, UPDATE_STUDENT_IMAGE_REQUEST, UPDATE_STUDENT_IMAGE_SUCCESS, UPDATE_STUDENT_REQUEST, UPDATE_STUDENT_SUCCESS,
    UPLOAD_STUDENT_DOCUMENT_FAILER,
    UPLOAD_STUDENT_DOCUMENT_REQUEST,
    UPLOAD_STUDENT_DOCUMENT_SUCCESS
} from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    student: null,
    students: null,
    studentPaidFees: null,
    studentUnPaidFees: null,
    studentFeeOverview: null,
    documents: [],
    document: null,
}

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STUDENT_REQUEST:
        case GET_ALLSTUDENT_REQUEST:
        case GET_STUDENT_BYID_REQUEST:
        case UPDATE_STUDENT_REQUEST:
        case DELETE_STUDENT_REQUEST:
        case UPDATE_STUDENT_IMAGE_REQUEST:
        case GET_STUDENTS_PAIDFEE_REQUEST:
        case GET_STUDENTS_UNPAIDFEE_REQUEST:
        case GET_STUDENTS_FEEOVERVIEW_REQUEST:
        case UPLOAD_STUDENT_DOCUMENT_REQUEST:
        case GET_STUDENT_DOCUMENT_REQUEST:
        case UPDATE_STUDENT_DOCUMENT_REQUEST:
        case GET_STUDENT_DOCUMENTBYID_REQUEST:
        case DELETE_STUDENT_DOCUMENT_REQUEST:
        case UPDATE_STUDENT_DOCUMENT_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CREATE_STUDENT_SUCCESS:
        case UPDATE_STUDENT_SUCCESS:
        case DELETE_STUDENT_SUCCESS:
        case UPDATE_STUDENT_IMAGE_SUCCESS:
        case UPLOAD_STUDENT_DOCUMENT_SUCCESS:
        case UPDATE_STUDENT_DOCUMENT_SUCCESS:
        case DELETE_STUDENT_DOCUMENT_SUCCESS:
        case UPDATE_STUDENT_DOCUMENT_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ALLSTUDENT_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                students: action.payload
            }
        case GET_STUDENT_BYID_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                student: action.payload
            }
        case GET_STUDENTS_PAIDFEE_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                studentPaidFees: action.payload
            }
        case GET_STUDENTS_UNPAIDFEE_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                studentUnPaidFees: action.payload
            }
        case GET_STUDENTS_FEEOVERVIEW_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                studentFeeOverview: action.payload
            }
        case GET_STUDENT_DOCUMENT_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                documents: action.payload
            }
        case GET_STUDENT_DOCUMENTBYID_SUCCESS:
            return {
                ...state,
                isLoading: true,
                error: null,
                document: action.payload
            }
        case CREATE_STUDENT_FAILER:
        case GET_ALLSTUDENT_FAILER:
        case GET_STUDENT_BYID_FAILER:
        case UPDATE_STUDENT_FAILER:
        case DELETE_STUDENT_FAILER:
        case UPDATE_STUDENT_IMAGE_FAILER:
        case GET_STUDENTS_PAIDFEE_FAILER:
        case GET_STUDENTS_UNPAIDFEE_FAILER:
        case GET_STUDENTS_FEEOVERVIEW_FAILER:
        case UPLOAD_STUDENT_DOCUMENT_FAILER:
        case GET_STUDENT_DOCUMENT_FAILER:
        case GET_STUDENT_DOCUMENTBYID_FAILER:
        case DELETE_STUDENT_DOCUMENT_FAILER:
        case UPDATE_STUDENT_DOCUMENT_FAILER:
        case UPDATE_STUDENT_DOCUMENT_STATUS_FAILER:
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