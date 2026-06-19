import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Users.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, resetPassword } from '../state/user/Action';

const Users = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user)
    const [newPassword, setNewPassword] = useState('');
    const [userId, setUserId] = useState()

    const handleResetPassword = (userId) => {
        setNewPassword('')
        setUserId(userId)
    }
    const handleUpdate = (e) => {
        if (!newPassword) {
            alert("enter new password")
            return
        }
        dispatch(resetPassword(userId, newPassword))
    }

    const handleViewProfile = (userId) => {
        navigate("/user-profile", {
            state: { userId }
        })
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])


    return (
        <div className='users-container'>
            <div className="users-header">
                <div>
                    <h2>Users Management</h2>
                </div>
            </div>
            <div className="users-card">
                <table className="table users-table">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.users?.length > 0 ? (
                            user?.users.map((user, index) =>
                                <tr key={user.id}>
                                    <td>{index + 1}.</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td className='text-center'>
                                        <button className="btn btn-sm custom-reset-btn me-2" onClick={() => handleViewProfile(user.id)}>
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button className="btn btn-sm custom-reset-btn me-2" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => handleResetPassword(user.id)}>
                                            <i className="bi bi-lock-fill me-1"></i>
                                            Reset Password</button>
                                    </td>
                                </tr>
                            )
                        )
                            : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No Users Found
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Reset Password</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='mb-4'>
                                <label>Password</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    name='newPassword'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn modal-close-btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn modal-save-btn" data-bs-dismiss="modal" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users
