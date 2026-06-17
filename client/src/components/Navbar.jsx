import React from "react";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="navbar navbar-expand-lg dashboard-navbar">
            <div className="container-fluid">
                <button
                    className="btn toggle-sidebar-btn"
                    onClick={toggleSidebar}
                >
                    <i className="bi bi-list"></i>
                </button>
                <h5 className="mb-0 fw-bold ms-3">
                    Home
                </h5>
                <div className="ms-auto d-flex align-items-center gap-3">
                    <button className="icon-btn">
                        <i className="bi bi-bell"></i>
                    </button>
                    <div className="dropdown">
                        <button
                            className="btn profile-btn dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            {/* <img
                                src="https://i.pravatar.cc/40"
                                alt="profile"
                                className="profile-img"
                            /> */}
                            <i className="bi bi-person-circle profile-icon"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
                            <li>
                                <button className="dropdown-item">
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item">
                                    Settings
                                </button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button className="dropdown-item text-danger">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;