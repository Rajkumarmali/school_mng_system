import {
    ADD_STUDENT_IN_CLASS_FAILER,
    ADD_STUDENT_IN_CLASS_REQUEST,
    ADD_STUDENT_IN_CLASS_SUCCESS,
    CREATE_CLASS_FAILER, CREATE_CLASS_REQUEST, CREATE_CLASS_SUCCESS, DELETE_CLASS_FAILER, DELETE_CLASS_REQUEST,
    DELETE_CLASS_SUCCESS, DELETE_STUDENT_FROM_CLASS_FAILER, DELETE_STUDENT_FROM_CLASS_REQUEST, DELETE_STUDENT_FROM_CLASS_SUCCESS, GET_ALL_CLASS_FAILER, GET_ALL_CLASS_REQUEST, GET_ALL_CLASS_SUCCESS, GET_CLASS_BYID_FAILER,
    GET_CLASS_BYID_REQUEST, GET_CLASS_BYID_SUCCESS, GET_DEPARTMENTS_ALL_CLASS_FAILER, GET_DEPARTMENTS_ALL_CLASS_REQUEST,
    GET_DEPARTMENTS_ALL_CLASS_SUCCESS, GET_STUDENT_FROM_CLASS_FAILER, GET_STUDENT_FROM_CLASS_REQUEST, GET_STUDENT_FROM_CLASS_SUCCESS, UPDATE_CLASS_FAILER, UPDATE_CLASS_REQUEST, UPDATE_CLASS_SUCCESS
} from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL;
export const createClass = (classData) => async (dispatch) => {
    dispatch({ type: CREATE_CLASS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(classData)
        })
        const data = await res.json()
        dispatch({ type: CREATE_CLASS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_CLASS_FAILER, payload: err.message })
    }
}

export const getAllClass = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_ALL_CLASS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/get-allclasses?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_ALL_CLASS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_ALL_CLASS_FAILER, payload: err.message })
    }
}

export const getAllDepartmentsClass = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENTS_ALL_CLASS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/get-alldepartments-classes?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_DEPARTMENTS_ALL_CLASS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_DEPARTMENTS_ALL_CLASS_FAILER, payload: err.message })
    }
}

export const getClassById = (classId) => async (dispatch) => {
    dispatch({ type: GET_CLASS_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/get-byid/${classId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_CLASS_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_CLASS_BYID_FAILER, payload: err.message })
    }
}

export const updateClass = (classId, classData) => async (dispatch) => {
    dispatch({ type: UPDATE_CLASS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/update/${classId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(classData)
        })
        const data = await res.json()
        dispatch({ type: UPDATE_CLASS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_CLASS_FAILER, payload: err.message })
    }
}

export const deleteClass = (classId) => async (dispatch) => {
    dispatch({ type: DELETE_CLASS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/delete/${classId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: DELETE_CLASS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_CLASS_FAILER, payload: err.message })
    }
}

export const addStudentInClass = (classId, studentData) => async (dispatch) => {
    dispatch({ type: ADD_STUDENT_IN_CLASS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/add-studentinclass/${classId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentData)
        })
        const data = await res.json();
        dispatch({ type: ADD_STUDENT_IN_CLASS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: ADD_STUDENT_IN_CLASS_FAILER, payload: err.message })
    }
}

export const getStudentsFromClass = (classId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_FROM_CLASS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/get-studentfromclass/${classId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_FROM_CLASS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_FROM_CLASS_FAILER, payload: err.message })
    }
}

export const deleteStudentFromClass = (classId, studentId) => async (dispatch) => {
    dispatch({ type: DELETE_STUDENT_FROM_CLASS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/class/delete-studentfromclass/${classId}/${studentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: DELETE_STUDENT_FROM_CLASS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: DELETE_STUDENT_FROM_CLASS_FAILER, payload: err.message })
    }
}