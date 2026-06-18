import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './auth/Reducer'
import { tenantReducer } from './tenant/Reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    tenant: tenantReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))