import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './auth/Reducer'
import { tenantReducer } from './tenant/Reducer'
import { userReducer } from './user/Reducer'
import { studentReducer } from './student/Reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    tenant: tenantReducer,
    user: userReducer,
    student: studentReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))