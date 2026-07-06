import { CREATE_FEE_TYPE_FAILER, CREATE_FEE_TYPE_REQUEST, CREATE_FEE_TYPE_SUCCESS, DELETE_FEE_TYPE_REQUEST, DELETE_FEE_TYPE_SUCCESS, GET_FEE_TYPE_BYID_FAILER, GET_FEE_TYPE_BYID_REQUEST, GET_FEE_TYPE_BYID_SUCCESS, GET_FEE_TYPE_FAILER, GET_FEE_TYPE_REQUEST, GET_FEE_TYPE_SUCCESS, UPDATE_FEE_TYPE_FAILER, UPDATE_FEE_TYPE_REQUEST, UPDATE_FEE_TYPE_SUCCESS } from "./ActionType";

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