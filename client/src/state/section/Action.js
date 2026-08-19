import {
    ADD_STUDENT_IN_SECTION_FAILER,
    ADD_STUDENT_IN_SECTION_REQUEST,
    ADD_STUDENT_IN_SECTION_SUCCESS,
    CREATE_SECTION_FAILER, CREATE_SECTION_REQUEST, CREATE_SECTION_SUCCESS, DELETE_SECTION_FAILER, DELETE_SECTION_REQUEST, DELETE_SECTION_SUCCESS, DELETE_STUDENT_FROM_SECTION_FAILER, DELETE_STUDENT_FROM_SECTION_REQUEST, DELETE_STUDENT_FROM_SECTION_SUCCESS, GET_ALL_SECTION_FAILER, GET_ALL_SECTION_REQUEST, GET_ALL_SECTION_SUCCESS, GET_SECTION_BYID_FAILER,
    GET_SECTION_BYID_REQUEST, GET_SECTION_BYID_SUCCESS, GET_DEPARTMENTS_ALL_SECTION_FAILER, GET_DEPARTMENTS_ALL_SECTION_REQUEST, GET_DEPARTMENTS_ALL_SECTION_SUCCESS, GET_STUDENT_FROM_SECTION_FAILER, GET_STUDENT_FROM_SECTION_REQUEST, GET_STUDENT_FROM_SECTION_SUCCESS,
    UPDATE_SECTION_FAILER,
    UPDATE_SECTION_REQUEST,
    UPDATE_SECTION_SUCCESS,
    ADD_SUBJECT_IN_SECTION_REQUEST,
    ADD_SUBJECT_IN_SECTION_FAILER,
    ADD_SUBJECT_IN_SECTION_SUCCESS,
    GET_SECTION_SUBJECT_REQUEST,
    GET_SECTION_SUBJECT_SUCCESS,
    GET_SECTION_SUBJECT_FAILER,
    GET_SECTION_SUBJECT_BY_ID_REQUEST,
    GET_SECTION_SUBJECT_BY_ID_FAILER,
    GET_SECTION_SUBJECT_BY_ID_SUCCESS,
    UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_REQUEST,
    UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_FAILER,
    UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_SUCCESS,
    ADD_STUDENT_IN_SECTION_SUBJECT_REQUEST,
    ADD_STUDENT_IN_SECTION_SUBJECT_FAILER,
    ADD_STUDENT_IN_SECTION_SUBJECT_SUCCESS,
    GET_STUDENT_FROM_SECTION_SUBJECT_REQUEST,
    GET_STUDENT_FROM_SECTION_SUBJECT_FAILER,
    GET_STUDENT_FROM_SECTION_SUBJECT_SUCCESS,
    GET_STUDENT_FROM_SECTION_BY_STUDENTID_REQUEST,
    GET_STUDENT_FROM_SECTION_BY_STUDENTID_FAILER,
    GET_STUDENT_FROM_SECTION_BY_STUDENTID_SUCCESS,
    GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_REQUEST,
    GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_FAILER,
    GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_SUCCESS,
    CREATE_EXAM_REQUEST,
    CREATE_EXAM_FAILER,
    CREATE_EXAM_SUCCESS,
    GET_EXAM_REQUEST,
    GET_EXAM_FAILER,
    GET_EXAM_SUCCESS,
    GET_STUDENT_EXAM_REQUEST,
    GET_STUDENT_EXAM_FAILER,
    GET_STUDENT_EXAM_SUCCESS,
    UPDATE_STUDENT_EXAM_STATUS_REQUEST,
    UPDATE_STUDENT_EXAM_MARKS_FAILER,
    UPDATE_STUDENT_EXAM_STATUS_SUCCESS,
    UPDATE_STUDENT_EXAM_MARKS_REQUEST,
    UPDATE_STUDENT_EXAM_MARKS_SUCCESS,
    UPDATE_STUDENT_EXAM_STATUS_FAILER,
    GET_EXAM_BYID_REQUEST,
    GET_EXAM_BYID_FAILER,
    GET_EXAM_BYID_SUCCESS,
    UPDATE_EXAM_REQUEST,
    UPDATE_EXAM_FAILER,
    UPDATE_EXAM_SUCCESS
} from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL + "/section";

export const createSection = (sectionData) => async (dispatch) => {
    dispatch({ type: CREATE_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(sectionData)
        })
        const data = await res.json()
        dispatch({ type: CREATE_SECTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_SECTION_FAILER, payload: err.message })
    }
}

export const getAllSection = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_ALL_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get-all?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_ALL_SECTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_ALL_SECTION_FAILER, payload: err.message })
    }
}

export const getAllDepartmentsSection = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENTS_ALL_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/department/sections?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_DEPARTMENTS_ALL_SECTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_DEPARTMENTS_ALL_SECTION_FAILER, payload: err.message })
    }
}

export const getSectionById = (sectionId) => async (dispatch) => {
    dispatch({ type: GET_SECTION_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get-byid/${sectionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_SECTION_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SECTION_BYID_FAILER, payload: err.message })
    }
}

export const updateSection = (sectionId, sectionData) => async (dispatch) => {
    dispatch({ type: UPDATE_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/${sectionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(sectionData)
        })
        const data = await res.json()
        dispatch({ type: UPDATE_SECTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_SECTION_FAILER, payload: err.message })
    }
}

export const deleteSection = (sectionId) => async (dispatch) => {
    dispatch({ type: DELETE_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/delete/${sectionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: DELETE_SECTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_SECTION_FAILER, payload: err.message })
    }
}

export const addStudentInSection = (sectionId, studentData) => async (dispatch) => {
    dispatch({ type: ADD_STUDENT_IN_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/add/student/${sectionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentData)
        })
        const data = await res.json();
        dispatch({ type: ADD_STUDENT_IN_SECTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: ADD_STUDENT_IN_SECTION_FAILER, payload: err.message })
    }
}

export const getStudentsFromSection = (sectionId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_FROM_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/student/${sectionId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_FROM_SECTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_FROM_SECTION_FAILER, payload: err.message })
    }
}

export const getStudentFromSectionByStudentId = (studentId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_FROM_SECTION_BY_STUDENTID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/studentbyid/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_FROM_SECTION_BY_STUDENTID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_FROM_SECTION_BY_STUDENTID_FAILER, payload: err.message })
    }
}

export const deleteStudentFromSection = (sectionId, studentId) => async (dispatch) => {
    dispatch({ type: DELETE_STUDENT_FROM_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/delete/student/${sectionId}/${studentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: DELETE_STUDENT_FROM_SECTION_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: DELETE_STUDENT_FROM_SECTION_FAILER, payload: err.message })
    }
}
//
export const addSubjectInSection = (sectionId, sectionSubjectData) => async (dispatch) => {
    dispatch({ type: ADD_SUBJECT_IN_SECTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/add/subject/${sectionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(sectionSubjectData)
        })
        const data = await res.json();
        dispatch({ type: ADD_SUBJECT_IN_SECTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: ADD_SUBJECT_IN_SECTION_FAILER, payload: err.message })
    }
}

export const getAllSectionSubject = (sectionId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_SECTION_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/subjects/${sectionId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_SECTION_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SECTION_SUBJECT_FAILER, payload: err.message })
    }
}

export const getSectionSubjectById = (sectionSubjectId) => async (dispatch) => {
    dispatch({ type: GET_SECTION_SUBJECT_BY_ID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/subject/bysectionsubjectid/${sectionSubjectId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_SECTION_SUBJECT_BY_ID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SECTION_SUBJECT_BY_ID_FAILER, payload: err.message })
    }
}

export const updateSectionSubjectTeacher = (sectionSubjectId, sectionSubjectData) => async (dispatch) => {
    dispatch({ type: UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/subject-teacher/${sectionSubjectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(sectionSubjectData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_SECTION_SUBJECT_TEACHER_SUBJECT_FAILER, payload: err.message })
    }
}

export const addStudentInSectionSubject = (sectionSubjectId, studentData) => async (dispatch) => {
    dispatch({ type: ADD_STUDENT_IN_SECTION_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/add/student/in/sectionSubject/${sectionSubjectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentData)
        })
        const data = await res.json();
        dispatch({ type: ADD_STUDENT_IN_SECTION_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: ADD_STUDENT_IN_SECTION_SUBJECT_FAILER, payload: err.message })
    }
}

export const getAllStudentFromSectionSubject = (sectionSubjectId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_FROM_SECTION_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/section/subject/student/${sectionSubjectId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_FROM_SECTION_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_FROM_SECTION_SUBJECT_FAILER, payload: err.message })
    }
}

export const getStudentSubjectBySectionIdAndStudentId = (sectionId, studentId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/student/subject/${sectionId}/${studentId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_SUBJECT_BY_SECTIONANDSTUDENTID_FAILER, payload: err.message })
    }
}

export const createExam = (examData) => async (dispatch) => {
    dispatch({ type: CREATE_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create/exam`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(examData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_EXAM_FAILER, payload: err.message })
    }
}

export const updateExam = (examId, examData) => async (dispatch) => {
    dispatch({ type: UPDATE_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/exam/${examId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(examData)
        })
        const data = await res.json()
        dispatch({ type: UPDATE_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_EXAM_FAILER, payload: err.message })
    }
}

export const getExamBySectionId = (sectionId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/exam/${sectionId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_EXAM_FAILER, payload: err.message })
    }
}

export const getExamById = (examId) => async (dispatch) => {
    dispatch({ type: GET_EXAM_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/exambyid/${examId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_EXAM_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_EXAM_BYID_FAILER, payload: err.message })
    }
}

export const getStudentExamByExamId = (examId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/studentExam/${examId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_EXAM_FAILER, payload: err.message })
    }
}

export const updateStudentExamStatus = (studentExamData) => async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_EXAM_STATUS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/studentExam/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentExamData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_STUDENT_EXAM_STATUS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_STUDENT_EXAM_STATUS_FAILER, payload: err.message })
    }
}

export const updateStudentExamMarks = (studentExamData) => async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_EXAM_MARKS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/studentExam/obtainMarks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentExamData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_STUDENT_EXAM_MARKS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_STUDENT_EXAM_MARKS_FAILER, payload: err.message })
    }
}