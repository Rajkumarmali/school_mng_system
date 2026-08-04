import { CREATE_SUBJECT_FAILER, CREATE_SUBJECT_REQUEST, CREATE_SUBJECT_SUCCESS, GET_SUBJECT_BYID_FAILER, GET_SUBJECT_BYID_REQUEST, GET_SUBJECT_BYID_SUCCESS, GET_SUBJECT_FAILER, GET_SUBJECT_REQUEST, GET_SUBJECT_SUCCESS, UPDATE_SUBJECT_FAILER, UPDATE_SUBJECT_REQUEST, UPDATE_SUBJECT_SUCCESS } from "./ActionType";

const BASE_API = process.env.REACT_APP_BASE_URL + "/subject";

export const createSubject = (courseId, subjectData) => async (dispatch) => {
    dispatch({ type: CREATE_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create/${courseId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(subjectData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_SUBJECT_FAILER, payload: err.message })
    }
}

export const updateSubject = (subjectId, subjectData) => async (dispatch) => {
    dispatch({ type: UPDATE_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/${subjectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(subjectData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_SUBJECT_FAILER, payload: err.message })
    }
}

export const getSubjects = (courseId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/${courseId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SUBJECT_FAILER, payload: err.message })
    }
}

export const getSubjectById = (subjectId) => async (dispatch) => {
    dispatch({ type: GET_SUBJECT_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/byid/${subjectId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_SUBJECT_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SUBJECT_BYID_FAILER, payload: err.message })
    }
}