import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, updateUserProfile, userProfile } from '../state/user/Action';
import { useLocation } from 'react-router-dom';
const UserProfile = () => {

    const location = useLocation();
    const userId = location.state?.userId

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)


    const [updateProfileData, setUpdateProfileData] = useState({
        email: '',
        userName: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateProfileData({
            ...updateProfileData,
            [name]: value
        })
    }

    const handleUpdate = async () => {
        await dispatch(updateUserProfile(updateProfileData))
        await dispatch(userProfile());
    }

    useEffect(() => {
        if (userId) {
            dispatch(getUserById(userId))
        } else {
            dispatch(userProfile())
        }

    }, [dispatch, userId]);

    useEffect(() => {
        setUpdateProfileData({
            email: user?.user?.email || '',
            userName: user?.user?.userName || ''
        })
    }, [user?.user])


    return (
        <div className="profile">
            <div className="profile-header">
                <div className="profile-avatar">
                    <i className="bi bi-person-fill"></i>
                </div>
                <div className="profile-info">
                    <div className="profile-contact">
                        <div>
                            <span>ID : {user?.user?.id}</span>
                        </div>
                        <div>
                            <span>User Name : {user?.user?.userName}</span>
                        </div>
                        <div>
                            <i className="bi bi-envelope"></i>
                            <span>Email : {user?.user?.email}</span>
                        </div>
                    </div>
                </div>
                {!userId &&
                    <button className="edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Edit Profile
                    </button>
                }

            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='mb-4'>
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    name='userName'
                                    value={updateProfileData.userName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='mb-4'>
                                <label>Email Adddress</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    name='email'
                                    value={updateProfileData.email}
                                    onChange={handleChange}
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

export default UserProfile
