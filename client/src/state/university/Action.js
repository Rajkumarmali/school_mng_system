import { GET_UNIVERSITY_ADMISSION_FAILER, GET_UNIVERSITY_ADMISSION_REQUEST, GET_UNIVERSITY_ADMISSION_SUCCESS, GET_UNIVERSITY_FAILER, GET_UNIVERSITY_REQUEST, GET_UNIVERSITY_STUDENT_BY_ID_FAILER, GET_UNIVERSITY_STUDENT_BY_ID_REQUEST, GET_UNIVERSITY_STUDENT_BY_ID_SUCCESS, GET_UNIVERSITY_STUDENT_FAILER, GET_UNIVERSITY_STUDENT_REQUEST, GET_UNIVERSITY_STUDENT_SUCCESS, GET_UNIVERSITY_SUCCESS } from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL + "/university";
export const getUniversity = () => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_FAILER, payload: err.message })
    }
}

export const getUniversityStudent = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/students?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_STUDENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_STUDENT_FAILER, payload: err.message })
    }
}

export const getUniversityAdmission = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_ADMISSION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/admission/students?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_ADMISSION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_ADMISSION_FAILER, payload: err.message })
    }
}

export const getUniversityStudentById = (studentId) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_STUDENT_BY_ID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/student/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_STUDENT_BY_ID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_STUDENT_BY_ID_FAILER, payload: err.message })
    }
}