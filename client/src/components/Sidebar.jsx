import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className="menu-item">
                        📊 Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/about" className="menu-item">
                        ℹ️ About
                    </Link>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;