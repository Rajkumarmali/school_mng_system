import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoles, getUserById, updateUserImage, updateUserProfile, updateUserRole, userProfile } from '../../state/user/Action';
import { useLocation } from 'react-router-dom';
const UserProfile = () => {

    const location = useLocation();
    const userId = location.state?.userId

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

    const [isEditImageModal, setIsEditImageModal] = useState(false);
    const [isEditProfileModal, setIsEditProfileModal] = useState(false);
    const [isEditUserRoleModal, setIsEditUserRoleModal] = useState(false);
    const [image, setImage] = useState(null);
    const [userInfo, setUserInfo] = useState();
    const [roleIds, setRolesIds] = useState([1])

    const [updateProfileData, setUpdateProfileData] = useState({
        email: '',
        userName: ''
    })

    const handleEditImage = () => {
        setIsEditImageModal(true);
        setIsEditProfileModal(false);
        setIsEditUserRoleModal(false);
    }

    const handleEditProfile = () => {
        setIsEditImageModal(false);
        setIsEditProfileModal(true);
        setIsEditUserRoleModal(false);
    }

    const handleEditUserRole = () => {
        setIsEditImageModal(false);
        setIsEditProfileModal(false);
        setIsEditUserRoleModal(true);
        handleGetRoles();
    }

    const handleGetRoles = async () => {
        await dispatch(getAllRoles())
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateProfileData({
            ...updateProfileData,
            [name]: value
        })
    }
    const handleRoleChange = (e, roleId) => {
        if (e.target.checked) {
            setRolesIds(prev => [...prev, roleId]);
        } else {
            setRolesIds(prev => prev.filter(id => id !== roleId));
        }
    };
    const handleUpdate = async () => {
        isEditImageModal ?
            await dispatch(updateUserImage(image))
            :
            isEditUserRoleModal ?
                await dispatch(updateUserRole(userId, roleIds))
                :
                await dispatch(updateUserProfile(updateProfileData))

        if (userId) {
            dispatch(getUserById(userId))
        } else {
            dispatch(userProfile())
        }
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
        setUserInfo(user?.user?.teacherResponse || user?.user?.studentResponse)
    }, [user?.user])

    useEffect(() => {
        if (user?.user?.roleResponse) {
            setRolesIds(
                user?.user?.roleResponse.map(role => role.id)
            );
        }
    }, [user?.user]);


    return (
        <div className="profile">
            <div className="users-card">
                <div className="profile-header">
                    <div>
                        <div className="user-profile-avatar">
                            {
                                user?.user?.userImage ?
                                    <img src={`http://localhost:8080/${user?.user?.userImage}`} alt=""
                                        className='user-image' />
                                    : <i className="bi bi-person-fill"></i>
                            }
                        </div>
                        {
                            !userId &&
                            <div>
                                <button
                                    className="user-edit-image-btn"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={handleEditImage}
                                >
                                    <i className="bi bi-camera-fill me-2"></i>
                                    Edit Image
                                </button>
                            </div>
                        }
                    </div>
                    <div className="profile-info">
                        <div className="profile-contact">
                            <div>
                                {
                                    user?.user?.teacherResponse ?
                                        <>
                                            <i className="bi bi-person-workspace"></i>
                                            <span>EmployeeId : {user?.user?.teacherResponse?.employeeId}</span>
                                        </>
                                        :
                                        user?.user?.studentResponse ?
                                            <>
                                                <i className="bi bi-mortarboard-fill"></i>
                                                <span>Registration Number : {user?.user?.studentResponse?.registrationNumber}</span>
                                            </>
                                            :
                                            <>
                                                <i className="bi bi-person-badge-fill"></i><span>ID : {user?.user?.id}</span>
                                            </>

                                }
                            </div>
                            <div>
                                <i className="bi bi-person-badge-fill"></i>
                                <span>User Name : {user?.user?.userName}</span>
                            </div>
                            <div>
                                <i className="bi bi-envelope-fill"></i>
                                <span>Email : {user?.user?.email}</span>
                            </div>
                            <div>
                                <i className="bi bi-shield-lock-fill"></i>
                                Roles :  {user?.user?.roleResponse?.map(roles =>
                                    <span>{roles.name}</span>)}
                                {
                                    userId &&
                                    <button className="edit-icon-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={handleEditUserRole}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                }

                            </div>
                        </div>
                    </div>
                    {!userId &&
                        <button className="edit-btn"
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onClick={handleEditProfile}
                        >
                            Edit Profile
                        </button>
                    }
                </div>
                {userInfo &&
                    <div className='user-profile-body'>
                        <div className="simple-section">
                            <div className="info-line">
                                <h5>Personal Information : </h5>
                            </div>
                            <div className="info-line">
                                <span><strong>First Name :</strong> {userInfo?.firstName}</span>
                                <span><strong>Last Name :</strong> {userInfo?.lastName}</span>
                                <span><strong>Father Name :</strong> {userInfo?.parentResponse?.fatherName}</span>
                                <span><strong>Mother Name :</strong> {userInfo?.parentResponse?.motherName}</span>
                                <span><strong>Mobile Number :</strong> {userInfo?.phoneNumber}</span>
                                <span><strong>Email :</strong> {userInfo?.email}</span>
                                <span><strong>Gender :</strong> {userInfo?.gender}</span>
                                <span><strong>Cast :</strong> {userInfo?.cast}</span>
                                <span><strong>Aadhar :</strong> {userInfo?.aadharNumber}</span>
                                <span><strong>PAN :</strong> {userInfo?.panNumber}</span>
                                <span><strong>DOB :</strong> {userInfo?.dob}</span>
                                {user?.user?.studentResponse &&
                                    <div>
                                        <span><strong>Father Number :</strong> {userInfo?.parentResponse?.fatherNumber}</span>
                                        <span><strong>Mother Number :</strong> {userInfo?.parentResponse?.motherNumber}</span>
                                        <span><strong>Father Occupation :</strong> {userInfo?.parentResponse?.fatherOccupation}</span>
                                        <span><strong>Mother Occupation :</strong> {userInfo?.parentResponse?.motherOccupation}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="simple-section">
                            <div className="info-line">
                                <h5>Address Information : </h5>
                            </div>
                            <div className="info-line">
                                <span><strong>Address :</strong> {userInfo?.addressResponse?.address}</span>
                                <span><strong>City :</strong> {userInfo?.addressResponse?.city}</span>
                                <span><strong>District :</strong> {userInfo?.addressResponse?.district}</span>
                                <span><strong>State :</strong> {userInfo?.addressResponse?.state}</span>
                                <span><strong>Country :</strong> {userInfo?.addressResponse?.country}</span>
                                <span><strong>Pincode :</strong> {userInfo?.addressResponse?.pincode}</span>
                            </div>
                        </div>
                    </div>
                }
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content custom-modal">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{
                                    isEditProfileModal ? "Edit Profile" :
                                        isEditUserRoleModal ? "Edit User Roles" :
                                            "Edit Image"
                                } </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {isEditImageModal ?
                                <div>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                :
                                isEditUserRoleModal ?
                                    <div className="modal-body">
                                        <h6>Select Roles</h6>
                                        {
                                            user?.roles?.map(role =>
                                                <div className="form-check" key={role.id}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={roleIds.includes(role.id)}
                                                        onChange={(e) => handleRoleChange(e, role.id)}
                                                    />
                                                    <label className="form-check-label">
                                                        {role.name}
                                                    </label>
                                                </div>
                                            )
                                        }
                                    </div>
                                    :
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
                            }
                            <div class="modal-footer">
                                <button type="button" className="user-modal-btn" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="user-modal-btn" data-bs-dismiss="modal" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
