import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Route, Routes } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/user/UserProfile';
import Users from '../pages/user/Users';
import Student from '../pages/student/Student';
import StudentProfile from '../pages/student/StudentProfile'
import Teacher from '../pages/Teacher/Teacher';
import TeacherProfile from '../pages/Teacher/TeacherProfile';
import College from '../pages/College/College';
import CollegeProfile from '../pages/College/CollegeProfile';


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
                        <Route path="college" element={<College />} />
                        <Route path='college/profile' element={<CollegeProfile />} />
                        <Route path='user-profile' element={<UserProfile />} />
                        <Route path='users' element={<Users />} />
                        <Route path='/student' element={<Student />} />
                        <Route path='/student/profile' element={<StudentProfile />} />
                        <Route path='teacher' element={<Teacher />} />
                        <Route path='teacher/profile' element={<TeacherProfile />} />
                    </Routes>
                </div>

            </div>
        </div>
    )
}

export default Layout
