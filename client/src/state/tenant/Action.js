import { CREATE_TENANT_FAILER, CREATE_TENANT_REQUEST, CREATE_TENANT_SUCCESS, GET_TENANT_BYID_FAILER, GET_TENANT_BYID_REQUEST, GET_TENANT_BYID_SUCCESS, GET_TENANT_FAILER, GET_TENANT_REQUEST, GET_TENANT_SUCCESS, UPDATE_TENANT_FAILER, UPDATE_TENANT_REQUEST, UPDATE_TENANT_SUCCESS } from "./ActionType"

export const getTenants = () => async (dispatch) => {
    dispatch({ type: GET_TENANT_REQUEST })
    try {
        const res = await fetch('http://localhost:8080/api/tenant/get-tenants', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await res.json();
        dispatch({ type: GET_TENANT_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: GET_TENANT_FAILER, payload: err.message })
    }
}

export const createTenatn = (tenantData) => async (dispatch) => {
    dispatch({ type: CREATE_TENANT_REQUEST })
    try {
        const res = await fetch("http://localhost:8080/api/tenant/create-tenant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(tenantData)
        })
        const data = await res.json();
        dispatch({ type: CREATE_TENANT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_TENANT_FAILER, payload: err.message })
    }
}

export const getTenantById = (id) => async (dispatch) => {
    dispatch({ type: GET_TENANT_BYID_REQUEST })
    try {
        const res = await fetch(`http://localhost:8080/api/tenant/get-tenant/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
        const data = await res.json();
        dispatch({ type: GET_TENANT_BYID_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: GET_TENANT_BYID_FAILER, payload: err.message })
    }
}

export const updateTenant = (tenantData, id) => async (dispatch) => {
    dispatch({ type: UPDATE_TENANT_REQUEST })
    try {
        const res = await fetch(`http://localhost:8080/api/tenant/update-tenant/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(tenantData)
        })
        const data = await res.json();
        dispatch({ type: UPDATE_TENANT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: UPDATE_TENANT_FAILER, payload: err.message })
    }
}
