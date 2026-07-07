import { CREATE_FEE_STRUCTURE_FAILER, CREATE_FEE_STRUCTURE_REQUEST, CREATE_FEE_STRUCTURE_SUCCESS, CREATE_FEE_TYPE_FAILER, CREATE_FEE_TYPE_REQUEST, CREATE_FEE_TYPE_SUCCESS, DELETE_FEE_STRUCTURE_FAILER, DELETE_FEE_STRUCTURE_REQUEST, DELETE_FEE_STRUCTURE_SUCCESS, DELETE_FEE_TYPE_REQUEST, DELETE_FEE_TYPE_SUCCESS, GET_FEE_STRUCTURE_BYID_FAILER, GET_FEE_STRUCTURE_BYID_REQUEST, GET_FEE_STRUCTURE_BYID_SUCCESS, GET_FEE_STRUCTURE_FAILER, GET_FEE_STRUCTURE_REQUEST, GET_FEE_STRUCTURE_SUCCESS, GET_FEE_TYPE_BYID_FAILER, GET_FEE_TYPE_BYID_REQUEST, GET_FEE_TYPE_BYID_SUCCESS, GET_FEE_TYPE_FAILER, GET_FEE_TYPE_REQUEST, GET_FEE_TYPE_SUCCESS, UPDATE_FEE_STRUCTURE_FAILER, UPDATE_FEE_STRUCTURE_REQUEST, UPDATE_FEE_STRUCTURE_SUCCESS, UPDATE_FEE_TYPE_FAILER, UPDATE_FEE_TYPE_REQUEST, UPDATE_FEE_TYPE_SUCCESS } from "./ActionType";

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