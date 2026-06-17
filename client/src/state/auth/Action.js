import { LOG_OUT, LOGIN_FAILER, LOGIN_REQUEST, LOGIN_SUCCESS } from "./ActionType"

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

export const loogOut = () => async (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOG_OUT })
}