import { CREATE_NOTIFICATION_FAILER, CREATE_NOTIFICATION_REQUEST, CREATE_NOTIFICATION_SUCCESS, GET_NOTIFICATION_BYID_FAILER, GET_NOTIFICATION_BYID_REQUEST, GET_NOTIFICATION_BYID_SUCCESS, GET_NOTIFICATION_COUNT_FAILER, GET_NOTIFICATION_COUNT_REQUEST, GET_NOTIFICATION_COUNT_SUCCESS, GET_NOTIFICATION_FAILER, GET_NOTIFICATION_REQUEST, GET_NOTIFICATION_SUCCESS, UPDATE_NOTIFICATION_FAILER, UPDATE_NOTIFICATION_REQUEST, UPDATE_NOTIFICATION_SUCCESS } from "./ActionType"

const BASE_API = process.env.REACT_APP_BASE_URL + "/notification";
export const createNotification = (notificationData) => async (dispatch) => {
    dispatch({ type: CREATE_NOTIFICATION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/create/byuseremail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(notificationData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_NOTIFICATION_FAILER, payload: err.message })
    }
}

export const updateNotification = (notificationId) => async (dispatch) => {
    dispatch({ type: UPDATE_NOTIFICATION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/update/${notificationId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: UPDATE_NOTIFICATION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_NOTIFICATION_FAILER, payload: err.message })
    }
}

export const getNotification = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_NOTIFICATION_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/all?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_NOTIFICATION_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_NOTIFICATION_FAILER, payload: err.message })
    }
}

export const getNotificationById = (notificationId) => async (dispatch) => {
    dispatch({ type: GET_NOTIFICATION_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/byid/${notificationId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_NOTIFICATION_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_NOTIFICATION_BYID_FAILER, payload: err.message })
    }
}

export const getNotificationCount = () => async (dispatch) => {
    dispatch({ type: GET_NOTIFICATION_COUNT_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/get/unread`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_NOTIFICATION_COUNT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_NOTIFICATION_COUNT_FAILER, payload: err.message })
    }
}