import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, } from "react-router-dom";
import './Users.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, resetPassword } from '../../state/user/Action';

const Users = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user)
    const [newPassword, setNewPassword] = useState('');
    const [userId, setUserId] = useState()

    const [searchParams, setSearchParams] = useSearchParams()
    const pageNumber = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get("size")) || 10;

    const totalPages = user?.users?.totalPages || 0;
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (pageNumber > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, pageNumber - 1);
                i <= Math.min(totalPages - 1, pageNumber + 1);
                i++
            ) {
                pages.push(i);
            }

            if (pageNumber < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handleChangePageSize = (e) => {
        const pageSize = e.target.value
        setSearchParams({
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            page: pageNumber,
            size: pageSize
        })
    }

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
        dispatch(getAllUsers(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize])


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
                        {user?.users?.content?.length > 0 ? (
                            user?.users?.content?.map((user, index) =>
                                <tr key={user.id}>
                                    <td>{(pageNumber - 1) * pageSize + index + 1}.</td>
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
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total : <strong>{user?.users?.totalElements || 0}</strong>
                    </div>
                    <div className="page-size-selector">
                        <label>Show :</label>
                        <select
                            value={pageSize}
                            onChange={handleChangePageSize}
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <ul className="custom-pagination">
                        <li>
                            <button
                                onClick={handleGetPerviousPageData}
                                disabled={pageNumber === 1}
                            >
                                &laquo;
                            </button>
                        </li>
                        {getPageNumbers().map((page, index) =>
                            page === "..." ? (
                                <li key={index} className="dots">
                                    ...
                                </li>
                            ) : (
                                <li key={index}>
                                    <button
                                        className={pageNumber === page ? "active-page" : ""}
                                        onClick={() => handleGetPageNumberData(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            )
                        )}
                        <li>
                            <button
                                onClick={handleGetNextPageData}
                                disabled={pageNumber === totalPages}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </div>
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
                            <button type="button" className="user-modal-btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="user-modal-btn" data-bs-dismiss="modal" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users
