import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {

    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const roles = decoded.roles;

    const isSuperAdmin = roles.includes("SUPER_ADMIN")
    const isAdmin = roles.includes("ADMIN")
    const isHod = roles.includes("HOD")
    const isAccountant = roles.includes("ACCOUNTANT")
    const isStudent = roles.includes("STUDENT")
    const isTeacher = roles.includes("TEACHER")

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className="menu-item">
                        <i className="bi bi-grid-fill me-2"></i>
                        Dashboard
                    </Link>
                </li>
                {
                    isSuperAdmin &&
                    <>
                        <li>
                            <Link to="/university" className="menu-item">
                                <i className="bi bi-bank me-2"></i>
                                University
                            </Link>
                        </li>
                        <li>
                            <Link to="/college" className="menu-item">
                                <i className="bi bi-buildings-fill me-2"></i>
                                Colleges
                            </Link>
                        </li>
                    </>

                }
                {
                    isAdmin &&
                    <>
                        <li>
                            <Link to="/course" className="menu-item">
                                <i className="bi bi-journal-bookmark-fill me-2"></i>
                                Course
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher" className="menu-item">
                                <i className="bi bi-person-workspace me-2"></i>
                                Teachers
                            </Link>
                        </li>
                        <li>
                            <Link to="/student" className="menu-item">
                                <i className="bi bi-mortarboard-fill me-2"></i>
                                Students
                            </Link>
                        </li>

                        <li>
                            <Link to="/users" className="menu-item">
                                <i className="bi bi-people-fill me-2"></i>
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/department" className="menu-item">
                                <i className="bi bi-diagram-3-fill me-2"></i>
                                Departments
                            </Link>
                        </li>
                    </>
                }
                {
                    (isHod || isAdmin) &&
                    <>
                        <li>
                            <Link to="/sections" className="menu-item">
                                <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                                Section
                            </Link>
                        </li>
                    </>
                }
                {
                    (isAccountant || isAdmin) &&
                    <li>
                        <Link to="/fee" className="menu-item">
                            <i className="bi bi-cash-coin me-2"></i>
                            Fee
                        </Link>
                    </li>
                }
                {
                    isTeacher &&
                    <>
                        <li>
                            <Link to="/teacher/classes" className="menu-item">
                                <i className="bi bi-easel-fill me-2"></i>
                                Classes
                            </Link>
                        </li>
                    </>
                }
                {
                    isStudent &&
                    <li>
                        <Link to="/student/attendance" className="menu-item">
                            <i className="bi bi-clipboard-check-fill me-2"></i>
                            Attendance
                        </Link>
                        <Link to="/student/exam" className="menu-item">
                            <i className="bi bi-clipboard-check me-2"></i>
                            Exams
                        </Link>
                        <Link to="/student/fee" className="menu-item">
                            <i className="bi bi-cash-coin me-2"></i>
                            Fee
                        </Link>
                    </li>
                }
            </ul>
        </div>
    );
};

export default Sidebar;