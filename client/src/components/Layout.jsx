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
import Department from '../pages/department/Department';
import DepartmentDetails from '../pages/department/DepartmentDetails';
import Classes from '../pages/classes/Classes';
import ClassDetails from '../pages/classes/ClassDetails';
import Fee from '../pages/fee/Fee';
import StudentsFee from '../pages/student/fee/StudentsFee';


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
                        <Route path='student/fee' element={<StudentsFee />} />
                        <Route path='teacher' element={<Teacher />} />
                        <Route path='teacher/profile' element={<TeacherProfile />} />
                        <Route path='department' element={<Department />} />
                        <Route path='classes' element={<Classes />} />
                        <Route path='classes/details/:classId' element={<ClassDetails />} />
                        <Route path='department/details/:departmentId' element={<DepartmentDetails />} />
                        <Route path='fee' element={<Fee />} />
                    </Routes>
                </div>

            </div>
        </div>
    )
}

export default Layout
