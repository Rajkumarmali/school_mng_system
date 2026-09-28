import React from 'react'
import { Link } from 'react-router-dom'
import './MobileHome.css';
import { jwtDecode } from 'jwt-decode';

const MobileHome = () => {
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
        <div className='mobileHome-container'>
            <div className='mobileHome-menu'>
                <>
                    <Link to="/dashboard" className="mobileHome-menu-item">
                        <i className="bi bi-grid-fill me-2"></i>
                        Dashboard
                    </Link>
                </>
                {
                    isSuperAdmin &&
                    <>
                        <Link to="/university" className="mobileHome-menu-item">
                            <i className="bi bi-bank me-2"></i>
                            University
                        </Link>
                        <Link to="/university/exam" className="mobileHome-menu-item">
                            <i className="bi bi-clipboard-check-fill me-2"></i>
                            UniversityExam
                        </Link>

                        <Link to="/college" className="mobileHome-menu-item">
                            <i className="bi bi-buildings-fill me-2"></i>
                            Colleges
                        </Link>

                    </>
                }
                {
                    (isSuperAdmin || isAdmin) &&
                    <>
                        <Link to="/course" className="mobileHome-menu-item">
                            <i className="bi bi-journal-bookmark-fill me-2"></i>
                            Course
                        </Link>
                        <Link to="/users" className="mobileHome-menu-item">
                            <i className="bi bi-people-fill me-2"></i>
                            Users
                        </Link>
                    </>
                }
                {
                    isAdmin &&
                    <>
                        <Link to="/teacher" className="mobileHome-menu-item">
                            <i className="bi bi-person-workspace me-2"></i>
                            Teachers
                        </Link>
                        <Link to="/student" className="mobileHome-menu-item">
                            <i className="bi bi-mortarboard-fill me-2"></i>
                            Students
                        </Link>
                        <Link to="/department" className="mobileHome-menu-item">
                            <i className="bi bi-diagram-3-fill me-2"></i>
                            Departments
                        </Link>
                    </>
                }
                {
                    (isHod || isAdmin) &&
                    <>
                        <Link to="/sections" className="mobileHome-menu-item">
                            <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                            Section
                        </Link>
                    </>
                }
                {
                    (isAccountant || isAdmin) &&
                    <>
                        <Link to="/fee" className="mobileHome-menu-item">
                            <i className="bi bi-cash-coin me-2"></i>
                            Fee
                        </Link>
                    </>
                }
                {
                    isTeacher &&
                    <>
                        <Link to="/teacher/classes" className="mobileHome-menu-item">
                            <i className="bi bi-easel-fill me-2"></i>
                            Classes
                        </Link>
                    </>
                }
                {
                    isStudent &&
                    <>
                        <Link to="/student/attendance" className="mobileHome-menu-item">
                            <i className="bi bi-clipboard-check-fill me-2"></i>
                            Attendance
                        </Link>
                        <Link to="/student/exam" className="mobileHome-menu-item">
                            <i className="bi bi-clipboard-check me-2"></i>
                            Exams
                        </Link>
                        <Link to="/student/fee" className="mobileHome-menu-item">
                            <i className="bi bi-cash-coin me-2"></i>
                            Fee
                        </Link>
                        <Link to="/student/university-exam" className="mobileHome-menu-item">
                            <i className="bi bi-clipboard-check-fill me-2"></i>
                            UniversityExam
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}

export default MobileHome
