import {
    CREATE_DEPARTMENT_FAILER, CREATE_DEPARTMENT_REQUEST, CREATE_DEPARTMENT_SUCCESS, DELETE_DEPARTMENT_FAILER,
    DELETE_DEPARTMENT_REQUEST, DELETE_DEPARTMENT_SUCCESS, GET_DEPARTMENT_BYID_FAILER, GET_DEPARTMENT_BYID_REQUEST,
    GET_DEPARTMENT_BYID_SUCCESS, GET_DEPARTMENT_FAILER, GET_DEPARTMENT_REQUEST, GET_DEPARTMENT_SUCCESS,
    GET_DEPARTMENTS_CLASSES_FAILER, GET_DEPARTMENTS_CLASSES_REQUEST, GET_DEPARTMENTS_CLASSES_SUCCESS,
    GET_DEPARTMENTS_STUDENT_FAILER,
    GET_DEPARTMENTS_STUDENT_REQUEST,
    GET_DEPARTMENTS_STUDENT_SUCCESS,
    GET_DEPARTMENTS_TEACHER_FAILER,
    GET_DEPARTMENTS_TEACHER_REQUEST,
    GET_DEPARTMENTS_TEACHER_SUCCESS,
    UPDATE_DEPARTMENT_FAILER, UPDATE_DEPARTMENT_REQUEST, UPDATE_DEPARTMENT_SUCCESS
} from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL;
export const createDepartment = (departmentData) => async (dispatch) => {
    dispatch({ type: CREATE_DEPARTMENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/department/create-department`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(departmentData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_DEPARTMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_DEPARTMENT_FAILER, payload: err.message })
    }
}

export const updateDepartment = (departmentId, departmentData) => async (dispatch) => {
    dispatch({ type: UPDATE_DEPARTMENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/department/update-department/${departmentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(departmentData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_DEPARTMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_DEPARTMENT_FAILER, payload: err.message })
    }
}

export const getAllDepartment = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/department/getall-department?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_DEPARTMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_DEPARTMENT_FAILER, payload: err.message })
    }
}

export const getDepartmentById = (departmentId) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENT_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/department/get-departmentbyid/${departmentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_DEPARTMENT_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_DEPARTMENT_BYID_FAILER, payload: err.message })
    }
}

export const deleteDepartment = (departmentId) => async (dispatch) => {
    dispatch({ type: DELETE_DEPARTMENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/department/delete-department/${departmentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: DELETE_DEPARTMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_DEPARTMENT_FAILER, payload: err.message })
    }
}

export const getDepartmentTeacher = (departmentId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENTS_TEACHER_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/department/get-departments-teacher/${departmentId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_DEPARTMENTS_TEACHER_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_DEPARTMENTS_TEACHER_FAILER, payload: err.message })
    }
}

export const getDepartmentStudent = (departmentId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENTS_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/department/get-departments-student/${departmentId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_DEPARTMENTS_STUDENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_DEPARTMENTS_STUDENT_FAILER, payload: err.message })
    }
}

export const getDepartmentClass = (departmentId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENTS_CLASSES_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/department/get-departments-class/${departmentId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_DEPARTMENTS_CLASSES_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_DEPARTMENTS_CLASSES_FAILER, payload: err.message })
    }
}