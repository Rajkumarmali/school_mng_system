import {
    CREATE_FEE_STRUCTURE_FAILER, CREATE_FEE_STRUCTURE_REQUEST, CREATE_FEE_STRUCTURE_SUCCESS, CREATE_FEE_TYPE_FAILER,
    CREATE_FEE_TYPE_REQUEST, CREATE_FEE_TYPE_SUCCESS, DELETE_FEE_STRUCTURE_FAILER, DELETE_FEE_STRUCTURE_REQUEST,
    DELETE_FEE_STRUCTURE_SUCCESS, DELETE_FEE_TYPE_REQUEST, DELETE_FEE_TYPE_SUCCESS, GET_FEE_STRUCTURE_BYID_FAILER,
    GET_FEE_STRUCTURE_BYID_REQUEST, GET_FEE_STRUCTURE_BYID_SUCCESS, GET_FEE_STRUCTURE_FAILER, GET_FEE_STRUCTURE_REQUEST,
    GET_FEE_STRUCTURE_SUCCESS, GET_FEE_STUDENT_BYID_FAILER, GET_FEE_STUDENT_BYID_REQUEST, GET_FEE_STUDENT_BYID_SUCCESS,
    GET_FEE_STUDENT_FAILER, GET_FEE_STUDENT_REQUEST, GET_FEE_STUDENT_SUCCESS,
    GET_FEE_TYPE_BYID_FAILER, GET_FEE_TYPE_BYID_REQUEST, GET_FEE_TYPE_BYID_SUCCESS, GET_FEE_TYPE_FAILER, GET_FEE_TYPE_REQUEST,
    GET_FEE_TYPE_SUCCESS, GET_PAID_FEE_STUDENT_FAILER, GET_PAID_FEE_STUDENT_REQUEST, GET_PAID_FEE_STUDENT_SUCCESS,
    GET_PAYMENT_FAILER, GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS, GET_STUDENT_BYID_FAILER, GET_STUDENT_BYID_REQUEST,
    GET_STUDENT_BYID_SUCCESS, GET_STUDENT_FAILER, GET_STUDENT_REQUEST, GET_STUDENT_SUCCESS,
    GET_STUDENTS_FEES_FAILER, GET_STUDENTS_FEES_REQUEST, GET_STUDENTS_FEES_SUCCESS,
    GET_UNPAID_FEE_STUDENT_FAILER, GET_UNPAID_FEE_STUDENT_REQUEST, GET_UNPAID_FEE_STUDENT_SUCCESS, PAY_FEE_BY_CASH_FAILER,
    PAY_FEE_BY_CASH_REQUEST, PAY_FEE_BY_CASH_SUCCESS, UPDATE_FEE_STRUCTURE_FAILER,
    UPDATE_FEE_STRUCTURE_REQUEST, UPDATE_FEE_STRUCTURE_SUCCESS, UPDATE_FEE_TYPE_FAILER, UPDATE_FEE_TYPE_REQUEST,
    UPDATE_FEE_TYPE_SUCCESS
} from "./ActionType";

const BASE_API = process.env.REACT_APP_BASE_URL;
export const createFeeType = (feeTypeData) => async (dispatch) => {
    dispatch({ type: CREATE_FEE_TYPE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(feeTypeData)
        })
        const data = res.json();
        dispatch({ type: CREATE_FEE_TYPE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_FEE_TYPE_FAILER, payload: err.message })
    }
}

export const updateFeeType = (feeTypeId, feeTypeData) => async (dispatch) => {
    dispatch({ type: UPDATE_FEE_TYPE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/update/${feeTypeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(feeTypeData)
        })
        const data = res.json();
        dispatch({ type: UPDATE_FEE_TYPE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_FEE_TYPE_FAILER, payload: err.message })
    }
}

export const getAllFeeType = () => async (dispatch) => {
    dispatch({ type: GET_FEE_TYPE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_FEE_TYPE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_FEE_TYPE_FAILER, payload: err.message })
    }
}

export const getFeeTypeById = (feeTypeId) => async (dispatch) => {
    dispatch({ type: GET_FEE_TYPE_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-byid/${feeTypeId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_FEE_TYPE_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_FEE_TYPE_BYID_FAILER, payload: err.message })
    }
}

export const deleteFeeType = (feeTypeId) => async (dispatch) => {
    dispatch({ type: DELETE_FEE_TYPE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/delete/${feeTypeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = res.json();
        dispatch({ type: DELETE_FEE_TYPE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_FEE_TYPE_REQUEST, payload: err.message })
    }
}

export const createFeeStructure = (feeStructureData) => async (dispatch) => {
    dispatch({ type: CREATE_FEE_STRUCTURE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/create-feestructure`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(feeStructureData)
        })
        const data = await res.JSON();
        dispatch({ type: CREATE_FEE_STRUCTURE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: CREATE_FEE_STRUCTURE_FAILER, payload: err.message })
    }
}

export const updateFeeStructure = (feeStructureId, feeStructureData) => async (dispatch) => {
    dispatch({ type: UPDATE_FEE_STRUCTURE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/update-feestructure/${feeStructureId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(feeStructureData)
        })
        const data = await res.JSON();
        dispatch({ type: UPDATE_FEE_STRUCTURE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: UPDATE_FEE_STRUCTURE_FAILER, payload: err.message })
    }
}

export const getAllFeeStructure = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_FEE_STRUCTURE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-all-feestructure?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_FEE_STRUCTURE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_FEE_STRUCTURE_FAILER, payload: err.message })
    }
}

export const getFeeStructureById = (feeStructureId) => async (dispatch) => {
    dispatch({ type: GET_FEE_STRUCTURE_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-feestructurebyid/${feeStructureId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_FEE_STRUCTURE_BYID_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_FEE_STRUCTURE_BYID_FAILER, payload: err.message })
    }
}

export const deleteFeeStructure = (feeStructureId) => async (dispatch) => {
    dispatch({ type: DELETE_FEE_STRUCTURE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-deletefeestructure/${feeStructureId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: DELETE_FEE_STRUCTURE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: DELETE_FEE_STRUCTURE_FAILER, payload: err.message })
    }
}

export const getAllFeeStudent = (feeStructureId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_FEE_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-feestudent/${feeStructureId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_FEE_STUDENT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_FEE_STUDENT_FAILER, payload: err.message })
    }
}

export const getAllPaidFeeStudent = (feeStructureId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_PAID_FEE_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-paid-feestudent/${feeStructureId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_PAID_FEE_STUDENT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_PAID_FEE_STUDENT_FAILER, payload: err.message })
    }
}

export const getAllUnpaidFeeStudent = (feeStructureId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_UNPAID_FEE_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-unpaid-feestudent/${feeStructureId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_UNPAID_FEE_STUDENT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_UNPAID_FEE_STUDENT_FAILER, payload: err.message })
    }
}

export const getFeeStudentById = (feeStudentId) => async (dispatch) => {
    dispatch({ type: GET_FEE_STUDENT_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-studentfee-byid/${feeStudentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_FEE_STUDENT_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_FEE_STUDENT_BYID_FAILER, payload: err.message })
    }
}

export const getStudents = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-students?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_FAILER, payload: err.message })
    }
}

export const getStudentById = (studentId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-studentbyid/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_BYID_FAILER, payload: err.message })
    }
}

export const getPayments = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_PAYMENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-payments?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_PAYMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_PAYMENT_FAILER, payload: err.message })
    }
}

export const payFeeByCash = (studentFeeId) => async (dispatch) => {
    dispatch({ type: PAY_FEE_BY_CASH_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/pay-feebycash/${studentFeeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: PAY_FEE_BY_CASH_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: PAY_FEE_BY_CASH_FAILER, payload: err.message })
    }
}

export const getStudentsFees = (studentId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENTS_FEES_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-studentfeebystudentid/${studentId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENTS_FEES_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENTS_FEES_FAILER, payload: err.message })
    }
}