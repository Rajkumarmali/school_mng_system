import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className="menu-item">
                        <i className="bi bi-grid-fill me-2"></i>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/tenant" className="menu-item">
                        <i className="bi bi-building me-2"></i>
                        Tenant
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
                        <i class="bi bi-people-fill me-2"></i>
                        Users
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;