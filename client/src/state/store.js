import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './auth/Reducer'
import { tenantReducer } from './tenant/Reducer'
import { userReducer } from './user/Reducer'
import { teacherReducer } from './teacher/Reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    tenant: tenantReducer,
    user: userReducer,
    teacher: teacherReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))