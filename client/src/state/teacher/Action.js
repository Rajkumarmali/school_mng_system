import {
    CREATE_TEACHER_FALIER, CREATE_TEACHER_REQUEST, DELETE_TEACHER_FALIER, DELETE_TEACHER_REQUEST,
    DELETE_TEACHER_SUCCESS, GET_ALL_TEACHER_FALIER, GET_ALL_TEACHER_REQUEST, GET_ALL_TEACHER_SUCCESS,
    GET_TEACHER_BYID_FALIER, GET_TEACHER_BYID_REQUEST, GET_TEACHER_BYID_SUCCESS, UPDATE_TEACHER_FALIER,
    UPDATE_TEACHER_REQUEST, UPDATE_TEACHER_SUCCESS
} from "./ActionType"


export const createTeacher = (teacherData) => async (dispatch) => {
    dispatch({ type: CREATE_TEACHER_REQUEST })
    try {
        const res = await fetch("http://localhost:8080/api/teacher/create-teacher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(teacherData)
        })
        const data = res.json();
        dispatch({ type: CREATE_TEACHER_FALIER, payload: data });
    } catch (err) {
        dispatch({ type: CREATE_TEACHER_FALIER, payload: err.message })
    }
}


export const getAllTeacher = () => async (dispatch) => {
    dispatch({ type: GET_ALL_TEACHER_REQUEST })
    try {
        const res = await fetch("http://localhost:8080/api/teacher/get-allteachers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_ALL_TEACHER_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_ALL_TEACHER_FALIER, payload: err.message })
    }
}

export const getTeacherById = (teacherId) => async (dispatch) => {
    dispatch({ type: GET_TEACHER_BYID_REQUEST })
    try {
        const res = await fetch(`http://localhost:8080/api/teacher/get-teacherbyid/${teacherId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_TEACHER_BYID_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_TEACHER_BYID_FALIER, payload: err.message })
    }
}

export const updateTeacher = (teacherId, teacherData) => async (dispatch) => {
    dispatch({ type: UPDATE_TEACHER_REQUEST })
    try {
        const res = await fetch(`http://localhost:8080/api/teacher/update-teacher/${teacherId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(teacherData)
        })
        const data = res.json();
        dispatch({ type: UPDATE_TEACHER_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: UPDATE_TEACHER_FALIER, payload: err.message })
    }
}

export const deleteTeacher = (teacherId) => async (dispatch) => {
    dispatch({ type: DELETE_TEACHER_REQUEST })
    try {
        const res = await fetch(`http://localhost:8080/api/teacher/delete-teacher/${teacherId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = res.json();
        dispatch({ type: DELETE_TEACHER_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: DELETE_TEACHER_FALIER, payload: err.message })
    }
}