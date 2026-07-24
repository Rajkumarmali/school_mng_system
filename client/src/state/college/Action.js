import {
    CREATE_COLLEGE_FAILER, CREATE_COLLEGE_REQUEST, CREATE_COLLEGE_SUCCESS, DELETE_COLLEGE_FAILER, DELETE_COLLEGE_REQUEST, DELETE_COLLEGE_SUCCESS, GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_FAILER, GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_REQUEST, GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_SUCCESS, GET_COLLEGE_BYID_FAILER,
    GET_COLLEGE_BYID_REQUEST, GET_COLLEGE_BYID_SUCCESS, GET_COLLEGE_FAILER, GET_COLLEGE_REQUEST, GET_COLLEGE_SUCCESS,
    GET_COLLEGES_ADMISSION_FAILER,
    GET_COLLEGES_ADMISSION_REQUEST,
    GET_COLLEGES_ADMISSION_SUCCESS,
    GET_COLLEGES_STUDENTS_FAILER,
    GET_COLLEGES_STUDENTS_REQUEST,
    GET_COLLEGES_STUDENTS_SUCCESS,
    GET_COLLEGES_STUDENTSBYID_FAILER,
    GET_COLLEGES_STUDENTSBYID_REQUEST,
    GET_COLLEGES_STUDENTSBYID_SUCCESS,
    UPDATE_COLLEGE_FAILER, UPDATE_COLLEGE_REQUEST, UPDATE_COLLEGE_SUCCESS
} from "./ActionType";

const BASE_API = process.env.REACT_APP_BASE_URL;

export const getAllCollege = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/get-college?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COLLEGE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_COLLEGE_FAILER, payload: err.message })
    }
}

export const createCollege = (collegeData) => async (dispatch) => {
    dispatch({ type: CREATE_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/create-college`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(collegeData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_COLLEGE_FAILER, payload: err.message })
    }
}

export const getCollegeById = (id) => async (dispatch) => {
    dispatch({ type: GET_COLLEGE_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/get-college/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_COLLEGE_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COLLEGE_BYID_FAILER, payload: err.message })
    }
}

export const updateCollege = (id, collegeData) => async (dispatch) => {
    dispatch({ type: UPDATE_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/update-college/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(collegeData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_COLLEGE_FAILER, payload: err.message })
    }
}

export const deleteCollege = (collegeId) => async (dispatch) => {
    dispatch({ type: DELETE_COLLEGE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/delete-college/${collegeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: DELETE_COLLEGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_COLLEGE_FAILER, payload: err.message })
    }
}

export const getCollegesStudents = (collegeId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COLLEGES_STUDENTS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/get/college/students/${collegeId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_COLLEGES_STUDENTS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COLLEGES_STUDENTS_FAILER, payload: err.message })
    }
}

export const getCollegeAdmission = (collegeId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_COLLEGES_ADMISSION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/get/college/admission/${collegeId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_COLLEGES_ADMISSION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COLLEGES_ADMISSION_FAILER, payload: err.message })
    }
}

export const getCollegeStudentById = (studentId) => async (dispatch) => {
    dispatch({ type: GET_COLLEGES_STUDENTSBYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/get/studentbyid/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_COLLEGES_STUDENTSBYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_COLLEGES_STUDENTSBYID_FAILER, payload: err.message })
    }
}

export const generateStudentEnrollmentAndRollnumber = (studentId) => async (dispatch) => {
    dispatch({ type: GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/college/generate/enrollmentandroll/${studentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GENERATE_STUDENT_ENROLLMENT_AND_ROLLNUM_FAILER, payload: err.message })
    }
}