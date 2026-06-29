import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './auth/Reducer'
import { userReducer } from './user/Reducer'
import { studentReducer } from './student/Reducer'
import { teacherReducer } from './teacher/Reducer'
import { collegeReducer } from './college/Reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    college: collegeReducer,
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))