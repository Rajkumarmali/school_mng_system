import {
    CREATE_STUDENT_FAILER, CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, DELETE_STUDENT_DOCUMENT_FAILER, DELETE_STUDENT_DOCUMENT_REQUEST, DELETE_STUDENT_DOCUMENT_SUCCESS, DELETE_STUDENT_FAILER,
    DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, GET_ALLSTUDENT_FAILER, GET_ALLSTUDENT_REQUEST,
    GET_ALLSTUDENT_SUCCESS, GET_STUDENT_BYID_FAILER, GET_STUDENT_BYID_REQUEST, GET_STUDENT_BYID_SUCCESS,
    GET_STUDENT_DOCUMENT_FAILER,
    GET_STUDENT_DOCUMENT_REQUEST,
    GET_STUDENT_DOCUMENT_SUCCESS,
    GET_STUDENT_DOCUMENTBYID_FAILER,
    GET_STUDENT_DOCUMENTBYID_REQUEST,
    GET_STUDENT_DOCUMENTBYID_SUCCESS,
    GET_STUDENTS_FEEOVERVIEW_FAILER, GET_STUDENTS_FEEOVERVIEW_REQUEST, GET_STUDENTS_FEEOVERVIEW_SUCCESS,
    GET_STUDENTS_PAIDFEE_FAILER, GET_STUDENTS_PAIDFEE_REQUEST, GET_STUDENTS_PAIDFEE_SUCCESS, GET_STUDENTS_UNPAIDFEE_FAILER, GET_STUDENTS_UNPAIDFEE_REQUEST,
    GET_STUDENTS_UNPAIDFEE_SUCCESS, UPDATE_STUDENT_DOCUMENT_FAILER, UPDATE_STUDENT_DOCUMENT_REQUEST, UPDATE_STUDENT_DOCUMENT_STATUS_FAILER, UPDATE_STUDENT_DOCUMENT_STATUS_REQUEST, UPDATE_STUDENT_DOCUMENT_STATUS_SUCCESS, UPDATE_STUDENT_DOCUMENT_SUCCESS, UPDATE_STUDENT_FAILER, UPDATE_STUDENT_IMAGE_FAILER, UPDATE_STUDENT_IMAGE_REQUEST,
    UPDATE_STUDENT_IMAGE_SUCCESS, UPDATE_STUDENT_REQUEST, UPDATE_STUDENT_SUCCESS,
    UPLOAD_STUDENT_DOCUMENT_FAILER,
    UPLOAD_STUDENT_DOCUMENT_REQUEST,
    UPLOAD_STUDENT_DOCUMENT_SUCCESS
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

export const getStudentPaidFee = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENTS_PAIDFEE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-studentspaidfee?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENTS_PAIDFEE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENTS_PAIDFEE_FAILER, payload: err.message })
    }
}

export const getStudentUnPaidFee = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENTS_UNPAIDFEE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-studentsunpaidfee?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENTS_UNPAIDFEE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENTS_UNPAIDFEE_FAILER, payload: err.message })
    }
}

export const getStudentFeeOverview = () => async (dispatch) => {
    dispatch({ type: GET_STUDENTS_FEEOVERVIEW_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/fee/get-studentfeeoverview`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENTS_FEEOVERVIEW_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENTS_FEEOVERVIEW_FAILER, payload: err.message })
    }
}

export const uploadStudentDocument = (studentId, documentData, file) => async (dispatch) => {
    dispatch({ type: UPLOAD_STUDENT_DOCUMENT_REQUEST })
    try {
        const formData = new FormData();
        formData.append("document",
            new Blob([JSON.stringify(documentData)], {
                type: "application/json"
            })
        )
        formData.append("file", file);

        const res = await fetch(`${BASE_API}/student/upload/document/${studentId}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData,
        })
        const data = await res.json();
        dispatch({ type: UPLOAD_STUDENT_DOCUMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPLOAD_STUDENT_DOCUMENT_FAILER, payload: err.message })
    }
}

export const updateStudentDocument = (documentId, documentData, file) => async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_DOCUMENT_REQUEST })
    try {
        const formData = new FormData();
        formData.append("document",
            new Blob([JSON.stringify(documentData)], {
                type: "application/json"
            })
        )
        formData.append("file", file);

        const res = await fetch(`${BASE_API}/student/update/document/${documentId}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData,
        })
        const data = await res.json();
        dispatch({ type: UPDATE_STUDENT_DOCUMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_STUDENT_DOCUMENT_FAILER, payload: err.message })
    }
}

export const updateStudentDocumentStatus = (documentId, status) => async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_DOCUMENT_STATUS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/student/update/documentstatus/${documentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: status,
        })
        const data = await res.json();
        dispatch({ type: UPDATE_STUDENT_DOCUMENT_STATUS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_STUDENT_DOCUMENT_STATUS_FAILER, payload: err.message })
    }
}

export const getDocuments = (studentId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_DOCUMENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/student/get/alldocuments/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_DOCUMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_DOCUMENT_FAILER, payload: err.message })
    }
}

export const getDocumentById = (documentId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_DOCUMENTBYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/student/get/documents/${documentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_DOCUMENTBYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_DOCUMENTBYID_FAILER, payload: err.message })
    }
}

export const deleteDocument = (documentId) => async (dispatch) => {
    dispatch({ type: DELETE_STUDENT_DOCUMENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/student/delete/document/${documentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: DELETE_STUDENT_DOCUMENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_STUDENT_DOCUMENT_FAILER, payload: err.message })
    }
}