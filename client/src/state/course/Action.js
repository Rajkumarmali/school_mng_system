import { CREATE_COURSE_FAILER, CREATE_COURSE_REQUEST, CREATE_COURSE_SUCCESS, GET_ALL_COURSE_FAILER, GET_ALL_COURSE_REQUEST, GET_ALL_COURSE_SUCCESS, GET_COURSE_BY_COLLEGE_FAILER, GET_COURSE_BY_COLLEGE_REQUEST, GET_COURSE_BY_COLLEGE_SUCCESS, GET_COURSE_BYID_FAILER, GET_COURSE_BYID_REQUEST, GET_COURSE_BYID_SUCCESS, GET_COURSE_DEPARTMENT_FAILER, GET_COURSE_DEPARTMENT_FOR_COLLEGE_FAILER, GET_COURSE_DEPARTMENT_FOR_COLLEGE_REQUEST, GET_COURSE_DEPARTMENT_FOR_COLLEGE_SUCCESS, GET_COURSE_DEPARTMENT_REQUEST, GET_COURSE_DEPARTMENT_SUCCESS, GET_COURSE_STUDENT_FAILER, GET_COURSE_STUDENT_FOR_COLLEGE_FAILER, GET_COURSE_STUDENT_FOR_COLLEGE_REQUEST, GET_COURSE_STUDENT_FOR_COLLEGE_SUCCESS, GET_COURSE_STUDENT_REQUEST, GET_COURSE_STUDENT_SUCCESS, UPDATE_COURSE_FAILER, UPDATE_COURSE_REQUEST, UPDATE_COURSE_SUCCESS } from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL + "/course";
export const createCourse = (courseData) => async (dispatch) => {
    dispatch({ type: CREATE_COURSE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(courseData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_COURSE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_COURSE_FAILER, payload: err.message })
    }
}

export const updateCourse = (courseId, courseData) => async (dispatch) => {
    dispatch({ type: UPDATE_COURSE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/${courseId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(courseData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_COURSE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_COURSE_FAILER, payload: err.message })
    }
}

export const getAllCourse = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_ALL_COURSE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/allcourse?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_ALL_COURSE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_ALL_COURSE_FAILER, payload: err.message })
    }
}

export const getCourseByCollege = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COURSE_BY_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/bycollege?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COURSE_BY_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COURSE_BY_COLLEGE_FAILER, payload: err.message })
    }
}

export const getCourseById = (courseId) => async (dispatch) => {
    dispatch({ type: GET_COURSE_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/coursebyid/${courseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COURSE_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COURSE_BYID_FAILER, payload: err.message })
    }
}

export const getDepartmentByCourseId = (courseId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COURSE_DEPARTMENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/all/department/${courseId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COURSE_DEPARTMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COURSE_DEPARTMENT_FAILER, payload: err.message })
    }
}

export const getDepartmentByCourseIdForCollege = (courseId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COURSE_DEPARTMENT_FOR_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/college/department/${courseId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COURSE_DEPARTMENT_FOR_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COURSE_DEPARTMENT_FOR_COLLEGE_FAILER, payload: err.message })
    }
}

export const getStudentByCourseId = (courseId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COURSE_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/all/student/${courseId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COURSE_STUDENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COURSE_STUDENT_FAILER, payload: err.message })
    }
}

export const getStudentByCourseIdForCollege = (courseId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COURSE_STUDENT_FOR_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/college/student/${courseId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COURSE_STUDENT_FOR_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COURSE_STUDENT_FOR_COLLEGE_FAILER, payload: err.message })
    }
}