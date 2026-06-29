import {
    CREATE_STUDENT_FAILER, CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, DELETE_STUDENT_FAILER,
    DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, GET_ALLSTUDENT_FAILER, GET_ALLSTUDENT_REQUEST,
    GET_ALLSTUDENT_SUCCESS, GET_STUDENT_BYID_FAILER, GET_STUDENT_BYID_REQUEST, GET_STUDENT_BYID_SUCCESS,
    UPDATE_STUDENT_FAILER, UPDATE_STUDENT_IMAGE_FAILER, UPDATE_STUDENT_IMAGE_REQUEST, UPDATE_STUDENT_IMAGE_SUCCESS, UPDATE_STUDENT_REQUEST, UPDATE_STUDENT_SUCCESS
} from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL;

export const createStudent = (studentData, image) => async (dispatch) => {
    dispatch({ type: CREATE_STUDENT_REQUEST })
    try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("student", (
            new Blob(
                [JSON.stringify(studentData)],
                { type: "application/json" }
            )
        ))
        const res = await fetch(`${BASE_API}/student/create-student`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData
        })
        const data = await res.json();
        dispatch({ type: CREATE_STUDENT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: CREATE_STUDENT_FAILER, payload: err.message })
    }
}

export const getAllStudent = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_ALLSTUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/student/get-allstudent?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_ALLSTUDENT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_ALLSTUDENT_FAILER, payload: err.message })
    }
}

export const getStudentById = (studentId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/student/get-studentbyid/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_BYID_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_STUDENT_BYID_FAILER, payload: err.message })
    }
}

export const updateStudent = (studentId, studentData) => async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/student/update-student/${studentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: UPDATE_STUDENT_FAILER, payload: err.message })
    }
}

export const deleteStudent = (studentId) => async (dispatch) => {
    dispatch({ type: DELETE_STUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/student/delete-student/${studentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: DELETE_STUDENT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: DELETE_STUDENT_FAILER, payload: err.message })
    }
}

export const updateStudentImage = (studentId, image) => async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_IMAGE_REQUEST })
    try {
        const formData = new FormData();
        formData.append("image", image);
        const res = await fetch(`${BASE_API}/student/update-image/${studentId}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData
        })
        const data = await res.json();
        dispatch({ type: UPDATE_STUDENT_IMAGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_STUDENT_IMAGE_FAILER, payload: err.message })
    }
}