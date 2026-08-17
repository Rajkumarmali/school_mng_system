import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Route, Routes } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/user/UserProfile';
import Users from '../pages/user/Users';
import Student from '../pages/student/Student';
import Teacher from '../pages/Teacher/Teacher';
import TeacherProfile from '../pages/Teacher/TeacherProfile';
import College from '../pages/College/College';
import CollegeProfile from '../pages/College/CollegeProfile';
import Department from '../pages/department/Department';
import DepartmentDetails from '../pages/department/DepartmentDetails';
import Fee from '../pages/fee/Fee';
import StudentsFee from '../pages/student/fee/StudentsFee';
import Course from '../pages/course/Course';
import Notification from '../pages/notification/Notification';
import Section from '../pages/section/Section';
import Class from '../pages/Teacher/classes/Class';
import University from '../pages/university/University';



const Layout = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <div
                    style={{ position: "fixed", left: 0, right: 0, }}>
                    <Navbar />
                </div>
                <div>
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path='university' element={<University />} />
                        <Route path="college" element={<College />} />
                        <Route path='college/profile' element={<CollegeProfile />} />
                        <Route path='course' element={<Course />} />
                        <Route path='user-profile' element={<UserProfile />} />
                        <Route path='users' element={<Users />} />
                        <Route path='/student' element={<Student />} />
                        <Route path='student/fee' element={<StudentsFee />} />
                        <Route path='teacher' element={<Teacher />} />
                        <Route path='teacher/profile' element={<TeacherProfile />} />
                        <Route path='teacher/classes' element={<Class />} />
                        <Route path='department' element={<Department />} />
                        <Route path='sections' element={<Section />} />
                        <Route path='department/details/:departmentId' element={<DepartmentDetails />} />
                        <Route path='fee' element={<Fee />} />
                        <Route path='notification' element={<Notification />} />
                    </Routes>
                </div>

            </div>
        </div>
    )
}

export default Layout
