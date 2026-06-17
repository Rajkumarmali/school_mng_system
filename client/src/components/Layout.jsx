import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Route, Routes } from "react-router-dom";
import Dashboard from '../pages/Dashboard';

const Layout = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    )
}

export default Layout
