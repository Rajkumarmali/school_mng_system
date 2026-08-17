import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './auth/Reducer'
import { userReducer } from './user/Reducer'
import { studentReducer } from './student/Reducer'
import { teacherReducer } from './teacher/Reducer'
import { collegeReducer } from './college/Reducer'
import { departmentReducer } from './department/Reducer'
import { feeReducer } from './fee/Reducer'
import { courseReducer } from './course/Reducer'
import { notificationReducer } from './notification/Reducer'
import { scholarshipReducer } from './scholarship/Reducer'
import { sectionReducer } from './section/Reducer'
import { subjectReducer } from './subject/Reducer'
import { universityReducer } from './university/Reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    college: collegeReducer,
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    department: departmentReducer,
    section: sectionReducer,
    fee: feeReducer,
    course: courseReducer,
    notification: notificationReducer,
    scholarship: scholarshipReducer,
    subject: subjectReducer,
    university: universityReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))