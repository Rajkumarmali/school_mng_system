import { ASSIGN_SCHOLARSHIP_TOSTUDENT_FAILER, ASSIGN_SCHOLARSHIP_TOSTUDENT_REQUEST, ASSIGN_SCHOLARSHIP_TOSTUDENT_SUCCESS, CREATE_SCHOLARSHIP_FAILER, CREATE_SCHOLARSHIP_REQUEST, CREATE_SCHOLARSHIP_SUCCESS, GET_SCHOLARSHIP_BYID_FAILER, GET_SCHOLARSHIP_BYID_REQUEST, GET_SCHOLARSHIP_BYID_SUCCESS, GET_SCHOLARSHIP_FAILER, GET_SCHOLARSHIP_REQUEST, GET_SCHOLARSHIP_SUCCESS, GET_STUDENT_SCHOLARSHIP_FAILER, GET_STUDENT_SCHOLARSHIP_REQUEST, GET_STUDENT_SCHOLARSHIP_SUCCESS, REMOVE_STUDENT_FROM_SCHOLARSHIP_FAILER, REMOVE_STUDENT_FROM_SCHOLARSHIP_REQUEST, REMOVE_STUDENT_FROM_SCHOLARSHIP_SUCCESS, UPDATE_SCHOLARSHIP_FAILER, UPDATE_SCHOLARSHIP_REQUEST, UPDATE_SCHOLARSHIP_SUCCESS } from "./ActionType"


const BASE_API = process.env.REACT_APP_BASE_URL + '/scholarship';

export const createScholarship = (scholarshipData) => async (dispatch) => {
    dispatch({ type: CREATE_SCHOLARSHIP_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(scholarshipData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_SCHOLARSHIP_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_SCHOLARSHIP_FAILER, payload: err.message })
    }
}


export const updateScholarship = (scholarshipId, scholarshipData) => async (dispatch) => {
    dispatch({ type: UPDATE_SCHOLARSHIP_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/${scholarshipId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(scholarshipData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_SCHOLARSHIP_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_SCHOLARSHIP_FAILER, payload: err.message })
    }
}

export const assignScholarshipToStudents = (scholarshipId, students) => async (dispatch) => {
    dispatch({ type: ASSIGN_SCHOLARSHIP_TOSTUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/assign/student/${scholarshipId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(students)
        })
        const data = await res.json();
        dispatch({ type: ASSIGN_SCHOLARSHIP_TOSTUDENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: ASSIGN_SCHOLARSHIP_TOSTUDENT_FAILER, payload: err.message })
    }
}

export const removeStudentFromScholarship = (scholarshipId, studentId) => async (dispatch) => {
    dispatch({ type: REMOVE_STUDENT_FROM_SCHOLARSHIP_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/remove/student/${studentId}/${scholarshipId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: REMOVE_STUDENT_FROM_SCHOLARSHIP_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: REMOVE_STUDENT_FROM_SCHOLARSHIP_FAILER, payload: err.message })
    }
}

export const getScholarship = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_SCHOLARSHIP_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_SCHOLARSHIP_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SCHOLARSHIP_FAILER, payload: err.message })
    }
}

export const getScholarshipById = (scholarshipId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_SCHOLARSHIP_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/scholarship/student/${scholarshipId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_SCHOLARSHIP_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SCHOLARSHIP_BYID_FAILER, payload: err.message })
    }
}

export const getStudentScholarship = (studentId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_SCHOLARSHIP_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/student/scholarship/${studentId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_SCHOLARSHIP_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_SCHOLARSHIP_FAILER, payload: err.message })
    }
}