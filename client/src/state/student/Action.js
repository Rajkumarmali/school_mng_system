import {
    CREATE_STUDENT_FAILER, CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, DELETE_STUDENT_FAILER,
    DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, GET_ALLSTUDENT_FAILER, GET_ALLSTUDENT_REQUEST,
    GET_ALLSTUDENT_SUCCESS, GET_STUDENT_BYID_FAILER, GET_STUDENT_BYID_REQUEST, GET_STUDENT_BYID_SUCCESS,
    UPDATE_STUDENT_FAILER, UPDATE_STUDENT_REQUEST, UPDATE_STUDENT_SUCCESS
} from "./ActionType"

export const createStudent = (studentData) => async (dispatch) => {
    dispatch({ type: CREATE_STUDENT_REQUEST })
    try {
        const res = await fetch("http://localhost:8080/api/student/create-student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_STUDENT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: CREATE_STUDENT_FAILER, payload: err.message })
    }
}

export const getAllStudent = () => async (dispatch) => {
    dispatch({ type: GET_ALLSTUDENT_REQUEST })
    try {
        const res = await fetch("http://localhost:8080/api/student/get-allstudent", {
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
        const res = await fetch(`http://localhost:8080/api/student/get-studentbyid/${studentId}`, {
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
        const res = await fetch(`http://localhost:8080/api/student/update-student/${studentId}`, {
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
        const res = await fetch(`http://localhost:8080/api/student/delete-student/${studentId}`, {
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

