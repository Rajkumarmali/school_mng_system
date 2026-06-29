import {
    CREATE_COLLEGE_FAILER, CREATE_COLLEGE_REQUEST, CREATE_COLLEGE_SUCCESS, DELETE_COLLEGE_FAILER, DELETE_COLLEGE_REQUEST, DELETE_COLLEGE_SUCCESS, GET_COLLEGE_BYID_FAILER,
    GET_COLLEGE_BYID_REQUEST, GET_COLLEGE_BYID_SUCCESS, GET_COLLEGE_FAILER, GET_COLLEGE_REQUEST, GET_COLLEGE_SUCCESS,
    UPDATE_COLLEGE_FAILER, UPDATE_COLLEGE_REQUEST, UPDATE_COLLEGE_SUCCESS
} from "./ActionType";

const BASE_API = process.env.REACT_APP_BASE_URL;

export const getAllCollege = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/get-college?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COLLEGE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_COLLEGE_FAILER, payload: err.message })
    }
}

export const createCollege = (collegeData) => async (dispatch) => {
    dispatch({ type: CREATE_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/create-college`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(collegeData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_COLLEGE_FAILER, payload: err.message })
    }
}

export const getCollegeById = (id) => async (dispatch) => {
    dispatch({ type: GET_COLLEGE_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/get-college/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_COLLEGE_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COLLEGE_BYID_FAILER, payload: err.message })
    }
}

export const updateCollege = (id, collegeData) => async (dispatch) => {
    dispatch({ type: UPDATE_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/update-college/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(collegeData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_COLLEGE_FAILER, payload: err.message })
    }
}

export const deleteCollege = (collegeId) => async (dispatch) => {
    dispatch({ type: DELETE_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/delete-college/${collegeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: DELETE_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_COLLEGE_FAILER, payload: err.message })
    }
}
