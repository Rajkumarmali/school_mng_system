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
            </ul>
        </div>
    );
};

export default Sidebar;