import {
    GET_ALL_USERS_FAILER, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_PROFILE_FAILER,
    GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USERS_BYID_FAILER, GET_USERS_BYID_REQUEST,
    GET_USERS_BYID_SUCCESS, RESET_PASSWORD_FAILER, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
    UPDATE_USER_PROFILE_FAILER, UPDATE_USER_PROFILE_IMAGE_FAILER, UPDATE_USER_PROFILE_IMAGE_REQUEST,
    UPDATE_USER_PROFILE_IMAGE_SUCCESS,
    UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS
} from "./ActionType"


const BASE_API = process.env.REACT_APP_BASE_URL;

export const userProfile = () => async (dispatch) => {
    dispatch({ type: GET_USER_PROFILE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/user/user-profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_USER_PROFILE_FAILER, payload: err.message })
    }
}

export const updateUserProfile = (updateUserProfileData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/user/update-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(updateUserProfileData)
        })
        const data = res.json();
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_USER_PROFILE_FAILER, payload: err.message })
    }
}

export const getAllUsers = (pageNumber, pageSize) => async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/user/get-allusers?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_ALL_USERS_FAILER, payload: err.message })
    }
}

export const getUserById = (userId) => async (dispatch) => {
    dispatch({ type: GET_USERS_BYID_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/user/get-userbyid/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_USERS_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_USERS_BYID_FAILER, payload: err.message })
    }
}

export const resetPassword = (userId, newPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST })
    try {
        const res = await fetch(`${BASE_API}/auth/reset-password/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ newPassword })
        })
        if (!res.ok) {
            return
        }
        const data = await res.json();
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: RESET_PASSWORD_FAILER, payload: err.message })
    }
}

export const updateUserImage = (image) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_IMAGE_REQUEST })
    try {
        const formData = new FormData();
        formData.append("image", image);
        const res = await fetch(`${BASE_API}/user/update-imgae`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: formData
        })
        const data = await res.json();
        dispatch({ type: UPDATE_USER_PROFILE_IMAGE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_USER_PROFILE_IMAGE_FAILER, payload: err.message })
    }
}