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
                    isSuperAdmin && <li>
                        <Link to="/college" className="menu-item">
                            <i className="bi bi-bank me-2"></i>
                            Colleges
                        </Link>
                    </li>
                }
                {
                    isAdmin &&
                    <>
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
                                <i class="bi bi-people-fill me-2"></i>
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
                            <Link to="/classes" className="menu-item">
                                <i className="bi bi-book-fill me-2"></i>
                                Classes
                            </Link>
                        </li>
                    </>
                }
            </ul>
        </div>
    );
};

export default Sidebar;