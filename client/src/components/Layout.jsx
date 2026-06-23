import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Route, Routes } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Tenant from '../pages/Tenant';
import UserProfile from '../pages/UserProfile';
import Users from '../pages/Users';
import Teacher from '../pages/Teacher';
import TeacherProfile from '../pages/TeacherProfile';

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
                        <Route path="tenant" element={<Tenant />} />
                        <Route path='user-profile' element={<UserProfile />} />
                        <Route path='users' element={<Users />} />
                        <Route path='teacher' element={<Teacher />} />
                        <Route path='teacher/profile' element={<TeacherProfile />} />
                    </Routes>
                </div>

            </div>
        </div>
    )
}

export default Layout
