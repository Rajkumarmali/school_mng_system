import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loogOut, resetPassword } from "../state/auth/Action";
import { userProfile } from "../state/user/Action";

const Navbar = ({ toggleSidebar }) => {

    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [resetPasswordData, setResetPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const navigete = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user)

    const handleLogout = () => {
        dispatch(loogOut())
        navigete('/')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResetPasswordData({
            ...resetPasswordData,
            [name]: value
        })
    }

    const handleCloseModal = () => {
        setShowResetPasswordModal(false);
        setResetPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    const handleUpdate = () => {
        if (!resetPasswordData.newPassword || !resetPasswordData.currentPassword || !resetPasswordData.confirmPassword) {
            alert("all field required")
            return
        }
        dispatch(resetPassword(resetPasswordData));
        handleCloseModal();
    }

    useEffect(() => {
        dispatch(userProfile())

    }, [dispatch]);

    console.log("..........", user?.user)

    return (
        <div>
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
                                className="btn profile-btn"
                                data-bs-toggle="dropdown"
                            >
                                {
                                    user?.user?.userImage ?
                                        <img
                                            src={`http://localhost:8080/${user?.user?.userImage}`}
                                            alt="profile"
                                            className="profile-img"
                                        />
                                        :
                                        <i className="bi bi-person-circle profile-icon"></i>
                                }
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
                                <li>
                                    <Link to="/user-profile" className="dropdown-item">
                                        Profile
                                    </Link>
                                </li>
                                <li className="settings-menu">
                                    <button className="dropdown-item" >
                                        Settings
                                    </button>
                                    <ul className="settings-submenu">
                                        <li>
                                            <button className="dropdown-item" onClick={() => setShowResetPasswordModal(true)}>
                                                Reset Password
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {showResetPasswordModal &&
                <div className="modal fade show" style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content custom-modal">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Reset Password</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div class="modal-body">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="modal-input"
                                        placeholder="Current Password"
                                        name="currentPassword"
                                        value={resetPasswordData.currentPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="modal-input"
                                        placeholder="New Password"
                                        name="newPassword"
                                        value={resetPasswordData.newPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="modal-input"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={resetPasswordData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {resetPasswordData.confirmPassword && resetPasswordData.confirmPassword !== resetPasswordData.newPassword &&
                                        <h6 className="text-danger">password didn't match</h6>}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn modal-close-btn" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn modal-save-btn" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Navbar;