import { CLEAR_STUDENT_ANSWER_FAILER, CLEAR_STUDENT_ANSWER_REQUEST, CLEAR_STUDENT_ANSWER_SUCCESS, CREATE_EXAM_FAILER, CREATE_EXAM_QUESTION_FAILER, CREATE_EXAM_QUESTION_REQUEST, CREATE_EXAM_QUESTION_SUCCESS, CREATE_EXAM_REQUEST, CREATE_EXAM_SUCCESS, DELETE_EXAM_QUESTION_FAILER, DELETE_EXAM_QUESTION_REQUEST, DELETE_EXAM_QUESTION_SUCCESS, GET_EXAM_BY_SECTIONSUBJECTID_FAILER, GET_EXAM_BY_SECTIONSUBJECTID_REQUEST, GET_EXAM_BY_SECTIONSUBJECTID_SUCCESS, GET_EXAM_BYID_FAILER, GET_EXAM_BYID_REQUEST, GET_EXAM_BYID_SUCCESS, GET_EXAM_FAILER, GET_EXAM_QUESTION_FAILER, GET_EXAM_QUESTION_REQUEST, GET_EXAM_QUESTION_SUCCESS, GET_EXAM_REQUEST, GET_EXAM_SUCCESS, GET_ONGOING_STUDENT_EXAM_FAILER, GET_ONGOING_STUDENT_EXAM_REQUEST, GET_ONGOING_STUDENT_EXAM_SUCCESS, GET_STUDENT_EXAM_BY_USERID_FAILER, GET_STUDENT_EXAM_BY_USERID_REQUEST, GET_STUDENT_EXAM_BY_USERID_SUCCESS, GET_STUDENT_EXAM_BYID_FAILER, GET_STUDENT_EXAM_BYID_REQUEST, GET_STUDENT_EXAM_BYID_SUCCESS, GET_STUDENT_EXAM_FAILER, GET_STUDENT_EXAM_OVERVIEW_FAILER, GET_STUDENT_EXAM_OVERVIEW_REQUEST, GET_STUDENT_EXAM_OVERVIEW_SUCCESS, GET_STUDENT_EXAM_QUESTION_FAILER, GET_STUDENT_EXAM_QUESTION_REQUEST, GET_STUDENT_EXAM_QUESTION_SUCCESS, GET_STUDENT_EXAM_REQUEST, GET_STUDENT_EXAM_SUCCESS, GET_SUBMIT_STUDENT_EXAM_DETAILS_FAILER, GET_SUBMIT_STUDENT_EXAM_DETAILS_REQUEST, GET_SUBMIT_STUDENT_EXAM_DETAILS_SUCCESS, SAVE_STUDENT_ANSWER_FAILER, SAVE_STUDENT_ANSWER_REQUEST, SAVE_STUDENT_ANSWER_SUCCESS, SUBMIT_STUDENT_EXAM_FAILER, SUBMIT_STUDENT_EXAM_REQUEST, SUBMIT_STUDENT_EXAM_SUCCESS, UPDATE_EXAM_FAILER, UPDATE_EXAM_QUESTION_FAILER, UPDATE_EXAM_QUESTION_REQUEST, UPDATE_EXAM_QUESTION_SUCCESS, UPDATE_EXAM_REQUEST, UPDATE_EXAM_SUCCESS, UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_FAILER, UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_REQUEST, UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_SUCCESS, UPDATE_QUESTION_REVIEW_FAILER, UPDATE_QUESTION_REVIEW_REQUEST, UPDATE_QUESTION_REVIEW_SUCCESS, UPDATE_STUDENT_EXAM_MARKS_FAILER, UPDATE_STUDENT_EXAM_MARKS_REQUEST, UPDATE_STUDENT_EXAM_MARKS_SUCCESS, UPDATE_STUDENT_EXAM_STATUS_FAILER, UPDATE_STUDENT_EXAM_STATUS_REQUEST, UPDATE_STUDENT_EXAM_STATUS_SUCCESS } from "./ActionType";


const BASE_API = process.env.REACT_APP_BASE_URL + "/exam";

export const createExam = (examData) => async (dispatch) => {
    dispatch({ type: CREATE_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create`, {
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
        const res = await fetch(`${BASE_API}/update/${examId}`, {
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

export const updateExamToShowQuestinoPaperToStudent = (examId) => async (dispatch) => {
    dispatch({ type: UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/showQuestionPapetToStudent/${examId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_EXAM_TO_SHOWQUESTIONPAPERTOSTUDENT_FAILER, payload: err.message })
    }
}

export const getExamBySectionId = (sectionId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/${sectionId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
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

export const getExamBySectionSubjectId = (sectionSubjectId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_EXAM_BY_SECTIONSUBJECTID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/bysectionSubjectId/${sectionSubjectId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json()
        dispatch({ type: GET_EXAM_BY_SECTIONSUBJECTID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_EXAM_BY_SECTIONSUBJECTID_FAILER, payload: err.message })
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

export const getStudentExamByUserId = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_EXAM_BY_USERID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/studentexam/byuserid?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_EXAM_BY_USERID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_EXAM_BY_USERID_FAILER, payload: err.message })
    }
}

export const getStudentExamById = (studentExamId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_EXAM_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/studentexam/byid/${studentExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_EXAM_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_EXAM_BYID_FAILER, payload: err.message })
    }
}

export const getOngoingStudentExam = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_ONGOING_STUDENT_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/ongoin/studentexam?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_ONGOING_STUDENT_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_ONGOING_STUDENT_EXAM_FAILER, payload: err.message })
    }
}

export const getStudentExamOverview = () => async (dispatch) => {
    dispatch({ type: GET_STUDENT_EXAM_OVERVIEW_REQUEST })
    try {

        const res = await fetch(`${BASE_API}/get/studentExamOverview`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_EXAM_OVERVIEW_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_EXAM_OVERVIEW_FAILER, payload: err.message })
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
        const res = await fetch(`${BASE_API}/update/studentExam/marks`, {
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

export const createExamQuestion = (examId, examQuestion) => async (dispatch) => {
    dispatch({ type: CREATE_EXAM_QUESTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create/examquestion/${examId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(examQuestion)
        })
        const data = await res.json();
        dispatch({ type: CREATE_EXAM_QUESTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_EXAM_QUESTION_FAILER, payload: err.message })
    }
}

export const updateExamQuestion = (examQuestionId, examQuestion) => async (dispatch) => {
    dispatch({ type: UPDATE_EXAM_QUESTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/examquestion/${examQuestionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(examQuestion)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_EXAM_QUESTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_EXAM_QUESTION_FAILER })
    }
}

export const deleteExamQuestion = (examQuestionId) => async (dispatch) => {
    dispatch({ type: DELETE_EXAM_QUESTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/delete/examquestion/${examQuestionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: DELETE_EXAM_QUESTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_EXAM_QUESTION_FAILER })
    }
}

export const getExamQuestions = (examId, pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_EXAM_QUESTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/examquestion/${examId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_EXAM_QUESTION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_EXAM_QUESTION_FAILER, payload: err.message })
    }
}

export const getStudentExamQuestions = (studentExamId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_EXAM_QUESTION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/studentexamquestion/${studentExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_EXAM_QUESTION_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_STUDENT_EXAM_QUESTION_FAILER, payload: err.message })
    }
}

export const saveStudentAnswer = (studentAnswerData) => async (dispatch) => {
    dispatch({ type: SAVE_STUDENT_ANSWER_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/save/studentanswer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(studentAnswerData)
        })
        const data = await res.json();
        dispatch({ type: SAVE_STUDENT_ANSWER_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: SAVE_STUDENT_ANSWER_FAILER, payload: err.message })
    }
}

export const updateQuestionReview = (studentExamId, questionId) => async (dispatch) => {
    dispatch({ type: UPDATE_QUESTION_REVIEW_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/questionreview/${studentExamId}/${questionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },

        })
        const data = await res.json();
        dispatch({ type: UPDATE_QUESTION_REVIEW_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: UPDATE_QUESTION_REVIEW_FAILER, payload: err.message })
    }
}

export const clearStudentAnswer = (studentExamId, questionId) => async (dispatch) => {
    dispatch({ type: CLEAR_STUDENT_ANSWER_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/clear/studentanswer/${studentExamId}/${questionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: CLEAR_STUDENT_ANSWER_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: CLEAR_STUDENT_ANSWER_FAILER, payload: err.message })
    }
}

export const submitStudentExam = (studentExamId) => async (dispatch) => {
    dispatch({ type: SUBMIT_STUDENT_EXAM_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/submit/studentexam/${studentExamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: SUBMIT_STUDENT_EXAM_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: SUBMIT_STUDENT_EXAM_FAILER, payload: err.message })
    }
}

export const getSubmitStudentExamDetails = (studentExamId) => async (dispatch) => {
    dispatch({ type: GET_SUBMIT_STUDENT_EXAM_DETAILS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/submit/studentexamdetail/${studentExamId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_SUBMIT_STUDENT_EXAM_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SUBMIT_STUDENT_EXAM_DETAILS_FAILER, payload: err.message })
    }
}