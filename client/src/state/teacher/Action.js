import {
    CREATE_TEACHER_FALIER, CREATE_TEACHER_REQUEST, DELETE_TEACHER_FALIER, DELETE_TEACHER_REQUEST,
    DELETE_TEACHER_SUCCESS, GET_ALL_TEACHER_FALIER, GET_ALL_TEACHER_REQUEST, GET_ALL_TEACHER_SUCCESS,
    GET_TEACHER_BYID_FALIER, GET_TEACHER_BYID_REQUEST, GET_TEACHER_BYID_SUCCESS, UPDATE_TEACHER_FALIER,
    UPDATE_TEACHER_IMAGE_FALIER,
    UPDATE_TEACHER_IMAGE_REQUEST,
    UPDATE_TEACHER_IMAGE_SUCCESS,
    UPDATE_TEACHER_REQUEST, UPDATE_TEACHER_SUCCESS
} from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL;

export const createTeacher = (teacherData, image) => async (dispatch) => {
    dispatch({ type: CREATE_TEACHER_REQUEST })
    try {
        const formData = new FormData();
        formData.append("image", image)
        formData.append("teacher",
            new Blob(
                [JSON.stringify(teacherData)],
                { type: "application/json" }
            )
        )

        const res = await fetch(`${BASE_API}/teacher/create-teacher`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData
        })
        const data = res.json();
        dispatch({ type: CREATE_TEACHER_FALIER, payload: data });
    } catch (err) {
        dispatch({ type: CREATE_TEACHER_FALIER, payload: err.message })
    }
}


export const getAllTeacher = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_ALL_TEACHER_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/teacher/get-allteachers?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
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
        const res = await fetch(`${BASE_API}/teacher/get-teacherbyid/${teacherId}`, {
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
        const res = await fetch(`${BASE_API}/teacher/update-teacher/${teacherId}`, {
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
        const res = await fetch(`${BASE_API}/teacher/delete-teacher/${teacherId}`, {
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

export const updateImage = (teacherId, image) => async (dispatch) => {
    dispatch({ type: UPDATE_TEACHER_IMAGE_REQUEST })
    try {
        const formData = new FormData();
        formData.append("image", image);
        const res = await fetch(`${BASE_API}/teacher/update-image/${teacherId}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData,
        })
        const data = res.json();
        dispatch({ type: UPDATE_TEACHER_IMAGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_TEACHER_IMAGE_FALIER, payload: err.message })
    }
}