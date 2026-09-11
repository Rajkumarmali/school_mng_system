import { CREATE_UNIVERSITY_EXAM_FAILER, CREATE_UNIVERSITY_EXAM_REQUEST, CREATE_UNIVERSITY_EXAM_SUCCESS, DOWNLOAD_STUDENT_UNIVERSITY_ADMITCARD_FAILER, DOWNLOAD_STUDENT_UNIVERSITY_ADMITCARD_REQUEST, DOWNLOAD_STUDENT_UNIVERSITY_EXAM_APPLICATION_FAILER, DOWNLOAD_STUDENT_UNIVERSITY_EXAM_APPLICATION_REQUEST, GENERATE_UNIVERSITY_EXAM_RESULT_FAILER, GENERATE_UNIVERSITY_EXAM_RESULT_REQUEST, GENERATE_UNIVERSITY_EXAM_RESULT_SUCCESS, GET_STUDENT_UNIVERSITY_EXAM_BY_ID_FAILER, GET_STUDENT_UNIVERSITY_EXAM_BY_ID_REQUEST, GET_STUDENT_UNIVERSITY_EXAM_BY_ID_SUCCESS, GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_FAILER, GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_REQUEST, GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_SUCCESS, GET_STUDENT_UNIVERSITY_EXAM_FAILER, GET_STUDENT_UNIVERSITY_EXAM_REQUEST, GET_STUDENT_UNIVERSITY_EXAM_SUCCESS, GET_UNIVERSITY_EXAM_BYID_FAILER, GET_UNIVERSITY_EXAM_BYID_REQUEST, GET_UNIVERSITY_EXAM_BYID_SUCCESS, GET_UNIVERSITY_EXAM_FAILER, GET_UNIVERSITY_EXAM_REQUEST, GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_FAILER, GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_REQUEST, GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_SUCCESS, GET_UNIVERSITY_EXAM_SUBJECT_BYID_FAILER, GET_UNIVERSITY_EXAM_SUBJECT_BYID_REQUEST, GET_UNIVERSITY_EXAM_SUBJECT_BYID_SUCCESS, GET_UNIVERSITY_EXAM_SUBJECT_FAILER, GET_UNIVERSITY_EXAM_SUBJECT_REQUEST, GET_UNIVERSITY_EXAM_SUBJECT_SUCCESS, GET_UNIVERSITY_EXAM_SUCCESS, GET_UNIVERSITY_EXAM_TIMETABLE_FAILER, GET_UNIVERSITY_EXAM_TIMETABLE_REQUEST, GET_UNIVERSITY_EXAM_TIMETABLE_SUCCESS, SAVE_STUDENT_UNIVERSITY_EXAM_FORM_FAILER, SAVE_STUDENT_UNIVERSITY_EXAM_FORM_REQUEST, SAVE_STUDENT_UNIVERSITY_EXAM_FORM_SUCCESS, UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_FAILER, UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_REQUEST, UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_SUCCESS, UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_FAILER, UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_REQUEST, UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_SUCCESS, UPDATE_UNIVERSITY_EXAM_FAILER, UPDATE_UNIVERSITY_EXAM_REQUEST, UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_FAILER, UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_REQUEST, UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_SUCCESS, UPDATE_UNIVERSITY_EXAM_SUBJECT_FAILER, UPDATE_UNIVERSITY_EXAM_SUBJECT_REQUEST, UPDATE_UNIVERSITY_EXAM_SUBJECT_SUCCESS, UPDATE_UNIVERSITY_EXAM_SUCCESS } from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL + '/university/exam';

export const createUniversityExam = (universityExamData) => async (dispatch) => {
    dispatch({ type: CREATE_UNIVERSITY_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(universityExamData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_UNIVERSITY_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_UNIVERSITY_EXAM_FAILER, payload: err.message })
    }
}

export const updateUniversityExam = (universityExamId, universityExamData) => async (dispatch) => {
    dispatch({ type: UPDATE_UNIVERSITY_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/${universityExamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(universityExamData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_FAILER, payload: err.message })
    }
}

export const updateUniversityExamShowTimeTable = (universityExamId) => async (dispatch) => {
    dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/university-exam/show-time-table/${universityExamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_FAILER, payload: err.message })
    }
}

export const updateUniversityExamShowAdmitCard = (universityExamId) => async (dispatch) => {
    dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/university-exam/show-admit-card/${universityExamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_FAILER, payload: err.message })
    }
}

export const updateUniversityExamShowResult = (universityExamId) => async (dispatch) => {
    dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/university-exam/show-result/${universityExamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SHOW_TIMETABLE_FAILER, payload: err.message })
    }
}

export const getAllUniversityExams = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/all-exam?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_EXAM_FAILER, payload: err.message })
    }
}

export const getUniversityExamById = (universityExamId) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_EXAM_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/exam-by-id/${universityExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_EXAM_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_EXAM_BYID_FAILER, payload: err.message })
    }
}

export const getUniversityExamSubjects = (universityExamId) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_EXAM_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/university-exam-subject/${universityExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_EXAM_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_EXAM_SUBJECT_FAILER, payload: err.message })
    }
}

export const getUniversityExamSubjectById = (universityExamSubjectId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_EXAM_SUBJECT_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/university-exam-subject/byid/${universityExamSubjectId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_EXAM_SUBJECT_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_EXAM_SUBJECT_BYID_FAILER, payload: err.message })
    }
}

export const updateUniversityExamSubject = (universityExamSubjectId, universityExamSubjectData) => async (dispatch) => {
    dispatch({ type: UPDATE_UNIVERSITY_EXAM_SUBJECT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/university-exam-subject/${universityExamSubjectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(universityExamSubjectData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SUBJECT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_UNIVERSITY_EXAM_SUBJECT_FAILER, payload: err.message })
    }
}

export const getStudentUniversityExamsByUniversityExamId = (universityExamId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/student-university-exam/by-university-exam-id/${universityExamId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_FAILER, payload: err.message })
    }
}

export const getStudentUniversityExamsByUserId = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/student-university-exam/by-userId?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_BY_USERID_FAILER, payload: err.message })
    }
}

export const getStudentUniversityExamById = (studentUniversityExamId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_BY_ID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/student-university-exam/by-id/${studentUniversityExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_BY_ID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_UNIVERSITY_EXAM_BY_ID_FAILER })
    }
}

export const saveStudentUniversityExamForm = (studentUniversityExamId, selectedSubjectIds) => async (dispatch) => {
    dispatch({ type: SAVE_STUDENT_UNIVERSITY_EXAM_FORM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/save/student-university-exam-form/${studentUniversityExamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(selectedSubjectIds)
        })
        const data = await res.json();
        dispatch({ type: SAVE_STUDENT_UNIVERSITY_EXAM_FORM_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: SAVE_STUDENT_UNIVERSITY_EXAM_FORM_FAILER, payload: err.message })
    }
}

export const updateStudentUniversityExamCenter = (studentUniversityExamId, examCenterCollegeCode) => async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/updat-student-universityexam-center/${studentUniversityExamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: examCenterCollegeCode
        })
        const data = await res.json();
        dispatch({ type: UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: UPDATE_STUDENT_UNIVERSITY_EXAM_CENTER_FAILER, payload: err.message })
    }
}

export const downloadStudentApplicationForm = (studentUniversityExamId) => async (dispatch) => {
    console.log(studentUniversityExamId)
    dispatch({ type: DOWNLOAD_STUDENT_UNIVERSITY_EXAM_APPLICATION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/generate/student-application-form/${studentUniversityExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const blob = res.blob();
        return blob;
    } catch (err) {
        dispatch({ type: DOWNLOAD_STUDENT_UNIVERSITY_EXAM_APPLICATION_FAILER, payload: err.message })
    }
}

export const getUniversityExamTimeTable = (universityExamId) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_EXAM_TIMETABLE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/university-exam-time-table/${universityExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_UNIVERSITY_EXAM_TIMETABLE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_EXAM_TIMETABLE_FAILER, payload: err.message })
    }
}

export const downloadStudentAdmitCard = (studentUniversityExamId) => async (dispatch) => {
    dispatch({ type: DOWNLOAD_STUDENT_UNIVERSITY_ADMITCARD_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/generate/student-admint-card/${studentUniversityExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const blob = res.blob();
        return blob;
    } catch (err) {
        dispatch({ type: DOWNLOAD_STUDENT_UNIVERSITY_ADMITCARD_FAILER, payload: err.message })
    }
}

export const updateStudentUniversityExamSubjectMarks = (studentUniversityExamSubjectMarksData) => async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_REQUEST })
    console.log(studentUniversityExamSubjectMarksData)
    try {
        const res = await fetch(`${BASE_API}/update/student-universit-exam-subject/marks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentUniversityExamSubjectMarksData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_STUDENT_UNIVERSITY_EXAM_SUBJECT_MARKS_FAILER, payload: err.message })
    }
}

export const generateUniversityExamResult = (universityExamId) => async (dispatch) => {
    dispatch({ type: GENERATE_UNIVERSITY_EXAM_RESULT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/generate-university-exam-result/${universityExamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GENERATE_UNIVERSITY_EXAM_RESULT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GENERATE_UNIVERSITY_EXAM_RESULT_FAILER, payload: err.message })
    }
}

export const getUniversityExamResultOverview = (universityExamId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/university-exam-result-overview/${universityExamId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_UNIVERSITY_EXAM_RESULT_OVERVIEW_FAILER, payload: err.message })
    }
}