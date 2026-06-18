import { LOG_OUT, LOGIN_FAILER, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_PASSWORD_FAILER, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "./ActionType"

export const login = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const res = await fetch('http://localhost:8080/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        if (!res.ok) {
            alert("login failed")
            return
        }
        const data = await res.json();
        localStorage.setItem("token", data.token)
        dispatch({ type: LOGIN_SUCCESS, payload: data.token })
    } catch (err) {
        dispatch({ type: LOGIN_FAILER, payload: err.message })
    }
}

export const resetPassword = (resetPasswordData) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST })
    try {
        const payload = { oldPassword: resetPasswordData.currentPassword, newPassword: resetPasswordData.newPassword }
        const res = await fetch("http://localhost:8080/api/auth/update-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(payload)
        })
        if (!res.ok)
            alert("Password update failed")
        const data = await res.json();
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: RESET_PASSWORD_FAILER, payload: err.message })
    }
}

export const loogOut = () => async (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOG_OUT })
}