import {
    CREATE_TEACHER_FALIER, CREATE_TEACHER_REQUEST, DELETE_TEACHER_FALIER, DELETE_TEACHER_REQUEST,
    DELETE_TEACHER_SUCCESS, GET_ALL_TEACHER_FALIER, GET_ALL_TEACHER_REQUEST, GET_ALL_TEACHER_SUCCESS,
    GET_SECTION_SUBJECT_STUDENTS_FALIER,
    GET_SECTION_SUBJECT_STUDENTS_REQUEST,
    GET_SECTION_SUBJECT_STUDENTS_SUCCESS,
    GET_STUDENT_SUBJECT_BYID_FALIER,
    GET_STUDENT_SUBJECT_BYID_REQUEST,
    GET_STUDENT_SUBJECT_BYID_SUCCESS,
    GET_TEACHER_BYID_FALIER, GET_TEACHER_BYID_REQUEST, GET_TEACHER_BYID_SUCCESS, GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_FALIER, GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_REQUEST, GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_SUCCESS, GET_TEACHERS_CLASSES_FALIER, GET_TEACHERS_CLASSES_REQUEST, GET_TEACHERS_CLASSES_SUCCESS, MARK_STUDENT_ATTENDANCE_FALIER, MARK_STUDENT_ATTENDANCE_REQUEST, MARK_STUDENT_ATTENDANCE_SUCCESS, UPDATE_TEACHER_FALIER,
    UPDATE_TEACHER_IMAGE_FALIER,
    UPDATE_TEACHER_IMAGE_REQUEST,
    UPDATE_TEACHER_IMAGE_SUCCESS,
    UPDATE_TEACHER_REQUEST, UPDATE_TEACHER_SUCCESS
} from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL + '/teacher';

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

        const res = await fetch(`${BASE_API}/create-teacher`, {
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
        const res = await fetch(`${BASE_API}/get-allteachers?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
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
        const res = await fetch(`${BASE_API}/get-teacherbyid/${teacherId}`, {
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
        const res = await fetch(`${BASE_API}/update-teacher/${teacherId}`, {
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
        const res = await fetch(`${BASE_API}/delete-teacher/${teacherId}`, {
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
        const res = await fetch(`${BASE_API}/update-image/${teacherId}`, {
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

export const getTeacherClasses = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_TEACHERS_CLASSES_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/classes?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_TEACHERS_CLASSES_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_TEACHERS_CLASSES_FALIER, payload: err.message })
    }
}

export const getTeacherClassBySectionSubjectId = (sectionSubjectId) => async (dispatch) => {
    dispatch({ type: GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/classes/by/${sectionSubjectId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_TEACHERS_CLASS_BY_SECTION_SUBJECTID_FALIER, payload: err.message })
    }
}

export const getStudentSubjectBySectionSubjectId = (sectionSubjectId, pageNumber, pageSize, date) => async (dispatch) => {
    dispatch({ type: GET_SECTION_SUBJECT_STUDENTS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/sectionSubject/students/${sectionSubjectId}?pageNumber=${pageNumber - 1}&pageSize=${pageSize}&date=${date}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_SECTION_SUBJECT_STUDENTS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_SECTION_SUBJECT_STUDENTS_FALIER, payload: err.message })
    }
}

export const getStudentSubjectById = (studentSubjectId) => async (dispatch) => {
    dispatch({ type: GET_STUDENT_SUBJECT_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/sectionSubject/student/${studentSubjectId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_STUDENT_SUBJECT_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_STUDENT_SUBJECT_BYID_FALIER, payload: err.message })
    }
}

export const markStudentAttendance = (studentSubjectId, attendanceData) => async (dispatch) => {
    dispatch({ type: MARK_STUDENT_ATTENDANCE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/mark/student/attendance/${studentSubjectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(attendanceData)
        })
        const data = await res.json()
        dispatch({ type: MARK_STUDENT_ATTENDANCE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: MARK_STUDENT_ATTENDANCE_FALIER, payload: err.message })
    }
}